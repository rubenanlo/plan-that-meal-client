import axios from "axios";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ShoppingList() {
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    const newItem = {
      id: nanoid(),
      description: description,
      quantity: quantity,
    };
    setItems([...items, newItem]);
    setDescription("");
    setQuantity("");
  };

  const handleSubmit = () => {
    setErrorMsg("");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/shoppingitems`,
        { items },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate("/shoppingitems");
      })

      .catch((error) => {
        setErrorMsg("oops, error creating a shopping list");
        console.log(error);
      });
  };

  return (
    <div>
      <div className="AddRecipe">
        <h1>Create your shopping list</h1>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <div className="Input-value">
          <label>items: </label>
          <input
            className="add-items"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <label>Quantity</label>
          <input
            className="add-quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <span>gr</span>
          <button onClick={() => handleAddButtonClick()}>Add</button>
          {items.map((items, index) => {
            return (
              <div key={items.id}>
                <p>
                  {items.description} gr. {items.quantity}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDescription(items.filter((x) => x.id !== items.id));
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

          <button onClick={() => handleSubmit()}>Save shopping list</button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
