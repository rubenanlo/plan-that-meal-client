import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

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
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();

        navigate("/Home");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLoginSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
