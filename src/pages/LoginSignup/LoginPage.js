import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";

import { AuthContext } from "../../context/auth.context";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { username, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();

        window.location.reload(navigate("/"));
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="sign-page">
      <h2>Login</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="sign-form" onSubmit={handleLoginSubmit}>
        <div className="fields-user">
          <div className="field-user">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field-user">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>

      <p>
        You don't have an account yet? Please{" "}
        <Link to={"/signup"}> Sign Up</Link> instead
      </p>
    </div>
  );
}

export default LoginPage;
