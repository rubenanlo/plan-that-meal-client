import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  const { recipeId } = useParams();

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

  return (
    <div className="RecipeDetails" key={recipeId}>
      {recipe && (
        <>
          <img src={recipe.img} alt="dish" />
          <h1>{recipe.title}</h1>
          <p>{recipe.protein}</p>
          <p>{recipe.serving}</p>
          <p>Ingredients:</p>
          {recipe &&
            recipe?.ingredients.map((ingredient) => (
              <li className="Ingredients" key={ingredient.id}>
                <p>
                  {ingredient.quantity} gr {ingredient.ingredient}
                </p>
              </li>
            ))}

          <p>{recipe.description}</p>
        </>
      )}

      <Link to={`/recipes/edit/${recipe?._id}`}>
        <button>Edit</button>
      </Link>
      <Link to="/recipes">
        <button>Back to recipes</button>
      </Link>
    </div>
  );
}

export default RecipeDetails;
