import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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

          <button onClick={() => navigate(-1)}>Back</button>
          <Link to={`/recipes/edit/${recipe?._id}`}>
            <button>Edit</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default RecipeDetails;
