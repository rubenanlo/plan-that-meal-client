import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipesCreate(props) {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serving, setServing] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
  ]);

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(protein);

    setErrorMsg("");

    const requestBody = {
      img,
      title,
      description,
      serving,
      protein,
      ingredients,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/recipes`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/recipes");

        setImg("");
        setTitle("");
        setDescription("");
        setServing("");
        setProtein("");
        setIngredients("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new project");
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
          <textarea
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <textarea
            type="quantity"
            name="serving"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            type="text"
            name="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <label>Description:</label>
        </div>
        <div>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RecipesCreate;
