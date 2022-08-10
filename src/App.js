import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlanningsCreate from "./pages/PlanningsCreate";
import PlanningsDetails from "./pages/PlanningsDetails";
import PlanningsList from "./pages/PlanningsList";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeCreate from "./pages/RecipeCreate";
import RecipeUpdate from "./pages/RecipeUpdate";
import RecipesList from "./pages/RecipesList";
import SignupPage from "./pages/SignupPage";
import ShoppingList from "./pages/ShoppingList";
import ShoppingListDetails from "./pages/ShoppingListDetails";
import ShoppingListCreate from "./pages/ShoppingListCreate";
import ShoppingListUpdate from "./pages/ShoppingListUpdate";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/recipes" element={<RecipesList />}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetails />}></Route>
        <Route
          path="/recipes/edit/:recipeId"
          element={<RecipeUpdate />}
        ></Route>
        <Route path="/recipes/create" element={<RecipeCreate />}></Route>
        <Route path="/weeklyplans" element={<PlanningsList />}></Route>
        <Route
          path="/weeklyplans/:weeklyPlanId"
          element={<PlanningsDetails />}
        ></Route>
        <Route path="/weeklyplans/create" element={<PlanningsCreate />}></Route>
        <Route path="/shoppingitems" element={<ShoppingList />}></Route>
        <Route
          path="/shoppingitems/:shoppingListId"
          element={<ShoppingListDetails />}
        ></Route>
        <Route
          path="/shoppingitems/create"
          element={<ShoppingListCreate />}
        ></Route>
        <Route
          path="/shoppingitems/edit/:shoppingListId"
          element={<ShoppingListUpdate />}
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
