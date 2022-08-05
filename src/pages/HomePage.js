import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
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
  );
}

export default HomePage;
