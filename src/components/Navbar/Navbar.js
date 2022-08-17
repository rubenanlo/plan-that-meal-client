import "./Navbar.css";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser, isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <p></p>
      ) : (
        <nav className="navbar">
          <div>
            <NavLink to="/">
              <img className="logo" src="../../2.png" alt="logo" />
            </NavLink>
          </div>
          {isLoggedIn && (
            <>
              {/* <button className="theme">Light mode</button> */}
              <div className="dropdown">
                <button className="dropbtn">
                  Recipes
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <NavLink className="link-navbar" to="/recipes">
                    View all recipes
                  </NavLink>
                  <NavLink className="link-navbar" to="/recipes/create">
                    Create a Recipe
                  </NavLink>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  Weekly Plans
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <NavLink className="link-navbar" to="/weeklyplans">
                    View all weekly plans
                  </NavLink>
                  <NavLink className="link-navbar" to="/weeklyplans/create">
                    Create a Planning
                  </NavLink>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  Shopping List
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <NavLink className="link-navbar" to="/shoppingitems/">
                    View all shopping lists
                  </NavLink>
                  <NavLink className="link-navbar" to="/shoppingitems/create">
                    Create a shopping list
                  </NavLink>
                </div>
              </div>
              <Link to="/">
                <span onClick={logOutUser}>Logout</span>
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <div>
                <div style={{ alignItems: "center" }}>
                  <NavLink to="/signup">Sign Up</NavLink>{" "}
                  <NavLink to="/login">Login</NavLink>
                </div>
              </div>
            </>
          )}
        </nav>
      )}
    </>
  );
}

export default Navbar;
