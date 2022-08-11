import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, username };

    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="SignupPage">
          <h1>Sign Up</h1>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSignupSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button type="submit">Sign Up</button>
          </form>

          <p>
            Do you already have an account? Please{" "}
            <Link to={"/login"}> Login</Link> instead
          </p>
        </div>
      )}
    </>
  );
}

export default SignupPage;
