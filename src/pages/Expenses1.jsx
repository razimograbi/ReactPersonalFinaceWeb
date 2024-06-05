import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import UserNavigation from "../components/GeneralComponents/UserNavigation";
import Footer from "../components/GeneralComponents/Footer";
import DonutChart from "../components/UserHomeComponents/DonutChart";
import BarChart from "../components/ExpensesComponents/BarChart";
import ExpensesTable from "../components/ExpensesComponents/ExpensesTable";

// Expenses1 Component : This component is used to display the expenses tracking page.
const Expenses1 = () => {
  const [userData, setUserData] = useState(null);
  const [monthlyIncomes, setMonthlyIncomes] = useState(Array(12).fill(0));
  const [monthlyExpenses, setMonthlyExpenses] = useState(Array(12).fill(0));
  const [latestExpenses, setLatestExpenses] = useState([]);
  const [upcomingExpenses, setUpcomingExpenses] = useState([]);
  // Fetch user data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
          const token = JSON.parse(tokenData).value;
          const response = await axios.get(
            "https://partialbackendforweb.onrender.com/pages/userHome",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // Set the user data, latest expenses, and upcoming expenses
          setUserData(response.data);
          // Sort expenses by start date in descending order
          const expenses = response.data.expenses;
          expenses.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
          // Filter expenses based on current date
          const currentDate = new Date();
          const latestExpensesData = expenses.filter(expense => new Date(expense.startDate) < currentDate);
          const upcomingExpensesData = expenses.filter(expense => new Date(expense.startDate) >= currentDate);
          // Set the latest and upcoming expenses
          setLatestExpenses(latestExpensesData);
          setUpcomingExpenses(upcomingExpensesData);


            const incomes = response.data.income;
            // Calculate monthly income and expenses
            const monthlyIncomes = Array(12).fill(0);
            incomes.forEach((income) => {
              const month = new Date(income.date).getMonth();
              monthlyIncomes[month] += income.amount;
            });
            // Calculate monthly expenses
            const monthlyExpenses = Array(12).fill(0);
            expenses.forEach((expense) => {
              const month = new Date(expense.startDate).getMonth();
              monthlyExpenses[month] += expense.amount;
            });
            // Set the monthly income and expenses
            setMonthlyIncomes(monthlyIncomes);
            setMonthlyExpenses(monthlyExpenses);        } else {
          console.error("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    // Main container with background color styling
    <div className="dark:bg-gray-700">
      <Helmet>
        <title>Document</title>
      </Helmet>

      <UserNavigation />
      {/* <!-- Main section with margin-top and flex alignment --> */}
      <h2 className="my-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
        Expenses Tracking
      </h2>
      {/* <!-- Add Expense Button --> */}
      <div className="flex flex-col justify-between">
        <div className="flex justify-center">
          <div className="container ml-2 md:mr-10 md:justify-start">
            <Link
              to="/expensesAddition"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 md:ml-20 py-2 px-2 rounded-md"
            >
              Add Expense
            </Link>
          </div>
        </div>
        {/* <!-- Bar chart code for income and expenses --> */}
        <div className="flex flex-col md:flex-row justify-center mx-4">
          <div className="container text-center p-6 my-2 shadow-lg rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900 dark:text-white max-w-[900px] max-h-[800px] mr-4">
            <div className="container flex dark:text-white">
              <BarChart monthlyIncomes={monthlyIncomes} monthlyExpenses={monthlyExpenses} />
            </div>
          </div>
          {/* <!-- Doughnut chart code for expenses categorization --> */}
          <div className="dark:text-white container flex flex-col text-center p-6 my-2 shadow-lg rounded-lg overflow-hidden max-h-full bg-gray-200 dark:bg-gray-900 max-w-[500px] max-h-[500px]">
            <Link to="" className="py-3 px-5 bg-gray-100 text-xl dark:text-white dark:bg-gray-700 font-bold text-center">
              Expenses Categorization
            </Link>
            <DonutChart expenses={userData?.expenses} useCurrentMonth={false} />
          </div>
        </div>
        {/* <!--End of Doughnut chart--> */}
        <div className="flex flex-col justify-center items-center mx-4">
          <ExpensesTable expenses={latestExpenses} isLatest={true} tableName="Latest Expenses" />
          <ExpensesTable expenses={upcomingExpenses} isLatest={false} tableName="Upcoming Expenses" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Expenses1;
