import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { auth } from "../fireBase/fireBase";
// import "../pagesCss/login.css";
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Account nahi hai? <Link to="/signUp">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
