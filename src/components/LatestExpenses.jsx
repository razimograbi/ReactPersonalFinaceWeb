import React from "react";

const LatestExpenses = ({ expenses }) => {
  if (!expenses) {
    return <p>No expenses available.</p>;
  }
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.startDate);
    const expenseMonth = expenseDate.getMonth();
    return expenseMonth === currentMonth && currentDay >= expenseDate.getDate();
  });

  return (
    <table className="min-w-full text-left text-sm font-light dark:text-gray-400">
      <thead className="border-b bg-white font-medium dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-4">
            Date
          </th>
          <th scope="col" className="px-6 py-4">
            Category
          </th>
          <th scope="col" className="px-6 py-4">
            Amount
          </th>
        </tr>
      </thead>
      <tbody id="latestExpensesBody">
        {filteredExpenses.map((expense) => (
          <tr
            key={expense._id}
            className="border-b bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              {new Date(expense.startDate).toLocaleDateString()}
            </td>
            <td className="whitespace-nowrap px-6 py-4 dark:text-white">
              {expense.category}
            </td>
            <td className="whitespace-nowrap px-6 py-4 dark:text-white">
              ${expense.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LatestExpenses;
