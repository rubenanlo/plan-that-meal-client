import moment from "moment";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ShoppingList(props) {
  const navigate = useNavigate();

  const { isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {props.list.length === 0 && (
            <div>
              <p>
                There is still no shopping list? Get in there and create one{" "}
                <Link to="/shoppingitems/create">here</Link>
              </p>
              <img src="../../empty-recipe.jpeg" alt="" />
            </div>
          )}
          <button onClick={() => navigate(-1)}>Back</button>
          {props.list?.map((element) => {
            return (
              <div key={element._id}>
                <Link to={`/shoppingitems/${element._id}`}>
                  <p>
                    Created on
                    {moment(element?.date).format("dddd, DD MMMM yyyy")}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ShoppingList;
