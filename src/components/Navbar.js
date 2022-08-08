import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar">
        {isLoggedIn && (
          <div className="header container">
            <div>
              <NavLink to="/home">
                <img className="logo" src="../../2.png" alt="logo" />
              </NavLink>
              <button className="theme">Light mode</button>
            </div>
            <div className="navbar">
              <NavLink className="link" to="/recipes">
                Recipes
              </NavLink>
              |
              <NavLink className="link" to="/recipes/create">
                Create a Recipe
              </NavLink>
              |
              <NavLink className="link" to="/weeklyplans">
                Plannings
              </NavLink>
              |
              <NavLink className="link" to="/weeklyplans/create">
                Create a Planning
              </NavLink>
              |
              <NavLink className="link" to="/shoppingitems">
                Shopping list
              </NavLink>
              |
              <Link to="/">
                <button onClick={logOutUser}>Logout</button> |
              </Link>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className="header container">
            <div className="container">
              <NavLink to="/">
                <img className="logo" src="../../2.png" alt="logo" />
              </NavLink>
              <button className="theme">Light mode</button>
            </div>
            <div>
              <NavLink className="link" to="/signup">
                Sign Up
              </NavLink>{" "}
              <NavLink className="link" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
