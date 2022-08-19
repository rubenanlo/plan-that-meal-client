import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="homepage">
        <h1>PlanThatMeal</h1>
        <div className="divider"></div>
        <section>
          <div className="sections">
            <div className="section">
              <p> Save all your recipes in one place.</p>
              <img src="../../recipes.jpeg" alt="recipes"></img>
            </div>
            <div className="section">
              <p>
                Plan your meals ahead for the week. <br />
              </p>
              <img src="../../calendar.webp" alt="planning"></img>
            </div>
            <div className="section">
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
