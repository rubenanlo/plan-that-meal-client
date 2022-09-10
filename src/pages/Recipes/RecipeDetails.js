import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./RecipeDetails.css";
function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const { isLoading } = useContext(AuthContext);

  const { recipeId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  }, [recipeId, storedToken]);

  if (recipe === null) {
    return <>loading...</>;
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="recipe-details" key={recipeId}>
            {recipe && (
              <>
                <div className="card-wider-screen">
                  <div>
                    <h2>{recipe.title}</h2>
                    <img className="image-recipe" src={recipe.img} alt="dish" />
                    <section className="one-line left-wider-screen">
                      <h3>Main protein: </h3>
                      <p>{recipe.protein}</p>
                    </section>
                    <section className="one-line left-wider-screen">
                      <h3>Serving: </h3>
                      <p>{recipe.serving}</p>
                    </section>
                    <section className="multiple-lines left-wider-screen ingredients-wider">
                      <h3>Ingredients:</h3>
                      {recipe &&
                        recipe?.ingredients.map((ingredient) => (
                          <ul key={ingredient.id}>
                            <li className="ingredients">
                              {ingredient.quantity} gr {ingredient.ingredient}
                            </li>
                          </ul>
                        ))}
                    </section>
                  </div>
                  <section className="multiple-lines description-wider-screen">
                    <h3>How to make it:</h3>
                    <p>{recipe.description}</p>
                  </section>
                </div>
              </>
            )}
          </div>
          <div className="buttons-edit">
            <button onClick={() => navigate(-1)}>Back</button>
            <Link to={`/recipes/edit/${recipe?._id}`}>
              <button>Edit</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default RecipeDetails;
