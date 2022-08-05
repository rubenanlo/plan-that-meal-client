import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HomePageUser from "./pages/HomePageUser";
import LoginPage from "./pages/LoginPage";
import PlanningsCreate from "./pages/PlanningsCreate";
import PlanningsDetails from "./pages/PlanningsDetails";
import PlanningsList from "./pages/PlanningsList";
import RecipeDetails from "./pages/RecipeDetails";
import RecipesCreate from "./pages/RecipesCreate";
import RecipesUpdate from "./pages/RecipesUpdate";
import RecipesList from "./pages/RecipesList";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<HomePageUser />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/recipes" element={<RecipesList />}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetails />}></Route>
        <Route
          path="/recipes/edit/:recipeId"
          element={<RecipesUpdate />}
        ></Route>
        <Route path="/recipes/create" element={<RecipesCreate />}></Route>
        <Route path="/weeklyplans" element={<PlanningsList />}></Route>
        <Route
          path="/weeklyplans/:weeklyPlanId"
          element={<PlanningsDetails />}
        ></Route>
        <Route path="/weeklyplans/create" element={<PlanningsCreate />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
