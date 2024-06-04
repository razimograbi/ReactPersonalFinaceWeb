import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import UserNavigation from "../components/GeneralComponents/UserNavigation";
import Footer from "../components/GeneralComponents/Footer";
import { default as Expense } from "../assets/images/Expenses.png";
import { default as IncomeIcon } from "../assets/images/incomeIcon.png";
import { default as moneyBagBlue } from "../assets/images/money-bag-blue.png";
import Modal from "../components/GeneralComponents/Modal";
import Goals from "../components/GoalsComponents/Goals";
import Income from "../components/UserHomeComponents/Income";
import LatestExpenses from "../components/ExpensesComponents/LatestExpenses";
import Expenses from "../components/ExpensesComponents/Expenses";
import Budget from "../components/BudgetComponents/Budget";

import DonutChart from "../components/UserHomeComponents/DonutChart";
import EditIncomeForm from "../components/UserHomeComponents/EditIncomeForm";
import { getToken } from "../utils/util";
import ExpensesTable from "../components/ExpensesComponents/ExpensesTable";

const UserHome = () => {
  // const chartDoughnutRef = useRef(null);
  const [totalExpensesForMonth, setTotalExpensesForMonth] = useState(0);
  const [userData, setUserData] = useState(null);
  const [editIncomeAmount, setEditIncomeAmount] = useState("");
  const [isEditIncomeModalOpen, setIsEditIncomeModalOpen] = useState(false);
  const [editIncomeMonth, setEditIncomeMonth] = useState("");
  const [editIncomeYear, setEditIncomeYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const currentYear = new Date().getFullYear();
  const [filteredExpenses,setFilteredExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = getToken();
    if (tokenData) {
      const token = tokenData;
      axios
        .get("https://partialbackendforweb.onrender.com/pages/userHome", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const responseData = response.data;
          setUserData(responseData);
          updateLocalStorage(responseData);
          updateUI(responseData);
          
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const currentDay = currentDate.getDate();

          // Filter expenses to only include those from the current month
          const expenses = response.data.expenses;
          const filtered = expenses.filter((expense) => {
            const expenseDate = new Date(expense.startDate);
            const expenseMonth = expenseDate.getMonth();
            return expenseMonth === currentMonth && currentDay >= expenseDate.getDate();
          });
          setFilteredExpenses(filtered);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const updateLocalStorage = (userData) => {
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userEmail", userData.email);
  };

  const updateUI = (userData) => {
    document.getElementById("userNameHam").textContent = userData.name;
    document.getElementById("userEmailHam").textContent = userData.email;
    document.getElementById(
      "welcomeMsgUser"
    ).textContent = `Welcome ${userData.name},`;
  };

  /* // Function to handle opening the edit income modal
  const handleEditIncomeModalOpen = () => {
    setIsEditIncomeModalOpen(true);
    setEditIncomeMonth(""); // Reset editIncomeMonth state
    setEditIncomeAmount(""); // Reset editIncomeAmount state
  };

  // Function to handle closing the edit income modal
  const handleEditIncomeModalClose = () => {
    setIsEditIncomeModalOpen(false);
  };

  const handleEditIncomeSubmit = () => {
    // Validate the year
    const year = parseInt(editIncomeYear);
    if (year < 1990 || year > currentYear) {
      setErrorMessage("Please enter a year between 1990 and " + currentYear);
      return;
    }
    if (!editIncomeAmount) {
      setErrorMessage("Amount field is required");
      return;
    }
    setErrorMessage("");

    // Make the POST request to update the income
    const token = getToken();

    const data = {
      amount: parseInt(editIncomeAmount),
      month: editIncomeMonth,
      year: editIncomeYear,
    };

    // Make the POST request to update the income
    axios
      .post("https://partialbackendforweb.onrender.com/income/add2", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Income added successfully:", response.data);
        // Close the modal after successful submission
        setIsEditIncomeModalOpen(false);
      })
      .catch((error) => {
        console.error("Error occurred while adding income:", error);
      });
  }; */

  //const currentYear = new Date().getFullYear();

  return (
    <div>
      {/* <Modal
        isOpen={isEditIncomeModalOpen}
        handleModal={handleEditIncomeModalClose}
        content={
          <EditIncomeForm
            editIncomeMonth={editIncomeMonth}
            setEditIncomeMonth={setEditIncomeMonth}
            editIncomeYear={editIncomeYear}
            setEditIncomeYear={setEditIncomeYear}
            editIncomeAmount={editIncomeAmount}
            setEditIncomeAmount={setEditIncomeAmount}
            errorMessage={errorMessage}
          />
        }
        handleSubmit={handleEditIncomeSubmit}
        positiveLabel="Save"
        negativeLabel="Cancel"
      /> */}

      <div className="dark:bg-gray-700">
        <Helmet>
          <title>Home Screen</title>
        </Helmet>
        <UserNavigation />
        <p
          id="welcomeMsgUser"
          className=" flex-initial text-2xl font-bold text-center dark:text-white mt-4"
        ></p>

        <section id="hero">
          {/* Income, spendings section */}
          <div className="container flex-initial flex flex-col items-center px-4 mx-auto mt-8 mb-6 space-x-2 space-y-0 md:space-y-0 text-lg py-2">
            <p
              id="budgetSentence"
              className="dark:text-white mb-2 font-bold"
            ></p>
            <div className="flex flex-col gap-2 sm:flex-row">
            <Income userData={userData} />
              {/* <div className="items-center relative flex-initial w-40 md:w-60 md:h-32 flex flex-col text-center shadow p-2 block-inline mx-auto overflow-hidden dark:bg-gray-900 dark:text-white dark:text-xl bg-gray-100 font-bold">
                <div className="flex flex-row items-center mt-4">
                  <img
                    className="w-8 block-inline"
                    src={IncomeIcon}
                    alt="Income Icon"
                  />
                  <p className="mt-4 ml-2">Income</p>
                </div>
                <Income userData={userData} />
                <button
                  onClick={handleEditIncomeModalOpen}
                  className="float-left text-sm text-blue-500"
                >
                  Edit income
                </button>
              </div> */}
              <div className="items-center relative flex flex-initial w-40 md:w-60 md:h-32 flex-col text-center shadow p-2 mx-auto dark:bg-gray-900 dark:text-white dark:text-xl font-bold bg-gray-100">
                <div className="flex flex-row items-center mt-4">
                  <img
                    className="w-8 block-inline"
                    src={Expense}
                    alt="Expense Icon"
                  />
                  <p className="mt-4 ml-2">Expenses</p>
                </div>
                <Expenses
                  userData={userData}
                  setTotalExpensesForMonth={setTotalExpensesForMonth}
                />
              </div>
              <div className="relative flex flex-col flex-initial w-40 md:w-60 md:h-32 text-center shadow p-2 mx-auto bg-gray-100 dark:bg-gray-900 dark:text-white dark:text-xl font-bold">
                <div className="flex flex-row items-center mt-4">
                  <img
                    className="w-8 ml-6 mt-4 block-inline"
                    src={moneyBagBlue}
                    alt="Money Bag Icon"
                  />
                  <p className="mt-4 ml-1">Budget remain</p>
                </div>
                <Budget
                  budgetArray={userData?.budget}
                  totalExpensesForMonth={totalExpensesForMonth}
                />
              </div>
            </div>
          </div>

          {/* Features panel */}
          <div className="container flex flex-col gap-7 items-center mx-auto">
            {/* Expenses and goals */}
            <div className="container flex flex-col justify-center items-center md:flex-row md:space-x-2 sd:space-x-0 mx-auto px-2">
              {/* Expenses */}
              <div className="container flex flex-col text-center p-12 my-2 shadow-lg rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900 max-w-[500px] max-h-[500px]">
                <p className="py-3 px-5 bg-gray-100 dark:text-white dark:bg-gray-700 font-bold text-center">
                  Current month expenses
                </p>
                <DonutChart expenses={userData?.expenses} />
              </div>

              {/* Goals */}
              <div
                id="GoalsContainer"
                className="container flex flex-col p-6 my-2 mx-auto shadow-lg rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900 max-w-[500px] max-h-[500px] overflow-y-auto"
              >
                <Link
                  to="#"
                  className="py-3 px-5 bg-gray-100 dark:bg-gray-700 dark:text-white font-bold text-center"
                >
                  Goals Tracking
                </Link>
                <Goals goals={userData?.goals} />
              </div>
            </div>

            {/* Upcoming bills and transactions */}
            <div className="container flex flex-col space-x-2 mx-4 px-2">
              <div className="container flex flex-col p-2 my-2 mx-auto shadow-lg rounded-lg overflow-hidden dark:bg-gray-900 dark:border-solid dark:border-white max-w-[1200px] bg-gray-200">    
                <ExpensesTable expenses={filteredExpenses} isLatest={true} tableName={"Latest Expenses"}/>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default UserHome;
