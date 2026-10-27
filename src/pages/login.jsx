import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { auth } from "../fireBase/fireBase";
import "../pagesCss/signUp.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unSubcribe();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Email ya password galat hai!");
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

        <p className="login-footer">
          Account nahi hai? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;