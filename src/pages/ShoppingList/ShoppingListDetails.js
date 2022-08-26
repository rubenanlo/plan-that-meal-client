import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "../../components/PlanningHub/PlanningsMain.css";
import "./ShoppingDetails.css";

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
        <div className="structure">
          <div className="fields-user">
            <h3>Created: {moment(list.date).format("dddd, DD MMMM yyyy")}</h3>
            <div className="scroll-ingredients">
              {list.items?.map((element, index) => {
                return (
                  <p key={element._id}>
                    {element.description} x {element.quantity}
                  </p>
                );
              })}
            </div>
          </div>
          <NavLink to={`/shoppingitems/edit/${shoppingListId}`}>
            <button>Edit</button>
          </NavLink>
          <button className="specificButton" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export default ShoppingListDetails;
