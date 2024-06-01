import React, { useEffect, useState } from "react";

const Income = ({ userData }) => {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);

  useEffect(() => {
    if (!userData) return;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

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

    setCurrentMonthIncome(income);
  }, [userData]);

  return (
    <div
      id="incomeCnt"
      className="text-lime-700 dark:text-green-500 mt-2"
    >{`$${currentMonthIncome}`}</div>
  );
};

export default Income;
