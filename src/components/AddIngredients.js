import { useState } from "react";
import axios from "axios";

function AddRecipe(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg(""); //in case the post below doesn't work to show this for the user.

    const requestBody = { title, description };

    axios
      .post(`${process.env.REACT_APP_API_URL}/projects`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //update list of projects
        props.refreshProjects(); //this is key to refreseh the website and show the newly created project

        //clear form
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new project");
        console.log(error);
      });
  };

  return (
    <div className="AddRecipe">
      <h3>Add Project</h3>

      {errorMsg && <p className="error">{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;
