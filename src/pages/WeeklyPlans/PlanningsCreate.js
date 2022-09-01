import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Planning.css";
import "../../components/PlanningHub/PlanningsMain.css";

function PlanningsCreate() {
  const { isLoading } = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [mealRecipes, setMealRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setMealRecipes((prevArr) => [...prevArr, optionElementId]);
  };

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

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/weeklyplans`,
        {
          startDate,
          mealRecipes,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate("/weeklyplans");

        setStartDate("");
        setMealRecipes("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new weekly plan");
        console.log(error);
      });
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="planning">
            <h2>Create your weekly plan</h2>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <form onSubmit={handleSubmit} className="form-new-planning">
              <div>
                <label>Starting date of the weekly plan:</label>
                <input
                  type="date"
                  className="date"
                  name="startDate"
                  value={startDate}
                  min={Date.now()}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />

                <div className="container-daily-plan">
                  <div className="single-day">
                    <section>
                      {!startDate ? (
                        <h2>Monday</h2>
                      ) : (
                        <h2>{moment(startDate).format("dddd")}</h2>
                      )}
                    </section>
                    <div className="meal">
                      <label>Lunch:</label>
                      <select required onChange={handleChange}>
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
                    <div className="meal">
                      <label>Dinner:</label>
                      <select required onChange={handleChange}>
                        <option style={{ display: "none" }}></option>
                        {recipes.map((recipe, index) => {
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
                    <section>
                      {!startDate ? (
                        <h2>Tuesday</h2>
                      ) : (
                        <h2>
                          {moment(startDate).add(1, "days").format("dddd")}
                        </h2>
                      )}
                    </section>
                    <div className="meal">
                      <label>Lunch:</label>
                      <select onChange={handleChange}>
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
                    <div className="meal">
                      <label>Dinner:</label>
                      <select required onChange={handleChange}>
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
                    <section>
                      {!startDate ? (
                        <h2>Wednesday</h2>
                      ) : (
                        <h2>
                          {moment(startDate).add(2, "days").format("dddd")}
                        </h2>
                      )}
                    </section>
                    <div className="meal">
                      <label>Lunch:</label>
                      <select onChange={handleChange}>
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
                    <div className="meal">
                      <label>Dinner:</label>
                      <select required onChange={handleChange}>
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
                    <section>
                      {!startDate ? (
                        <h2>Thursday</h2>
                      ) : (
                        <h2>
                          {moment(startDate).add(3, "days").format("dddd")}
                        </h2>
                      )}
                    </section>
                    <div className="meal">
                      <label>Lunch:</label>
                      <select required onChange={handleChange}>
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
                    <div className="meal">
                      <label>Dinner:</label>
                      <select required onChange={handleChange}>
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
                    <section>
                      {!startDate ? (
                        <h2>Friday</h2>
                      ) : (
                        <h2>
                          {moment(startDate).add(4, "days").format("dddd")}
                        </h2>
                      )}
                    </section>
                    <div className="meal">
                      <label>Lunch:</label>
                      <select required onChange={handleChange}>
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
                    <div className="meal">
                      <label>Dinner:</label>
                      <select required onChange={handleChange}>
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
                    <section>
                      {!startDate ? (
                        <h2>Saturday</h2>
                      ) : (
                        <h2>
                          {moment(startDate).add(5, "days").format("dddd")}
                        </h2>
                      )}
                    </section>
                    <div className="meal">
                      <label>Lunch:</label>
                      <select required onChange={handleChange}>
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
                    <div className="meal">
                      <label>Dinner:</label>
                      <select required onChange={handleChange}>
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
                    <section>
                      {!startDate ? (
                        <h2>Sunday</h2>
                      ) : (
                        <h2>
                          {moment(startDate).add(6, "days").format("dddd")}
                        </h2>
                      )}
                    </section>
                    <div className="meal">
                      <label>Lunch:</label>
                      <select required onChange={handleChange}>
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
                    <div className="meal">
                      <label>Dinner:</label>
                      <select required onChange={handleChange}>
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
                <button className="submit-new-planning" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PlanningsCreate;
