import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <button>Light mode</button>
      <nav className="Navbar">
        {isLoggedIn && (
          <>
            <NavLink to="/home">
              <img src="../../2.png" alt="logo" />
            </NavLink>
            <NavLink to="/recipes">Recipes</NavLink>|
            <NavLink to="/recipes/create">Create a Recipe</NavLink>|
            <NavLink to="/weeklyplans">Plannings</NavLink>|
            <NavLink to="/weeklyplans/create">Create a Planning</NavLink>|
            <button onClick={logOutUser}>Logout</button> |
            <span> Hi, {user && user.username}</span>
          </>
        )}
        {!isLoggedIn && (
          <>
            <NavLink to="/">
              <img src="../../2.png" alt="logo" />
            </NavLink>
            <NavLink to="/signup">Sign Up</NavLink> |
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
