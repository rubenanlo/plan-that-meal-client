import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RecipesUpdate(props) {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serving, setServing] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const { recipeId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("img", e.target.files[0]);

    return axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImg(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleAddButtonClick = () => {
    const newIngredient = {
      id: nanoid(),
      ingredient: inputIngredient,
      quantity: inputQuantity,
    };
    setIngredients([...ingredients, newIngredient]);
    setInputIngredient("");
    setInputQuantity("");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setImg(oneRecipe.img);
        setTitle(oneRecipe.title);
        setDescription(oneRecipe.description);
        setServing(oneRecipe.serving);
        setProtein(oneRecipe.protein);
        setIngredients(oneRecipe.ingredients);
      })
      .catch((error) => console.log(error));
  }, [recipeId, storedToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
        { img, title, description, serving, protein, ingredients },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate(`/recipes/${recipeId}`);
      })
      .catch((error) => {
        setErrorMsg("oops, error updating this recipe");
        console.log(error);
      });
  };

  return (
    <div className="EditRecipe">
      <h1>Update your recipe</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <span>(*) required fields</span>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </div>

        <div>
          <label>Title:(*)</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Main protein:(*)</label>
          <div>
            <button
              type="button"
              name="protein"
              value={protein}
              onClick={() => setProtein("Meat")}
            >
              Meat
            </button>
            <button
              name="protein"
              type="button"
              value={protein}
              onClick={() => setProtein("Fish")}
            >
              Fish
            </button>
          </div>
          <div>
            <button
              name="protein"
              type="button"
              value={protein}
              onClick={() => setProtein("Eggs")}
            >
              Eggs
            </button>
            <button
              name="protein"
              type="button"
              value={protein}
              onClick={() => setProtein("Legumes")}
            >
              Legumes
            </button>
          </div>
          <button
            name="protein"
            type="button"
            value={protein}
            onClick={() => setProtein("Seeds and nuts")}
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
          <label>Description:(*)</label>
          <textarea
            required
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
          className="add-ingredients"
          value={inputIngredient}
          onChange={(e) => setInputIngredient(e.target.value)}
        ></input>
        <label>Quantity</label>
        <input
          className="add-quantity"
          value={inputQuantity}
          onChange={(e) => setInputQuantity(e.target.value)}
        />
        <span>gr</span>
        <button onClick={() => handleAddButtonClick()}>Add</button>
      </div>

      {ingredients.map((ingredient, index) => {
        return (
          <div key={ingredient.id}>
            <p>
              {ingredient.quantity} gr. {ingredient.ingredient}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIngredients(
                  ingredients.filter((x) => x.id !== ingredient.id)
                );
              }}
            >
              x
            </button>
          </div>
        );
      })}
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default RecipesUpdate;
