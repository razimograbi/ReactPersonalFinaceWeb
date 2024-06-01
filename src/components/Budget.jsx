import React, { useEffect, useState } from "react";
import { calculateRemainingBudget } from "../utils/util";

const Budget = ({ budgetArray, totalExpensesForMonth }) => {
  const [remainingBudgetForMonth, setRemainingBudgetForMonth] = useState(0);

  useEffect(() => {
    const fetchRemainingBudget = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const remainingBudget = await calculateRemainingBudget(
        currentMonth,
        currentYear
      );

      setRemainingBudgetForMonth(remainingBudget);
    };

    fetchRemainingBudget();
  }, [budgetArray, totalExpensesForMonth]);

  return (
    <div>
      <div
        id="budgetCnt"
        className="text-blue-500 dark:text-blue-700 mt-2"
      >{`$${remainingBudgetForMonth}`}</div>
    </div>
  );
};

/*
<div id="budgetSentence">{`budgeted $${
        remainingBudgetForMonth + totalExpensesForMonth
      } for this month`}</div>

*/

export default Budget;
