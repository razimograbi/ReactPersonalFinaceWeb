import UserNavigation from "../components/GeneralComponents/UserNavigation";
import Footer from "../components/GeneralComponents/Footer";
import { Helmet } from "react-helmet";
import { useState } from "react";
import Modal from "../components/GeneralComponents/Modal"; // Import the Modal component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpensesAdditionComponents/ExpenseFormComponent";

/**
 * An array containing dropdown menu options for expense categories.
 * These options are displayed when selecting a category for the expense.
 */
const dropdownLinks = [
  "Shopping",
  "Food",
  "Transportation",
  "Loan",
  "Groceries",
  "Bills",
  "Entertainment",
  "Other",
];

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
  const handleDateChange = (date) => {
    // Step 2: Function to handle date change
    setSelectedDate(date);
  };

  /**
   * Handler function to update amount of money input.
   * @param {Event} e - Input change event
   */
  const handleAmountOfMoney = (e) => {
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
      startDate: selectedDate,
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
    // Main container with background color styling
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
            {/* <!-- Expense details --> */}
            <div className="bg-slate-400 shadow max-w-[400px]">
              <ul>
                <li className="flex gap-3 p-2">
                  <h5 className="font-bold">Category :</h5>
                  <p id="category-type-in-model" className="">
                    {choosenCategory}
                  </p>
                </li>
                {/* <!-- Amount of money --> */}
                <li className="flex gap-3 p-2">
                  <h5 className="font-bold">Amount of money :</h5>
                  <div className="flex gap-1">
                    <span>$</span>
                    <p id="amount-of-money-in-model" className="">
                      {amountOfMoney}
                    </p>
                  </div>
                </li>
                {/* <!-- Number of payments --> */}
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
        // <!-- Confirm and cancel buttons -->
        handleSubmit={handleSubmit}
        positiveLabel="Yes"
        negativeLabel="No"
      />

      <UserNavigation />
      {/* <!-- Overlay for the menu, hidden by default--> */}
      <div
        id="menu-overlay"
        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 hidden"
      ></div>
      {/* <!-- Main container with background image and text color styling --> */}
      <div className="h-max flex flex-col items-center justify-center gap-8 mt-8 mb-10 dark:bg-gray-800">
        <h2 className="my-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
          Expense Addition
        </h2>

        <ExpenseForm
          choosenCategory={choosenCategory}
          handleChooseCategory={handleChooseCategory}
          dropdownLinks={dropdownLinks}
          amountOfMoney={amountOfMoney}
          handleAmountOfMoney={handleAmountOfMoney}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          numberOfPayment={numberOfPayment}
          handleNumberOfPayment={handleNumberOfPayment}
          handleModal={handleModal}
          isQuestionOpen={isQuestionOpen}
          setIsQuestionOpen={setIsQuestionOpen}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ExpensesAddition;
