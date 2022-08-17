import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlanningsCreate from "./pages/PlanningsCreate";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeCreate from "./pages/RecipeCreate";
import RecipeUpdate from "./pages/RecipeUpdate";
import RecipesList from "./pages/RecipesList";
import SignupPage from "./pages/SignupPage";
import ShoppingListCreate from "./pages/ShoppingListCreate";
import ShoppingListUpdate from "./pages/ShoppingListUpdate";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";
import ShoppingListMain from "./components/ShoppingListMain";
import PlanningsMain from "./components/PlanningsMain";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [recipes, setRecipes] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getAllRecipes = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  useEffect(() => {
    getAllRecipes();
  }, [getAllRecipes]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Footer />
              <HomePage />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Footer />
              <SignupPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Footer />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/recipes"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipesList recipes={recipes} refreshRecipes={getAllRecipes} />
            </>
          }
        />
        <Route
          path="/recipes/:recipeId"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipeDetails />
            </>
          }
        />
        <Route
          path="/recipes/edit/:recipeId"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipeUpdate />
            </>
          }
        />
        <Route
          path="/recipes/create"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipeCreate />
            </>
          }
        />
        <Route
          path="/weeklyplans/*"
          element={
            <>
              <Navbar />
              <Footer />
              <PlanningsMain />
            </>
          }
        />
        <Route
          path="/weeklyplans/create"
          element={
            <>
              <Navbar />
              <Footer />
              <PlanningsCreate recipes={recipes} />
            </>
          }
        />
        <Route
          path="/shoppingitems/*"
          element={
            <>
              <Navbar />
              <Footer />
              <ShoppingListMain />
            </>
          }
        />
        <Route
          path="/shoppingitems/create"
          element={
            <>
              <Navbar />
              <Footer />
              <ShoppingListCreate />
            </>
          }
        />
        <Route
          path="/shoppingitems/edit/:shoppingListId"
          element={
            <>
              <Navbar />
              <Footer />
              <ShoppingListUpdate />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
