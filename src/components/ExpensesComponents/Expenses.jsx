import React, { useEffect, useState } from "react";

/**
 * Expenses component to calculate and display the total expenses for the current month.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.userData - The user data containing expenses.
 * @param {Object[]} props.userData.expenses - The array of expense objects.
 * @param {string} props.userData.expenses[].startDate - The start date of the expense.
 * @param {number} props.userData.expenses[].amount - The amount of the expense.
 * @returns {JSX.Element} A div element displaying the total expenses for the current month.
 */
const Expenses = ({ userData }) => {
  // State to store the total expenses for the current month
  const [totalExpensesForMonth, setTotalExpensesForMonth] = useState(0);

  useEffect(() => {
    // Ensure userData is available before proceeding
    if (!userData) return;

    // Get the current date, month, and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Filter the user's expenses to include only those from the current month and year
    const expenses = userData.expenses.filter((expense) => {
      const expenseDate = new Date(expense.startDate);
      return (
        expenseDate.getMonth() + 1 === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    // Calculate the total amount of the filtered expenses
    const total = expenses.reduce((total, expense) => {
      const expenseAmount = parseFloat(expense.amount);
      return total + expenseAmount;
    }, 0);

    // Update the state with the calculated total expenses
    setTotalExpensesForMonth(total);
  }, [userData]);

  // Render a div displaying the total expenses for the current month
  return (
    <div
      id="expansesCnt"
      className="text-rose-600 dark:text-red-700 mt-2"
    >{`$${totalExpensesForMonth}`}</div>
  );
};

export default Expenses;
