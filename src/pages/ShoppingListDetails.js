import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ShoppingListDetails() {
  const [list, setList] = useState([]);

  const [isSelected, setIsSelected] = useState(false);
  const storedToken = localStorage.getItem("authToken");
  const { shoppingListId } = useParams();
  const navigate = useNavigate();

  const { isLoading } = useContext(AuthContext);

  const setToComplete = () => {
    isSelected === false ? setIsSelected(true) : setIsSelected(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems/${shoppingListId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const shoppingList = response.data;
        setList(shoppingList);
      })
      .catch((error) => console.log(error));
  }, [shoppingListId, storedToken]);

  const handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/shoppingitems/${shoppingListId}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate("/shoppingitems");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="col-7">
          <div>
            <h3>Created: {moment(list.date).format("dddd, DD MMMM yyyy")}</h3>
            <NavLink to={`/shoppingitems/edit/${shoppingListId}`}>
              <button>Edit</button>
            </NavLink>

            <button onClick={handleDelete}>Delete</button>
          </div>

          <div key={list._id}>
            {list.items?.map((element, index) => {
              return (
                <div key={element._id} onClick={() => setToComplete()}>
                  {isSelected && (
                    <img
                      src="../../completed.png"
                      alt="completed"
                      style={{ width: "1.5rem" }}
                    />
                  )}
                  {!isSelected && (
                    <img
                      src="../../not-completed.png"
                      alt="completed"
                      style={{ width: "1.5rem" }}
                    />
                  )}
                  <p>{element.description}</p>
                  <p>{element.quantity}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingListDetails;
