import UserNavigation from "../components/UserNavigation";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useEffect, useState } from "react";
import BudgetList from "../components/BudgetList";

const BudgetTracking = () => {
  const [years, setYears] = useState([]);
  const [currentlySelectedMonth, setCurrentSelectedMonth] = useState(null);
  const [currentlySelectedYear, setCurrentlySelectedYear] = useState("2024");
  const [budgetsArray, setBudgetArray] = useState([]);

  function calculateSpentPercentages(budgetsArray, expensesArray, month, year) {
    // Format the month and year to match the budgetDate format ("YY-MM")
    const formattedMonth = month.padStart(2, "0"); // Ensure month is two digits
    const monthYear = year + "-" + formattedMonth; // Format to "YY-MM"
    const relevantBudgets = budgetsArray.filter(
      (budget) => budget.budgetDate === monthYear
    );
    const expensesSumByCategory = expensesArray.reduce((acc, expense) => {
      acc[expense.category.toLowerCase()] =
        (acc[expense.category.toLowerCase()] || 0) + expense.amount;
      return acc;
    }, {});

    return relevantBudgets.map((budget) => {
      const spent = expensesSumByCategory[budget.category.toLowerCase()] || 0;
      const spentPercentage = (spent / budget.limit) * 100;
      return {
        ...budget,
        spent,
        spentPercentage: spentPercentage.toFixed(2) + "%", // Format percentage with 2 decimal places
      };
    });
  }

  function getToken() {
    const tokenObj = JSON.parse(localStorage.getItem("token"));
    if (!tokenObj) return null;

    const currentTime = new Date().getTime();
    if (currentTime > tokenObj.expires) {
      localStorage.removeItem("token"); // Remove expired token
      return null;
    }

    return tokenObj.value;
  }

  useEffect(() => {
    const token = getToken();
    axios
      .get("https://partialbackendforweb.onrender.com/pages/api/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        displayBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving budget data:", error);
      });
  }, [currentlySelectedMonth]);

  async function getExpensesBasedOnMonthAndYear() {
    const token = getToken();
    try {
      const response = await axios.get(
        "https://partialbackendforweb.onrender.com/pages/api/expenses/retrieve",
        {
          params: {
            month: currentlySelectedMonth,
            year: currentlySelectedYear,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Once the data is fetched, return the expenses array
      return response.data.expenses; // This waits for the axios request to complete
    } catch (error) {
      console.error("Error retrieving data:", error);
      return []; // Return an empty array in case of an error
    }
  }

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    for (let year = currentYear; year >= 1970; year--) {
      yearsArray.push(year.toString());
    }

    setYears(yearsArray);
  }, []);

  //----------------------------------------------------------------------
  // let selectedYear = null; // Variable to store the selected year

  // Function to handle year selection
  function selectingYear(e) {
    // selectYear.value = year; // Store the selected year
    // setSelectedYear(year)
    setCurrentlySelectedYear(e.target.value.toString());
  }

  async function displayBudgets(response) {
    if (!currentlySelectedMonth || !currentlySelectedYear) {
      return;
    }

    const expenseArray = await getExpensesBasedOnMonthAndYear(); // Assuming this function returns expense data

    setBudgetArray(() =>
      calculateSpentPercentages(
        response,
        expenseArray,
        currentlySelectedMonth,
        currentlySelectedYear
      )
    );
  }

  // Function to handle month selection
  function selectMonth(month) {
    if (currentlySelectedYear) {
      // Log the selected year and month to the console
      console.log("Selected Year:", currentlySelectedYear);
      console.log("Selected Month:", month.toString());
      setCurrentSelectedMonth(month.toString());
      // displayBudgets(budgetsArray);
    } else {
      // Prompt the user to select a year first
      console.log("Please select a year first");
    }
  }

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
          Year:
        </label>
        {/* <!-- <select
          id="year"
          className="dark:bg-gray-900 dark:text-white p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onchange="selectingYear(this.value)"
        > --> */}
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
        <label htmlFor="month" className="flex items-center">
          Month:
        </label>
        <select
          id="month"
          onChange={handleMonth}
          className="p-2 ml-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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

      {/* <!-- Month Selector - Desktop -->
  <!-- Month Selector - Desktop --> */}
      <div className="hidden sm:flex flex-wrap justify-center gap-1 my-8">
        {/* <!-- Month Options --> */}
        <div
          id="janBtn"
          value="1"
          onClick={() => selectMonth(1)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          January
        </div>
        <div
          id="febBtn"
          value="2"
          onClick={() => selectMonth(2)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          February
        </div>
        <div
          id="marBtn"
          value="3"
          onClick={() => selectMonth(3)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          March
        </div>
        <div
          id="aprBtn"
          value="4"
          onClick={() => selectMonth(4)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          April
        </div>
        <div
          id="mayBtn"
          value="5"
          onClick={() => selectMonth(5)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          May
        </div>
        <div
          id="junBtn"
          value="6"
          onClick={() => selectMonth(6)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          June
        </div>
        <div
          id="julBtn"
          value="7"
          onClick={() => selectMonth(7)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          July
        </div>
        <div
          id="augBtn"
          value="8"
          onClick={() => selectMonth(8)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          August
        </div>
        <div
          id="sepBtn"
          value="9"
          onClick={() => selectMonth(9)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          September
        </div>
        <div
          id="octBtn"
          value="10"
          onClick={() => selectMonth(10)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          October
        </div>
        <div
          id="novBtn"
          value="11"
          onClick={() => selectMonth(11)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 dark:hover:bg-gray-500 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          November
        </div>
        <div
          id="decBtn"
          value="12"
          onClick={() => selectMonth(12)}
          className="month-btn dark:bg-gray-900 dark:text-white p-4 bg-white border border-gray-300 rounded-md text-center cursor-pointer transition duration-300 hover:bg-gray-300"
        >
          December
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-2 mx-4 px-2 gap-3 justify-center items-center">
        {/* <!--expenses--> */}
        <div className="dark:bg-gray-900 container max-w-xl shadow-xl border border-solid">
          {currentlySelectedMonth ? (
            <BudgetList budgetArray={budgetsArray} />
          ) : (
            <ul
              id="budgetList"
              className="budgets-list max-w-xl divide-gray-200 dark:divide-gray-900"
            >

            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BudgetTracking;
