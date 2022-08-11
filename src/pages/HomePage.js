import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div>
        <h1>PlanThatMeal</h1>
        <div></div>
        <section className="presentation">
          <p>Save all your recipes in one place.</p>
          <p>Plan your meals ahead for the week.</p>
          <p>We’ll create the shopping list for you.</p>
          <p>And off you go to the grocery store!</p>
          <h3>With us, you will be able to </h3>
          <div className="description-site">
            <p>
              {" "}
              If you have not signed up, get in{" "}
              <NavLink to="/signup">here</NavLink> . Otherwise, don't waste any
              second and access <NavLink to="/login">here</NavLink>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
