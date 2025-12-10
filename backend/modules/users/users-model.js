const mongoose = require("mongoose");
const { encodePassword } = require("../../shared/password-utils");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    address: String,
    createdAt: { type: Date, default: Date.now() },
    roles: { type: String, enum: [ "admin", "store" ], required: true, default: "store" },
  },
  { versionKey: false }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = encodePassword(this.password);
});

const UserModel = mongoose.model("User", userSchema, "Users");

module.exports = UserModel;
