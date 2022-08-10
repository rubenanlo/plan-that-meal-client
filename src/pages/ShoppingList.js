import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

function ShoppingList(props) {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {props.list.map((element) => {
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
