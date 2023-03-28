import { Link } from "react-router-dom";
import "./NavBar.css";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div className="left-nav">
        <Link to="/" className="website-title">
          Earn, Learn and Invest-MERN <br />
          <span>AI Informed Crypto Trading</span>
        </Link>
      </div>
      <div className="right-nav">
        {user ? (
          <>
            <div className="welcome">Welcome, {user.name}</div>
            <Link to="" onClick={handleLogOut} className="logout">
              Log Out
            </Link>
          </>
        ) : (
          <>
          {/* <Link to="/login" className="login">
            Log In
          </Link>
          <Link to="/signup" className="signup">
            SignUp
          </Link> */}
          </>
        )}
      </div>
    </nav>
  );
}
