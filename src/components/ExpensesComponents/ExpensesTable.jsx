import React from "react";
import { Link } from "react-router-dom";

/**
 * Component: ExpensesTable
 * Description: Component used to display an expenses table.
 * 
 * @param {array} expenses - Array of expenses data to display in the table
 * @param {bool} isLatest - Indicates whether the table shows the latest expenses
 * @param {string} tableName - Name or title of the expenses table
 */
const ExpensesTable = ({ expenses, isLatest, tableName }) => {
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.startDate);
    const today = new Date();
    return isLatest ? (expenseDate < today) : (expenseDate >= today);
  });

  return (
    // Expenses Table JSX
    <div className="container flex flex-col p-2 my-2 mx-auto shadow-lg rounded-lg overflow-hidden dark:bg-gray-900 dark:border-solid dark:border-white max-w-[1200px] bg-gray-200">
      <Link to="#">
        {/* Table Name */}
        <div className="table-name text-center font-bold my-2">
          {tableName}
        </div>
      </Link>
      <div className="max-h-[400px] overflow-y-auto">
      <table className="min-w-full text-left text-sm font-light dark:text-gray-400">
        {/* Table Header */}
        <thead className="border-b bg-white font-medium dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4">Date</th>
            <th scope="col" className="px-6 py-4">Category</th>
            <th scope="col" className="px-6 py-4">Amount</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {filteredExpenses.map((expense, index) => (
            // Table Row
            <tr key={index} className="border-b bg-white dark:bg-gray-900 dark:border-gray-700">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{new Date(expense.startDate).toLocaleDateString()}</td>
              <td className="whitespace-nowrap px-6 py-4 dark:text-white">{expense.category}</td>
              <td className="whitespace-nowrap px-6 py-4 dark:text-white">${expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ExpensesTable;
