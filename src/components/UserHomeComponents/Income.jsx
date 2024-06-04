import React, { useEffect, useState } from "react";
import Modal from "../GeneralComponents/Modal";
import EditIncomeForm from "./EditIncomeForm";
import { default as IncomeIcon } from "../../assets/images/incomeIcon.png";
import { getToken } from "../../utils/util";
import axios from "axios";



/**
 * Income component to display the total income for the current month.
 *
 * @param {Object} props - The properties object.
 * @param {Object[]} props.userData - The user data object containing income information.
 * @param {Object[]} props.userData.income - Array of income objects.
 * @param {string} props.userData.income[].date - The date of the income entry.
 * @param {number} props.userData.income[].amount - The amount of income.
 * @returns {JSX.Element} A div displaying the total income for the current month.
 */
const Income = ({ userData }) => {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [editIncomeAmount, setEditIncomeAmount] = useState("");
  const [isEditIncomeModalOpen, setIsEditIncomeModalOpen] = useState(false);
  const [editIncomeMonth, setEditIncomeMonth] = useState("");
  const [editIncomeYear, setEditIncomeYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    
    // If userData is not provided, exit the effect
    if (!userData) return;

    // Get the current date, month, and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Calculate the total income for the current month
    const income = userData.income.reduce((acc, cur) => {
      const incomeDate = new Date(cur.date);
      if (
        incomeDate.getMonth() + 1 === currentMonth &&
        incomeDate.getFullYear() === currentYear
      ) {
        return acc + cur.amount;
      } else {
        return acc;
      }
    }, 0);

    // Update the state with the calculated income
    setCurrentMonthIncome(income);
  }, [userData]);


  // Function to handle opening the edit income modal
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
  };

    // Return a div displaying the total income for the current month
  return (<div>
    <Modal
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
      />
<div className="items-center relative flex-initial w-40 md:w-60 md:h-32 flex flex-col text-center shadow p-2 block-inline mx-auto overflow-hidden dark:bg-gray-900 dark:text-white dark:text-xl bg-gray-100 font-bold">
                <div className="flex flex-row items-center mt-4">
                  <img
                    className="w-8 block-inline"
                    src={IncomeIcon}
                    alt="Income Icon"
                  />
                  <p className="mt-4 ml-2">Income</p>
                </div>
                  <div
                      id="incomeCnt"
                      className="text-lime-700 dark:text-green-500 mt-2"
                    >{`$${currentMonthIncome}`}</div>
                <button
                  onClick={handleEditIncomeModalOpen}
                  className="float-left text-sm text-blue-500"
                >
                  Edit income
                </button>
              </div>
              </div>
    
  );
};

export default Income;
