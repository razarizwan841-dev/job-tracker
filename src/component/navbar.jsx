import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../fireBase/fireBase";

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
      <nav>
        <ul>
          <li>
            <button onClick={doLogOut}>LogOut</button>
          </li>
          <li>{user.email}</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
