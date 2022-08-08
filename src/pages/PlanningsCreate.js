import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlanningCreate.css";

function PlanningsCreate() {
  const [recipes, setRecipes] = useState([]);

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
      mealRecipe4,
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

  return (
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
                <label htmlFor="mealRecipe">
                  Lunch:
                  <input
                    required
                    type="textarea"
                    columns="2"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe1(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <div>
                        <option
                          key={recipe._id}
                          title={recipe._id}
                          value={recipe._id}
                        ></option>
                      </div>
                    );
                  })}
                </datalist>
              </div>
              <div>
                <label htmlFor="mealRecipe">
                  Dinner:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe2(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
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
                <label htmlFor="mealRecipe">
                  Lunch:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe3(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
              </div>
              <div>
                <label htmlFor="mealRecipe">
                  Dinner:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe4(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
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
                <label htmlFor="mealRecipe">
                  Lunch:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe5(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
              </div>
              <div>
                <label htmlFor="mealRecipe">
                  Dinner:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe6(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
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
                <label htmlFor="mealRecipe">
                  Lunch:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe7(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
              </div>
              <div>
                <label htmlFor="mealRecipe">
                  Dinner:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe8(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
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
                <label htmlFor="mealRecipe">
                  Lunch:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe9(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
              </div>
              <div>
                <label htmlFor="mealRecipe">
                  Dinner:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe10(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
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
                <label htmlFor="mealRecipe">
                  Lunch:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe11(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
              </div>
              <div>
                <label htmlFor="mealRecipe">
                  Dinner:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe12(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
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
                <label htmlFor="mealRecipe">
                  Lunch:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe13(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
              </div>
              <div>
                <label htmlFor="mealRecipe">
                  Dinner:
                  <input
                    required
                    type="text"
                    placeholder="select a meal"
                    list="mealRecipe"
                    onChange={(e) => {
                      setMealRecipe14(e.target.value);
                    }}
                  />
                </label>
                <datalist id="mealRecipe">
                  {recipes.map((recipe) => {
                    return (
                      <option
                        key={recipe._id}
                        title={recipe._id}
                        value={recipe._id}
                      />
                    );
                  })}
                </datalist>
              </div>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PlanningsCreate;
