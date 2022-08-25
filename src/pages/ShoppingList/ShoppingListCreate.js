import axios from "axios";
import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./ShoppingCreateEdit.css";

function ShoppingListCreate() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const { isLoading } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    const newItem = {
      _id: nanoid(),
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
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="structure">
          <div className="fields-user">
            <h2>Create your shopping list</h2>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <div className="ingredients">
              <div>
                <label>Items: </label>
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
                <button onClick={() => handleAddButtonClick()}>Add</button>
              </div>
              <div className="scroll-ingredients">
                {items.map((item, index) => {
                  return (
                    <div key={item._id} className="showing-ingredients">
                      <p>
                        {item.description} x {item.quantity}
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setItems(
                            items.filter((element) => element._id !== item._id)
                          );
                        }}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <button onClick={() => handleSubmit()}>Save shopping list</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingListCreate;
