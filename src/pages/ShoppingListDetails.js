import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ShoppingListDetails() {
  const [list, setList] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const { shoppingListId } = useParams();
  const navigate = useNavigate();
  console.log(shoppingListId);

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
    <div>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <Link to={`/shoppingitems/edit/${shoppingListId}`}>
          <button>Edit</button>
        </Link>

        <button onClick={handleDelete}>Delete</button>
      </div>

      <div key={list._id}>
        <p>{moment(list.date).format("dddd mmmm yyyy")}</p>
        {list.items?.map((element) => {
          return (
            <div key={element.id}>
              <p>{element.description}</p>
              <p>{element.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShoppingListDetails;
