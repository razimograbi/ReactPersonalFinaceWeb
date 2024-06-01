import React, { useEffect, useState } from "react";

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

    // Return a div displaying the total income for the current month
  return (
    <div
      id="incomeCnt"
      className="text-lime-700 dark:text-green-500 mt-2"
    >{`$${currentMonthIncome}`}</div>
  );
};

export default Income;
