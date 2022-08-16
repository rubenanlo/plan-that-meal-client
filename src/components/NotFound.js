import React from "react";
import { Link } from "react-router-dom";
import FooterNotFound from "./FooterNotFound";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <p className="not-found-message">
        mmmm..... this is not part of the package.... maybe you wanna try to go
        in{" "}
        <Link className="link" to="/">
          here
        </Link>{" "}
        ?{" "}
      </p>
      <FooterNotFound />
    </div>
  );
}

export default NotFound;
