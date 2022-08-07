import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function PlanningsDetails() {
  const [weeklyPlan, setWeeklyPlan] = useState("");
  const storedToken = localStorage.getItem("authToken");
  const { weeklyPlanId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weeklyplans/${weeklyPlanId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneWeeklyPlan = response.data;
        setWeeklyPlan(oneWeeklyPlan);
      })
      .catch((error) => console.log(error));
  }, [weeklyPlanId, storedToken]);

  return (
    <div>
      {weeklyPlan && (
        <>
          <div>
            <h2>{moment(weeklyPlan.startDate).format("dddd")}</h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe11._id}`}>
              <p>{weeklyPlan.mealRecipe11.title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe12._id}`}>
              <p>{weeklyPlan.mealRecipe12.title}</p>
            </Link>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(1, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe21._id}`}>
              <p>{weeklyPlan.mealRecipe21.title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe22._id}`}>
              <p>{weeklyPlan.mealRecipe22.title}</p>
            </Link>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(2, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe31._id}`}>
              <p>{weeklyPlan.mealRecipe31.title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe32._id}`}>
              <p>{weeklyPlan.mealRecipe32.title}</p>
            </Link>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(3, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe41._id}`}>
              <p>{weeklyPlan.mealRecipe41.title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe42._id}`}>
              <p>{weeklyPlan.mealRecipe42.title}</p>
            </Link>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(4, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe51._id}`}>
              <p>{weeklyPlan.mealRecipe51.title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe52._id}`}>
              <p>{weeklyPlan.mealRecipe52.title}</p>
            </Link>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(5, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe61._id}`}>
              <p>{weeklyPlan.mealRecipe61.title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe62._id}`}>
              <p>{weeklyPlan.mealRecipe62.title}</p>
            </Link>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(6, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe71._id}`}>
              <p>{weeklyPlan.mealRecipe71.title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipe72._id}`}>
              <p>{weeklyPlan.mealRecipe72.title}</p>
            </Link>
          </div>
          <Link to={`/weeklyplans/edit/${weeklyPlan?._id}`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back to weekly plans
          </button>
        </>
      )}
    </div>
  );
}

export default PlanningsDetails;
