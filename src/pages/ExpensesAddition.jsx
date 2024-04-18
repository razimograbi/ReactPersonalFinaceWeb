import UserNavigation from "../components/UserNavigation";
import Footer from "../components/Footer";
import { default as DolarSign } from "../assets/images/dollar-sign-svgrepo-com.svg";
import { Helmet } from "react-helmet";
import { useState } from "react";
import Modal from '../components/Modal'; // Import the Modal component
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * An array containing dropdown menu options for expense categories.
 * These options are displayed when selecting a category for the expense.
 */
const dropdownLinks = ["Shopping","Food","Transportation","Loan","Groceries","Bills","Entertainment", "Other"];




/**
 * Functional component for adding expenses.
 * Allows users to input details of an expense and add it to the system.
 */
const ExpensesAddition = () => {
    // State variables to manage user inputs and modal state
  const [choosenCategory, setChoosenCategory] = useState("Category");
  const [amountOfMoney, setAmountOfMoney] = useState(0);
  const [numberOfPayment, setNumberOfPayment] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();


  /**
   * Handler function to update selected date.
   * @param {Date} date - Selected date
   */
  const handleDateChange = (date) => { // Step 2: Function to handle date change
    setSelectedDate(date);
  };

  /**
   * Handler function to update amount of money input.
   * @param {Event} e - Input change event
   */
  const handleAmountOfMoney= (e) => {
    setAmountOfMoney(e.target.value);
  };

  /**
   * Handler function to update number of payments input.
   * @param {Event} e - Input change event
   */
  const handleNumberOfPayment = (e) => {
    setNumberOfPayment(e.target.value);
  };

  /**
   * Handler function to toggle the modal state.
   * If no category is chosen, the modal won't open.
   * @param {Event} e - Click event
   */
  const handleModal = (e) => {
    e.preventDefault();
    if (choosenCategory === "Category") {
      return;
    }
    setIsModalOpen((prev) => !prev);
  };

  /**
   * Handler function to toggle the dropdown menu state.
   */
  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  /**
   * Handler function to set the chosen category.
   * @param {string} value - Chosen category value
   */
  const handleChooseCategory = (value) => {
    setChoosenCategory(value);
  };

  /**
   * Function to retrieve token from localStorage.
   * @returns {string|null} - Token value or null if not found or expired
   */
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


  /**
   * Handler function to submit expense data to the server.
   * Sends a POST request to add the expense to the system.
   */
  const handleSubmit = () => {
    const expenseData = {
      category: choosenCategory,
      amount: amountOfMoney,
      numberOfPayment: numberOfPayment,
      //startDate: Date.now(),
      startDate:selectedDate,
    };
    const token = getToken();
    axios
      .post(
        "https://partialbackendforweb.onrender.com/pages/api/expenses/add",
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("Expense added successfully:", response.data);
        setIsModalOpen((prev) => !prev);
        setAmountOfMoney(null);
        setNumberOfPayment(1);
        navigate("/expenses1");
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding expense:", error);
      });
  };

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <Helmet>
        <title>Expenses Page</title>
      </Helmet>
      
      <Modal 
        isOpen={isModalOpen} 
        handleModal={handleModal} 
        content={
          <>
        <h1 className="text-center my-4 font-bold text-xl">
          Confirm Addition?
        </h1>
        <div className="bg-slate-400 shadow max-w-[400px]">
          <ul>
            <li className="flex gap-3 p-2">
              <h5 className="font-bold">Category :</h5>
              <p id="category-type-in-model" className="">
                {choosenCategory}
              </p>
            </li>
            <li className="flex gap-3 p-2">
              <h5 className="font-bold">Amount of money :</h5>
              <div className="flex gap-1">
                <span>$</span>
                <p id="amount-of-money-in-model" className="">
                  {amountOfMoney}
                </p>
              </div>
            </li>
            <li className="flex gap-3 p-2">
              <h5 className="font-bold">number of payments :</h5>
              <p id="amount-of-payments-in-model" className="">
                {numberOfPayment}
              </p>
            </li>
          </ul>
        </div>
        </>
        }
        handleSubmit={handleSubmit}
        positiveLabel="Yes"
        negativeLabel="No"
      />
      
      <UserNavigation />
      <div
        id="menu-overlay"
        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 hidden"
      ></div>

      <div className="h-max flex flex-col items-center justify-center gap-8 mt-8 mb-10 dark:bg-gray-800">
        <h2 className="my-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
          Expense Addition
        </h2>
        <form
          className="max-w-sm mx-auto p-12 border rounded-md shadow"
          onSubmit={handleModal}
        >
          <label
            htmlFor="categoryButton"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          
            Choose Category
          </label>
          <button
            id="categoryButton"
            onClick={handleDropdown}
            className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
          
            {choosenCategory}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6">
            
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"/>
              
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            id="dropdown"
            className={`${
              isDropdownOpen ? "" : "hidden"
            } z-10 transition delay-150 mb-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-black dark:text-gray-200">
              {dropdownLinks.map((link) => {
                return (
                  <li key={link}>
                    <p
                      onClick={() => handleChooseCategory(link)}
                      className="dropdown-link cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {link}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mb-5">
            <label
              id="money-label"
              htmlFor="amount-of-money"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount Spent
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <img
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  src={DolarSign}
                  alt="dollar-sign"
                />
              </div>
              <input
                type="number"
                id="amount-of-money"
                value={amountOfMoney}
                onChange={handleAmountOfMoney}
                className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label
             
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)} // Step 4: Handle date change
              className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="relative flex gap-3 justify-center items-end mb-5">
            <div>
              <label
                htmlFor="number-of-payments"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of payments
              </label>
              <input
                type="number"
                id="number-of-payments"
                value={numberOfPayment}
                onChange={handleNumberOfPayment}
                className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <span
              id="questionMark"
              onMouseOver={() => setIsQuestionOpen(true)}
              onMouseOut={() => setIsQuestionOpen(false)}
              className="bg-gray-800 text-white px-2 dark:bg-blue-600 dark:text-white py-1 rounded text-xs inline-block mb-2"
            >
              ?
            </span>
            <div
              id="infoMessage"
              className={`${
                isQuestionOpen ? "" : "hidden"
              } w-20 bg-zinc-700 rounded-lg text-neutral-50 text-center text-sm p-1 left-full absolute`}
            >
              The number of monthly payments.
            </div>
            
          </div>
          
          <button
            id="add-expense-button"
            type="submit"
            className="mt-10 ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Expense
          </button>


        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ExpensesAddition;
