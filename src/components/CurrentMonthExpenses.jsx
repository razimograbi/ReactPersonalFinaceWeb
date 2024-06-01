import React, { useEffect, useState } from "react";

const Expenses = ({ userData }) => {
  const [totalExpensesForMonth, setTotalExpensesForMonth] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const expenses = userData.expenses.filter((expense) => {
      const expenseDate = new Date(expense.startDate);
      return (
        expenseDate.getMonth() + 1 === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const total = expenses.reduce((total, expense) => {
      const expenseAmount = parseFloat(expense.amount);
      return total + expenseAmount;
    }, 0);

    setTotalExpensesForMonth(total);
  }, [userData]);

  return <div id="expansesCnt">{`$${totalExpensesForMonth}`}</div>;
};

export default Expenses;
