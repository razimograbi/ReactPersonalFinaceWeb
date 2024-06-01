import React, { useEffect, useState } from "react";
import { calculateRemainingBudget } from "../../utils/util";

/**
 * Budget component to display the remaining budget for the current month.
 *
 * @param {Object} props - The properties object.
 * @param {Object[]} props.budgetArray - The array of budget objects.
 * @param {number} props.totalExpensesForMonth - The total expenses for the current month.
 * @returns {JSX.Element} A div element displaying the remaining budget.
 */
const Budget = ({ budgetArray, totalExpensesForMonth }) => {
  const [remainingBudgetForMonth, setRemainingBudgetForMonth] = useState(0);

  useEffect(() => {
    /**
     * Fetches the remaining budget for the current month and year.
     */
    const fetchRemainingBudget = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      // Calculate the remaining budget for the current month and year
      const remainingBudget = await calculateRemainingBudget(
        currentMonth,
        currentYear
      );
      // Update the state with the calculated remaining budget
      setRemainingBudgetForMonth(remainingBudget);
    };

    // Call the fetchRemainingBudget function
    fetchRemainingBudget();
  }, [budgetArray, totalExpensesForMonth]);

  return (
    <div>
      {/* Display the remaining budget for the current month */}
      <div
        id="budgetCnt"
        className="text-blue-500 dark:text-blue-700 mt-2"
      >{`$${remainingBudgetForMonth}`}</div>
    </div>
  );
};


export default Budget;
