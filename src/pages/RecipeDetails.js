import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  const { recipeId } = useParams();

  useEffect(() => {
    getProject();
  }, []);

  const getProject = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="RecipeDetails">
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </>
      )}

      {recipe &&
        recipe?.ingredients?.map((ingredient) => (
          <li className="Ingredients">
            <h3>{ingredient.ingredient}</h3>
            <h4>Description:</h4>
            <p>{ingredient.quantity}</p>
          </li>
        ))}

      <Link to={`/recipes/edit/${recipe?._id}`}>
        {/* an alternative is to rely on the projectId from useParams*/}
        <button>Edit</button>
      </Link>
      <Link to="/recipes">
        <button>Back to recipes</button>
      </Link>
    </div>
  );
}

export default RecipeDetails;
