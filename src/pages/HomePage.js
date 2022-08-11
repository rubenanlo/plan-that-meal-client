import { NavLink } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div>
        <h1>PlanThatMeal</h1>
        <div className="divider"></div>
        <section className="presentation">
          <div className="detailed-description">
            <div className="detailed-section">
              <p> Save all your recipes in one place.</p>
              <img src="../../recipes.jpeg" alt="recipes"></img>
            </div>
            <div className="detailed-section">
              <p>
                Plan your meals ahead for the week. <br />
              </p>
              <img src="../../calendar.webp" alt="planning"></img>
            </div>
            <div className="detailed-section">
              <p>Create a shopping list before you go to the grocery store.</p>
              <img src="../../list.jpeg" alt="shopping"></img>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
