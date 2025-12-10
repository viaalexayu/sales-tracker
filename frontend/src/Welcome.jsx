import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Welcome.css";

function Welcome() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    let newError = {};
    if (!email) newError.email = 'Valid email required!';
    if (!password) newError.password = 'Password required!';
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
      const res = await fetch(`${import.meta.env.API_URL}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
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
        navigate('/verify-login', { state: { email } });
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
        <div className="card">
          <label>Email:&nbsp;
            <input
              type="text"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditable}
            />
          </label>
          <div className="error-space">
            {error.email && <p className="error">{error.email}</p>}
          </div>
          <label>Password:&nbsp;
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditable}
            />
          </label>
          <div className="error-space">
            {error.password && <p className="error">{error.password}</p>}
          </div>
          <br />
          <button className="btn" type="submit" disabled={!isEditable}>Login</button>
        </div >
      </form >
    </div >
  )
}

export default Welcome;