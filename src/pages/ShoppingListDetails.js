import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ShoppingListDetails() {
  const [list, setList] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const { shoppingListId } = useParams();
  const navigate = useNavigate();

  const { isLoading } = useContext(AuthContext);

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
            {list.items?.map((element) => {
              return (
                <div key={element._id}>
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
