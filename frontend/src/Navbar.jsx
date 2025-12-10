import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const fetchLogoutData = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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
        alert("Successfully logged out!");
        navigate('/');
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
      setLoading(false);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    fetchLogoutData();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-sale">Add Sale</Link></li>
          <li><Link to="/view-sales">View Sales</Link></li>
          <li><Link to="/">Add Prices</Link></li>
          <li><Link to="/">Summary</Link></li>
        </ul>

        <div className="navbar-action">
          <button className="navbar-logout" onClick={handleClick} disabled={!isEditable}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;