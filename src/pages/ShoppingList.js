import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ShoppingList() {
  const [list, setList] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setList(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  if (list === null) {
    return <>loading...</>;
  }

  return (
    <div>
      {list.map((element) => {
        return (
          <div key={element._id}>
            <Link to={`/shoppingitems/${element._id}`}>
              <p>
                Created on {moment(element.date).format("dddd, DD MMMM yyyy")}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ShoppingList;
