import axios from "axios";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./ShoppingCreateEdit.css";

function ShoppingListUpdate() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const { isLoading } = useContext(AuthContext);

  const { shoppingListId } = useParams();

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems/${shoppingListId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneList = response.data;
        setItems(oneList.items);
      })
      .catch((error) => console.log(error));
  }, [shoppingListId, storedToken]);

  const handleSubmit = () => {
    setErrorMsg("");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/shoppingitems/${shoppingListId}`,
        { items },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate(`/shoppingitems/${shoppingListId}`);
      })

      .catch((error) => {
        setErrorMsg("oops, error editing a shopping list");
        console.log(error);
      });
  };

  if (items === null) {
    return <>loading...</>;
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="structure">
          <div className="fields-user">
            <h2>Edit your shopping list</h2>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <div className="ingredients">
              <div className="single-item">
                <div>
                  <label>Items: </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>
                <div className="single-item">
                  <label>Quantity</label>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
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
            <div className="buttons-shopping">
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>

              <button onClick={() => handleSubmit()}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingListUpdate;
