import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RecipeUpdate() {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serving, setServing] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [newInputIngredient, setNewInputIngredient] = useState("");
  const [newInputQuantity, setNewInputQuantity] = useState("");

  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleAddButtonClick = () => {
    const newIngredient = {
      ingredient: newInputIngredient,
      quantity: newInputQuantity,
    };
    const newIngredients = [...ingredients, newIngredient];
    setIngredients(newIngredients);
    setNewInputIngredient("");
    setNewInputQuantity("");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImg(response.data.img);
        setTitle(response.data.title);
        setServing(response.data.serving);
        setProtein(response.data.protein);
        setIngredients(response.data.ingredients);
        setInputIngredient(response.data.ingredients[0].ingredient);
        setInputQuantity(response.data.ingredients[0].quantity);
        setDescription(response.data.description);
      })
      .catch((error) => console.log(error));
  }, [recipeId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg("");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/recipes${recipeId}`,
        { img, title, description, serving, protein, ingredients },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("YAY");
        navigate(`/recipes/${recipeId}`);
      })
      .catch((error) => {
        setErrorMsg("oops, error editing this recipe");
        console.log(error);
      });
  };

  return (
    <div className="AddRecipe">
      <h1>Update this recipe</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <div>
          <label>Ingredient/s:</label>
          {ingredients[0]?.map((element) => {
            return (
              <div>
                <input
                  type="text"
                  name="ingredient"
                  value={inputIngredient}
                  onChange={(e) => setInputIngredient(e.target.value)}
                />
                <input
                  type="text"
                  name="ingredient"
                  value={element.quantity}
                  onChange={(e) => setInputQuantity(e.target.value)}
                />
              </div>
            );
          })}
        </div>

        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Main protein:</label>
          <div>
            <button
              type="button"
              name="protein"
              value={protein}
              onClick={(e) => setProtein(e.target.value)}
            >
              Meat
            </button>
            <button
              name="protein"
              type="button"
              value={protein}
              onClick={(e) => setProtein(e.target.value)}
            >
              Fish
            </button>
          </div>
          <div>
            <button
              name="protein"
              type="button"
              value="Eggs"
              onClick={(e) => setProtein(e.target.value)}
            >
              Eggs
            </button>
            <button
              name="protein"
              type="button"
              value="Legumes"
              onClick={(e) => setProtein(e.target.value)}
            >
              Legumes
            </button>
          </div>
          <button
            name="protein"
            type="button"
            value="Seeds and nuts"
            onClick={(e) => setProtein(e.target.value)}
          >
            Seeds and nuts
          </button>
        </div>
        <div>
          <label>Serving:</label>
          <input
            type="number"
            name="serving"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="Input-value">
        <label>Ingredient: </label>
        <input
          value={newInputIngredient}
          onChange={(e) => setNewInputIngredient(e.target.value)}
          className="add-ingredients"
        ></input>
        <label>Quantity</label>
        <input
          value={newInputQuantity}
          onChange={(e) => setNewInputQuantity(e.target.value)}
          className="add-quantity"
        ></input>
        <span>gr</span>
        <button onClick={() => handleAddButtonClick()}>Add</button>
      </div>

      {ingredients?.map((ingredient, index) => {
        return (
          <div>
            <div className="ingredients-list">
              <p>
                {ingredient.quantity} {ingredient.ingredient}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecipeUpdate;
