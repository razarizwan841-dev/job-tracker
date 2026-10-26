import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../fireBase/fireBase";
import { AuthContext } from "../context/AuthProvider";
import JobForm from "../jobForm";
import JobList from "../component/jobList";
function Home() {
  const navigate = useNavigate();

  function doLogOut() {
    signOut(auth)
      .then(() => {
        alert("Sign Out successful!");
        navigate("/signUp");
      })
      .catch((err) => {
        console.log("signOut err", err.message);
      });
  }

  return (
    <div>
      <button onClick={doLogOut}>Log Out</button>
      <JobForm />
      <JobList />
    </div>
  );
}

export default Home;
