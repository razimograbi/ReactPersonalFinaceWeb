import UserNavigation from "../components/GeneralComponents/UserNavigation";
import Footer from "../components/GeneralComponents/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useEffect, useState } from "react";
import BudgetList from "../components/BudgetComponents/BudgetList";
import MonthPicker from "../components/PickerComponents/MonthPickerPhone";
import DesktopMonthPicker from "../components/PickerComponents/MonthPickerDesktop";
import YearPicker from "../components/PickerComponents/YearPicker";

/**
 * BudgetTracking component for tracking budgets
 */
const BudgetTracking = () => {
  // State variables for managing years, selected month, selected year, and budget array
  const [years, setYears] = useState([]);
  const [currentlySelectedMonth, setCurrentSelectedMonth] = useState("");
  const [currentlySelectedYear, setCurrentlySelectedYear] = useState("2024");
  // useEffect hook to initialize state and fetch years
  useEffect(() => {
    const storedMonth = localStorage.getItem("selectedMonth");
    const storedYear = localStorage.getItem("selectedYear");

    // Use stored values as initial state if available, otherwise use default values
    setCurrentSelectedMonth(storedMonth || "");
    setCurrentlySelectedYear(storedYear || "2024");

    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    for (let year = currentYear; year >= 1970; year--) {
      yearsArray.push(year.toString());
    }
    setYears(yearsArray);
  }, []);
  // Function to handle year selection
  function selectingYear(e) {
    setCurrentlySelectedYear(e.target.value.toString());
    localStorage.setItem("selectedYear", currentlySelectedYear);
  }
  //this was changed
  // Function to handle month selection
  function selectMonth(month) {
    setCurrentSelectedMonth(month.toString());
    localStorage.setItem("selectedMonth", month.toString());
  }
  // Function to handle month selection
  const handleMonth = (e) => {
    selectMonth(e.target.value);
  };
  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <Helmet>
        <title>Budget Tracking</title>
      </Helmet>
      <UserNavigation />
      <h2 className="my-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
        Budget Tracking{" "}
      </h2>
      <h4 className="ml-4 text-blue-500 dark:text-blue-800">
        Hint:Select = March 2024
      </h4>
      <div className=" flex items-center justify-center">
        <YearPicker
          currentlySelectedYear={currentlySelectedYear}
          selectingYear={selectingYear}
          years={years}
        ></YearPicker>
      </div>
      <div className="sm:hidden">
        <MonthPicker
          selectedMonth={currentlySelectedMonth}
          onMonthChange={handleMonth}
        />
      </div>
      {/* <!-- Month Selector - Desktop -->*/}
      <div className="hidden sm:block">
        <DesktopMonthPicker
          selectedMonth={currentlySelectedMonth}
          onMonthSelect={selectMonth}
        />
      </div>
      <div className="text-lg text-center dark:text-white">
        {currentlySelectedMonth < 10
          ? `0${currentlySelectedMonth}`
          : currentlySelectedMonth}{" "}
        / {currentlySelectedYear}
      </div>
      <div className="flex flex-col md:flex-row space-x-2 mx-4 px-2 gap-3 justify-center items-center mb-8">
        {/* <!-- Budget List --> */}
        <div className="dark:bg-gray-900 container max-w-xl  ">
          {currentlySelectedMonth ? (
            <BudgetList
              currentlySelectedMonth={currentlySelectedMonth}
              currentlySelectedYear={currentlySelectedYear}
            />
          ) : (
            <ul
              id="budgetList"
              className="budgets-list max-w-xl divide-gray-200 dark:divide-gray-900"
            ></ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default BudgetTracking;
