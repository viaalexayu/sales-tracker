import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Welcome.css";

function OTP() {

  const location = useLocation();
  const emailProp = location.state?.email || '';

  const [email, setEmail] = useState(emailProp);
  const [otp, setOTP] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    let newError = {};
    if (!otp) newError.otp = 'OTP required!';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    fetchSalesData();
  };

  const fetchSalesData = async () => {
    setLoading(true);
    setIsEditable(false);

    try {
      const res = await fetch(`${import.meta.env.API_URL}users/verify-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
        credentials: "include"
      });

      if (!res.ok) {
        const content = await res.json();
        navigate("/error", {
          state: {
            errorCode: res.status,
            errorMessage: content.message || "Fetch error"
          }
        });
        return;
      }

      else {
        const content = await res.json();
        console.log(content);
        alert("Successfully logged in!");
        navigate('/add-sale');
      }
    }

    catch (error) {
      navigate("/error", {
        state: {
          errorCode: 500,
          errorMessage: "Network error: " + error.message
        }
      });

    } finally {
      setIsEditable(true);
      setLoading(false);
    }
  }

  return (
    <div className="body">
      <h1>Welcome.</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label>OTP:&nbsp;
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              disabled={!isEditable}
            />
          </label>
          <div className="error-space">
            {error.otp && <p className="error">{error.otp}</p>}
          </div>
          <br />
          <button className="btn" type="submit" disabled={!isEditable}>Verify Login</button>
        </div >
      </form >
    </div >
  )
}

export default OTP;