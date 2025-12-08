import { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
    if (!password) newError.password = 'password required!';
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
      const res = await fetch("http://localhost:3000/sales", {
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
        setError(content.message);
      }

      else {
        const content = await res.json();
        console.log(content);
        alert("Successfully added new sale!");
        navigate('/');
      }
    }

    catch (error) {
      setError("Network error:" + error.message);

    } finally {
      setIsEditable(true);
      setLoading(false);
    }
  }

  return (
    <div className="body">
      <h1>Welcome</h1>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <label>Email:&nbsp;
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditable}
            />
          </label>
          <div className="error-space">
            {error.email && <p className="error">{error.email}</p>}
          </div>
          <br /> <br />
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
          <br /> <br />
          <button className="btn" type="submit" disabled={!isEditable}>Login</button>
          <br /> <br />
        </div >
      </form >
    </div >
  )
}

export default Welcome;