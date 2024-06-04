import UserNavigation from "../components/GeneralComponents/UserNavigation";
import Footer from "../components/GeneralComponents/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useEffect, useState } from "react";
import BudgetList from "../components/BudgetComponents/BudgetList";

// BudgetTracking component for tracking budgets
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

  //----------------------------------------------------------------------

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
      {/* <!-- Year Picker --> */}
      <div className=" flex items-center justify-center">
        <label htmlFor="year" className="dark:text-white">
          Year
        </label>
        <select
          id="year"
          onChange={selectingYear}
          value={currentlySelectedYear}
          className="dark:bg-gray-900 dark:text-white p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Year</option>
          {/* <!-- Generate options for years --> */}
          {years.map((year) => {
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      {/* <!-- Month Picker --> */}
      <div className="my-5 sm:hidden flex justify-center">
        <label htmlFor="month" className="flex items-center dark:text-white">
          Month
        </label>
        <select
          id="month"
          onChange={handleMonth}
          className="dark:bg-gray-900 dark:text-white p-2 ml-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* <!-- Month Selector - Desktop -->*/}
      <div className="hidden flex sm:flex flex-wrap justify-center my-8 mx-auto inline-block">
        {/* <!-- Month Options --> */}
        <div className="mx-auto shadow flex flex-row">
          <div
            id="janBtn"
            value="1"
            onClick={() => selectMonth(1)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white   text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            January
          </div>
          <div
            id="febBtn"
            value="2"
            onClick={() => selectMonth(2)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white   text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            February
          </div>
          <div
            id="marBtn"
            value="3"
            onClick={() => selectMonth(3)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white    text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            March
          </div>
          <div
            id="aprBtn"
            value="4"
            onClick={() => selectMonth(4)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white   text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            April
          </div>
          <div
            id="mayBtn"
            value="5"
            onClick={() => selectMonth(5)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white   text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            May
          </div>
          <div
            id="junBtn"
            value="6"
            onClick={() => selectMonth(6)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white   text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            June
          </div>
          <div
            id="julBtn"
            value="7"
            onClick={() => selectMonth(7)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white  text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            July
          </div>
          <div
            id="augBtn"
            value="8"
            onClick={() => selectMonth(8)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white  text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            August
          </div>
          <div
            id="sepBtn"
            value="9"
            onClick={() => selectMonth(9)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white  text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            September
          </div>
          <div
            id="octBtn"
            value="10"
            onClick={() => selectMonth(10)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            October
          </div>
          <div
            id="novBtn"
            value="11"
            onClick={() => selectMonth(11)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white  text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            November
          </div>
          <div
            id="decBtn"
            value="12"
            onClick={() => selectMonth(12)}
            className="month-btn dark:bg-gray-900 dark:text-white p-4 bg-white  text-center cursor-pointer transition duration-300 hover:bg-gray-300"
          >
            December
          </div>
        </div>
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
