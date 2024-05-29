import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Goals from "./pages/Goals";
import UserHome from "./pages/UserHome";
import Goals1 from "./pages/Goals1";
import ExpensesAddition from "./pages/ExpensesAddition";
import Expenses1 from "./pages/Expenses1";
import BudgetTracking from "./pages/BudgetTracking";
import BudgetCategoryChanger from "./pages/BudgetCategoryChanger";
import AddGoal from "./pages/AddGoal";
import ScrollToTop from "./lib/ScrollToTop";

// Defining the main App component
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/goals1" element={<Goals1 />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/expensesAddition" element={<ExpensesAddition />} />
        <Route path="/expenses1" element={<Expenses1 />} />
        <Route path="/budgetTracking" element={<BudgetTracking />} />
        <Route
          path="/budgetCategoryChanger"
          element={<BudgetCategoryChanger />}
        />
        <Route path="/addGoal" element={<AddGoal />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
