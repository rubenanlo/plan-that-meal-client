import "./HomePageUser.css";
import { NavLink } from "react-router-dom";

function HomePageUser() {
  return (
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
          <NavLink className="homepage-link" to="/shoppingitems">
            Create a shopping list
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default HomePageUser;
