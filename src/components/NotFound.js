import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound">
      <p>
        mmmm..... this is not part of the package.... maybe you wanna try to go
        in <Link to="/">here</Link> ?{" "}
      </p>
    </div>
  );
}

export default NotFound;
