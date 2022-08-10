import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className="home-page">
        {!isLoggedIn && (
          <div>
            <h1>PlanThatMeal</h1>
            <div></div>
            <ul>
              <li>Plan your meals ahead for the week.</li>
              <li>We’ll create the shopping list for you.</li>
              <li>And off you go to the grocery store!</li>
            </ul>
            <div>
              <button>
                <NavLink to="/signup">Sign Up</NavLink>
              </button>
            </div>
            <div>
              <button>
                <NavLink to="/login">Login</NavLink>
              </button>
            </div>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div>
          <h1>PlanThatMeal</h1>
          <div></div>
          <p>
            The sky is the limit..... but not in here, I’m afraid. Check which
            option you want.
          </p>
          <div>
            <button className="homepage-links">
              <NavLink className="homepage-link" to="/recipes/create">
                Create a recipe
              </NavLink>
            </button>
          </div>
          <div>
            <button className="homepage-links">
              <NavLink className="homepage-link" to="/recipes">
                View all recipes
              </NavLink>
            </button>
          </div>

          <div>
            <button className="homepage-links">
              <NavLink className="homepage-link" to="/weeklyplans/create">
                Create a weekly meal plan
              </NavLink>
            </button>
          </div>
          <div>
            <button className="homepage-links">
              <NavLink className="homepage-link" to="/weeklyplans">
                View your weekly meal plans
              </NavLink>
            </button>
          </div>
          <div>
            <button className="homepage-links">
              <NavLink className="homepage-link" to="/shoppingitems/create">
                Create a shopping list
              </NavLink>
            </button>
          </div>
          <div>
            <button className="homepage-links">
              <NavLink className="homepage-link" to="/shoppingitems">
                View your shopping lists
              </NavLink>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
