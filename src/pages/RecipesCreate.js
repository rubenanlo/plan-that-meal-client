import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipesCreate(props) {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serving, setServing] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    const newIngredient = {
      ingredient: inputIngredient,
      quantity: inputQuantity,
    };
    const newIngredients = [...ingredients, newIngredient];
    setIngredients(newIngredients);
    setInputIngredient("");
    setInputQuantity("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg("");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/recipes`,
        { img, title, description, serving, protein, ingredients },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("YAY");
        navigate("/recipes");

        setImg("");
        setTitle("");
        setDescription("");
        setServing("");
        setProtein("");
        setInputIngredient("");
        setInputQuantity("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new recipe");
        console.log(error);
      });
  };

  return (
    <div className="AddRecipe">
      <h1>Create your recipe</h1>
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
          value={inputIngredient}
          onChange={(e) => setInputIngredient(e.target.value)}
          className="add-ingredients"
        ></input>
        <label>Quantity</label>
        <input
          value={inputQuantity}
          onChange={(e) => setInputQuantity(e.target.value)}
          className="add-quantity"
        ></input>
        <button onClick={() => handleAddButtonClick()}>Add</button>
      </div>

      {ingredients?.map((ingredient, index) => {
        return (
          <div className="ingredients-list" key={ingredients.length}>
            <p className="ingredient">{ingredient.ingredient}</p>
            <p className="quantity">{ingredient.quantity}</p>
          </div>
        );
      })}
    </div>
  );
}

export default RecipesCreate;
