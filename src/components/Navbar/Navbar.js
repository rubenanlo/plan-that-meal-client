import "./Navbar.css";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser, isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <nav className="navbar">
          <div>
            <NavLink to="/">
              <img className="logo" src="../../3.png" alt="logo" />
            </NavLink>
          </div>
          <div className="navbar-container">
            <input type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            {isLoggedIn && (
              <ul className="menu-items">
                {/* <button className="theme">Light mode</button> */}
                <li>
                  <NavLink className="link-navbar" to="/recipes">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link-navbar" to="/weeklyplans">
                    Weekly plans
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link-navbar" to="/shoppingitems/">
                    Shopping lists
                  </NavLink>
                </li>
                <li className="logout">
                  <Link to="/" className="link-nav">
                    <span onClick={logOutUser}>Logout</span>
                  </Link>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul className="menu-items">
                <li>
                  <NavLink className="link-navbar" to="/signup">
                    Sign Up |
                  </NavLink>{" "}
                  <NavLink className="link-navbar" to="/login">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
