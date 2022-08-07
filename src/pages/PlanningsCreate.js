import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PlanningsCreate() {
  const [startDate, setStartDate] = useState("");
  const [mealRecipe11, setMealRecipe11] = useState("");
  const [mealRecipe12, setMealRecipe12] = useState("");
  const [mealRecipe21, setMealRecipe21] = useState("");
  const [mealRecipe22, setMealRecipe22] = useState("");
  const [mealRecipe31, setMealRecipe31] = useState("");
  const [mealRecipe32, setMealRecipe32] = useState("");
  const [mealRecipe41, setMealRecipe41] = useState("");
  const [mealRecipe42, setMealRecipe42] = useState("");
  const [mealRecipe51, setMealRecipe51] = useState("");
  const [mealRecipe52, setMealRecipe52] = useState("");
  const [mealRecipe61, setMealRecipe61] = useState("");
  const [mealRecipe62, setMealRecipe62] = useState("");
  const [mealRecipe71, setMealRecipe71] = useState("");
  const [mealRecipe72, setMealRecipe72] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/weeklyplans`,
        {
          startDate,
          mealRecipe11,
          mealRecipe12,
          mealRecipe21,
          mealRecipe22,
          mealRecipe31,
          mealRecipe32,
          mealRecipe41,
          mealRecipe42,
          mealRecipe51,
          mealRecipe52,
          mealRecipe61,
          mealRecipe62,
          mealRecipe71,
          mealRecipe72,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate("/weeklyplans");

        setStartDate("");
        setMealRecipe11("");
        setMealRecipe12("");
        setMealRecipe21("");
        setMealRecipe22("");
        setMealRecipe31("");
        setMealRecipe32("");
        setMealRecipe41("");
        setMealRecipe42("");
        setMealRecipe51("");
        setMealRecipe52("");
        setMealRecipe61("");
        setMealRecipe62("");
        setMealRecipe71("");
        setMealRecipe72("");
      })
      .catch((error) => {
        setErrorMsg("oops, error creating a new weekly plan");
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Create your weekly plan</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Starting date of the weekly plan:(*)</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label>
            {!startDate ? <p>Monday</p> : moment(startDate).format("dddd")}
          </label>
          <input
            type="list"
            name="startDate"
            value={mealRecipe11}
            onChange={(e) => setMealRecipe11(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default PlanningsCreate;
