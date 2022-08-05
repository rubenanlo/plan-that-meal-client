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
        <button>
          <NavLink to="/weeklyplans/create">Create a weekly meal plan</NavLink>
        </button>
      </div>
      <div>
        <button>
          <NavLink to="/weeklyplans">View your weekly meal plans</NavLink>
        </button>
      </div>
      <div>
        <button>
          <NavLink to="/recipes/create">Create a recipe</NavLink>
        </button>
      </div>
      <div>
        <button>
          <NavLink to="/recipes">View all recipes</NavLink>
        </button>
      </div>
      <div>
        <button>
          <NavLink to="/shoppingitems">Create a shopping list</NavLink>
        </button>
      </div>
    </div>
  );
}

export default HomePageUser;
