const { Router } = require("express");
const registerRules = require("./middlewares/register-rules");
const loginRules = require("./middlewares/login-rules");

const UserModel = require("./users-model");
const { matchPassword } = require("../../shared/password-utils");
const { encodeToken } = require("../../shared/jwt-utils");
const authorize = require("../../shared/middlewares/authorize");
const verifyLoginRules = require("./middlewares/verify-login-rules");

const { randomNumberOfNDigits } = require("../../shared/compute-utils");
const OTPModel = require("./otp-model");
const sendEmail = require("../../shared/email-utils");

const usersRoute = Router();

/**
 * Register Route
 */
usersRoute.post("/register", registerRules, async (req, res) => {
  const newUser = req.body;
  const existingUser = await UserModel.findOne({
    email: newUser.email,
  });
  if (existingUser) {
    return res.status(500).json({
      errorMessage: `User with ${newUser.email} already exist`,
    });
  }
  const addedUser = await UserModel.create(newUser);
  if (!addedUser) {
    return res.status(500).send({
      errorMessage: `Oops! User couldn't be added!`,
    });
  }
  const user = { ...addedUser.toJSON(), password: undefined };
  res.json(user);
});

/**
 * Login Route
 */
usersRoute.post("/login", loginRules, async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return res.status(404).send({
      errorMessage: `User with ${email} doesn't exist`,
    });
  }
  const passwordMatched = matchPassword(password, foundUser.password);
  if (!passwordMatched) {
    return res.status(401).send({
      errorMessage: `Email and password didn't match`,
    });
  }
  const user = { ...foundUser.toJSON(), password: undefined };

  const newOTP = {
    "email": user.email,
    "otp": randomNumberOfNDigits(6)
  }

  const addedOTP = await OTPModel.create(newOTP);

  if (!addedOTP) {
    return res.status(500).send({
      errorMessage: `Oops! OTP couldn't be sent.`,
    });
  }
  sendEmail(user.email, "OTP Code", addedOTP.otp);
  res.send("Successfully sent OTP to email!");
});

/**
 * Verify Login Route
 */
usersRoute.post("/verify-login", verifyLoginRules, async (req, res) => {
  const { email, otp } = req.body;
  const otpUser = await OTPModel.findOne({ email });
  const foundUser = await UserModel.findOne({ email });
  const user = { ...foundUser.toJSON(), password: undefined };

  if (!otpUser) {
    return res.status(404).send({
      errorMessage: `User with ${email} doesn't exist`,
    });
  }
  if (otp == otpUser.otp) {
    // generate access token
    const token = encodeToken(user);
    res.json({ user, token });
  }
  else {
    return res.status(401).send({
      errorMessage: `Verification failed!`,
    });
  }
});

/**
 * Get all users Route
 */
usersRoute.get("/", authorize(["admin"]), async (req, res) => {
  const allUsers = await UserModel.find().select("-password");
  if (!allUsers) res.send([]);
  res.json(allUsers);
});

/**
 * Get user by id Route
 */
usersRoute.get("/accounts/:id", authorize(["admin", "store"]), async (req, res) => {
  const userID = req.params.id;
  const isAdmin = req.account.roles.includes("admin");

  // TODO: If not admin, don't allow to access others account
  if (!isAdmin && userID != req.account._id) {
    return res.status(401).json({
      errorMessage:
        "You don't have permission to update your role. Please contact the support team for the assistance!",
    });
  }

  const foundUser = await UserModel.findById(userID);
  if (!foundUser) {
    return res
      .status(404)
      .send({ errorMessage: `User with ${userID} doesn't exist` });
  }
  res.json(foundUser);
});

/**
 * Update user Route
 * updateAccountRules
 */
usersRoute.put("/accounts/:id", authorize(["admin", "store"]), async (req, res) => {
  const userID = req.params.id;
  const isAdmin = req.account.roles.includes("admin");
  // TODO: If not admin, don't allow to update others account
  if (!isAdmin && userID != req.account._id) {
    return res.status(401).json({
      errorMessage:
        "You don't have permission to update your role. Please contact the support team for the assistance!",
    });
  }

  const newUser = req.body;
  if (!newUser) {
    return res.status(421).json({ errorMessage: "Nothing to update" });
  }
  // Only allow admin to change the roles
  if (!isAdmin && newUser.roles) {
    return res.status(401).json({
      errorMessage:
        "You don't have permission to update your role. Please contact the support team for the assistance!",
    });
  }
  const foundUser = await UserModel.findById(userID);
  if (!foundUser) {
    return res
      .status(404)
      .send({ errorMessage: `User with ${userID} doesn't exist` });
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    userID,
    {
      $set: newUser,
    },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return res
      .status(500)
      .send({ errorMessage: `Oops! User couldn't be updated!` });
  }
  res.json(updatedUser);
});

/**
 * Delete user Route
 */
usersRoute.delete("/accounts/:id", authorize(["admin"]), async (req, res) => {
  const userID = req.params.id;
  const foundUser = await UserModel.findById(userID);
  if (!foundUser) {
    return res
      .status(404)
      .send({ errorMessage: `User with ${userID} doesn't exist` });
  }
  const deletedUser = await UserModel.findByIdAndDelete(userID).select(
    "-password"
  );
  if (!deletedUser) {
    return res
      .status(500)
      .send({ errorMessage: `Oops! User couldn't be deleted!` });
  }
  res.json(deletedUser);
});

module.exports = { usersRoute };
