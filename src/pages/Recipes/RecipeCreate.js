import axios from "axios";
import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./RecipeCreateUpdate.css";

function RecipeCreate() {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serving, setServing] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");

  const { isLoading } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    const newIngredient = {
      id: nanoid(),
      ingredient: inputIngredient,
      quantity: inputQuantity,
      isSelected: false,
    };
    setIngredients([...ingredients, newIngredient]);
    setInputIngredient("");
    setInputQuantity("");
  };

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
      .then(() => {
        navigate("/recipes");

        setImg("");
        setTitle("");
        setDescription("");
        setServing("");
        setProtein("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new recipe");
        console.log(error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="background">
          <div className="fields-user">
            <h2>Create your recipe</h2>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <p className="required-fields">(*) required fields</p>
            <form
              id="recipe-form"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <label>Title:(*)</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Image:</label>
              <input type="file" onChange={(e) => handleFileUpload(e)} />

              <label>Main protein:(*)</label>
              <div>
                <div>
                  <button
                    type="button"
                    name="protein"
                    value={protein}
                    style={{
                      backgroundColor:
                        protein === "Meat" ? "var(--purple-dark)" : "",
                      color:
                        protein === "Meat"
                          ? "var(--text-light)"
                          : "var(--text-dark)",
                    }}
                    onClick={() => setProtein("Meat")}
                  >
                    Meat
                  </button>
                  <button
                    name="protein"
                    type="button"
                    value={protein}
                    style={{
                      backgroundColor:
                        protein === "Fish" ? "var(--purple-dark)" : "",
                      color:
                        protein === "Fish"
                          ? "var(--text-light)"
                          : "var(--text-dark)",
                    }}
                    onClick={() => setProtein("Fish")}
                  >
                    Fish
                  </button>
                  <button
                    name="protein"
                    type="button"
                    value={protein}
                    style={{
                      backgroundColor:
                        protein === "Eggs" ? "var(--purple-dark)" : "",
                      color:
                        protein === "Eggs"
                          ? "var(--text-light)"
                          : "var(--text-dark)",
                    }}
                    onClick={() => setProtein("Eggs")}
                  >
                    Eggs
                  </button>
                </div>
                <div>
                  <button
                    name="protein"
                    type="button"
                    value={protein}
                    style={{
                      backgroundColor:
                        protein === "Legumes" ? "var(--purple-dark)" : "",
                      color:
                        protein === "Legumes"
                          ? "var(--text-light)"
                          : "var(--text-dark)",
                    }}
                    onClick={() => setProtein("Legumes")}
                  >
                    Legumes
                  </button>
                  <button
                    name="protein"
                    type="button"
                    value={protein}
                    style={{
                      backgroundColor:
                        protein === "Seeds and nuts"
                          ? "var(--purple-dark)"
                          : "",
                      color:
                        protein === "Seeds and nuts"
                          ? "var(--text-light)"
                          : "var(--text-dark)",
                    }}
                    onClick={() => setProtein("Seeds and nuts")}
                  >
                    Seeds and nuts
                  </button>
                </div>
              </div>
              <label>Serving:</label>
              <input
                type="number"
                min="0"
                name="serving"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
              />
            </form>

            <div className="ingredients">
              <label>Ingredients: </label>
              <div>
                <input
                  placeholder="Add ingredient"
                  value={inputIngredient}
                  onChange={(e) => setInputIngredient(e.target.value)}
                ></input>
                <input
                  placeholder="Add quantity (gr.)"
                  value={inputQuantity}
                  onChange={(e) => setInputQuantity(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  if (inputIngredient && inputQuantity) {
                    handleAddButtonClick();
                  } else {
                    alert("Please add an ingredient and quantity");
                  }
                }}
              >
                Add
              </button>
              {ingredients.map((ingredient) => {
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
            </div>

            <form id="recipe-form">
              <label>Description:</label>
              <textarea
                type="textarea"
                cols={40}
                rows={10}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </form>
          </div>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <button type="submit" form="recipe-form">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeCreate;
