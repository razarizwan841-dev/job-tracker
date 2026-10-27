import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../fireBase/fireBase";
import "../componentCss/navbar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const doLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__logout-item">
            <button className="navbar__logout" onClick={doLogOut}>
              LogOut
            </button>
          </li>
          <li className="navbar__email">{user.email}</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
