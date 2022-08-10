import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./PlanningCreate.css";

function PlanningsCreate() {
  const [recipes, setRecipes] = useState([]);
  const { isLoading } = useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [mealRecipe1, setMealRecipe1] = useState("");
  const [mealRecipe2, setMealRecipe2] = useState("");
  const [mealRecipe3, setMealRecipe3] = useState("");
  const [mealRecipe4, setMealRecipe4] = useState("");
  const [mealRecipe5, setMealRecipe5] = useState("");
  const [mealRecipe6, setMealRecipe6] = useState("");
  const [mealRecipe7, setMealRecipe7] = useState("");
  const [mealRecipe8, setMealRecipe8] = useState("");
  const [mealRecipe9, setMealRecipe9] = useState("");
  const [mealRecipe10, setMealRecipe10] = useState("");
  const [mealRecipe11, setMealRecipe11] = useState("");
  const [mealRecipe12, setMealRecipe12] = useState("");
  const [mealRecipe13, setMealRecipe13] = useState("");
  const [mealRecipe14, setMealRecipe14] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const newMealPlan = [
      mealRecipe1,
      mealRecipe2,
      mealRecipe3,
      mealRecipe4,
      mealRecipe5,
      mealRecipe6,
      mealRecipe7,
      mealRecipe8,
      mealRecipe9,
      mealRecipe10,
      mealRecipe11,
      mealRecipe12,
      mealRecipe13,
      mealRecipe14,
    ];

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/weeklyplans`,
        {
          startDate,
          mealRecipes: newMealPlan,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate("/weeklyplans");

        setStartDate("");
        setMealRecipe1("");
        setMealRecipe2("");
        setMealRecipe3("");
        setMealRecipe4("");
        setMealRecipe5("");
        setMealRecipe6("");
        setMealRecipe7("");
        setMealRecipe8("");
        setMealRecipe9("");
        setMealRecipe10("");
        setMealRecipe11("");
        setMealRecipe12("");
        setMealRecipe13("");
        setMealRecipe14("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new weekly plan");
        console.log(error);
      });
  };

  const handleChangeMealOne = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe1(optionElementId);
  };
  const handleChangeMealTwo = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe2(optionElementId);
  };
  const handleChangeMealThree = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe3(optionElementId);
  };
  const handleChangeMealFour = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe4(optionElementId);
  };
  const handleChangeMealFive = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe5(optionElementId);
  };
  const handleChangeMealSix = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe6(optionElementId);
  };
  const handleChangeMealSeven = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe7(optionElementId);
  };
  const handleChangeMealEight = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe8(optionElementId);
  };
  const handleChangeMealNine = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe9(optionElementId);
  };
  const handleChangeMealTen = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe10(optionElementId);
  };
  const handleChangeMealEleven = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe11(optionElementId);
  };
  const handleChangeMealTwelve = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe12(optionElementId);
  };
  const handleChangeMealThirteen = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe13(optionElementId);
  };
  const handleChangeMealFourteen = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");

    setMealRecipe14(optionElementId);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="planning">
          <h1>Create your weekly plan</h1>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Starting date of the weekly plan:</label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />

              <div className="container-planning">
                <div className="single-day">
                  <h3>
                    {!startDate ? (
                      <p>Monday</p>
                    ) : (
                      <p>{moment(startDate).format("dddd")}</p>
                    )}
                  </h3>
                  <div>
                    <label>Lunch:</label>
                    <select required onChange={handleChangeMealOne}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Dinner:</label>
                    <select required onChange={handleChangeMealTwo}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="single-day">
                  <h3>
                    {!startDate ? (
                      <p>Tuesday</p>
                    ) : (
                      <p>{moment(startDate).add(1, "days").format("dddd")}</p>
                    )}
                  </h3>
                  <div>
                    <label>Lunch:</label>
                    <select onChange={handleChangeMealThree}>
                      <option style={{ display: "none" }}></option>

                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Dinner:</label>
                    <select required onChange={handleChangeMealFour}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="single-day">
                  <h3>
                    {!startDate ? (
                      <p>Wednesday</p>
                    ) : (
                      <p>{moment(startDate).add(2, "days").format("dddd")}</p>
                    )}
                  </h3>
                  <div>
                    <label>Lunch:</label>
                    <select onChange={handleChangeMealFive}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Dinner:</label>
                    <select required onChange={handleChangeMealSix}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="single-day">
                  <h3>
                    {!startDate ? (
                      <p>Thursday</p>
                    ) : (
                      <p>{moment(startDate).add(3, "days").format("dddd")}</p>
                    )}
                  </h3>
                  <div>
                    <label>Lunch:</label>
                    <select required onChange={handleChangeMealSeven}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Dinner:</label>
                    <select required onChange={handleChangeMealEight}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="single-day">
                  <h3>
                    {!startDate ? (
                      <p>Friday</p>
                    ) : (
                      <p>{moment(startDate).add(4, "days").format("dddd")}</p>
                    )}
                  </h3>
                  <div>
                    <label>Lunch:</label>
                    <select required onChange={handleChangeMealNine}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Dinner:</label>
                    <select required onChange={handleChangeMealTen}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="single-day">
                  <h3>
                    {!startDate ? (
                      <p>Saturday</p>
                    ) : (
                      <p>{moment(startDate).add(5, "days").format("dddd")}</p>
                    )}
                  </h3>
                  <div>
                    <label>Lunch:</label>
                    <select required onChange={handleChangeMealEleven}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Dinner:</label>
                    <select required onChange={handleChangeMealTwelve}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="single-day">
                  <h3>
                    {!startDate ? (
                      <p>Sunday</p>
                    ) : (
                      <p>{moment(startDate).add(6, "days").format("dddd")}</p>
                    )}
                  </h3>
                  <div>
                    <label>Lunch:</label>
                    <select required onChange={handleChangeMealThirteen}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Dinner:</label>
                    <select required onChange={handleChangeMealFourteen}>
                      <option style={{ display: "none" }}></option>
                      {recipes.map((recipe) => {
                        return (
                          <option key={recipe._id} id={recipe._id}>
                            {recipe.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default PlanningsCreate;
