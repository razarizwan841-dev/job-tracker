import React, { useEffect, useState } from "react";
import { auth } from "../fireBase/fireBase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../fireBase/fireBase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import "../pagesCss/signUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

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

    if (!agreed) {
      alert("Please agree to the Terms & Conditions first!");
      return;
    }

    if (password !== conPassword) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return setDoc(doc(db, "users", userCredential.user.uid), {
          name,
          email,
          number,
        });
      })
      .then(() => {
        alert("Sign Up Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(error.message);
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Put Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Enter Your Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms" style={{ cursor: "pointer" }}>
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
