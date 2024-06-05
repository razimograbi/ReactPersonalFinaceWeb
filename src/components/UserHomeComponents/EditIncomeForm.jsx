import React from "react";

/**
 * EditIncomeForm component to render a form for editing income details.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.editIncomeMonth - The current month selected for editing income.
 * @param {function} props.setEditIncomeMonth - Function to set the month for editing income.
 * @param {string} props.editIncomeYear - The current year selected for editing income.
 * @param {function} props.setEditIncomeYear - Function to set the year for editing income.
 * @param {number} props.editIncomeAmount - The current amount set for editing income.
 * @param {function} props.setEditIncomeAmount - Function to set the amount for editing income.
 * @param {string} props.errorMessage - The error message to be displayed if there's an error.
 * @returns {JSX.Element} A form for editing income details.
 */

// Define the EditIncomeForm component
const EditIncomeForm = ({
  editIncomeMonth,
  setEditIncomeMonth,
  editIncomeYear,
  setEditIncomeYear,
  editIncomeAmount,
  setEditIncomeAmount,
  errorMessage,
}) => {
  return (
    // JSX for the EditIncomeForm component
    <>
      <p className="text-lg text-center font-bold dark:text-white">
        Edit Income
      </p>

      {/* Month selector*/}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Month
        </label>
        <select
          className="mt-1 block w-full dark:text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={editIncomeMonth}
          onChange={(e) => setEditIncomeMonth(e.target.value)}
        >
          {/* Month options */}
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      {/* Year and amount input */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Year
        </label>
        <div className="flex items-center">
          <input
            type="number"
            className="mt-1 block w-1/2 px-3 py-2 dark:text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={editIncomeYear}
            onChange={(e) => setEditIncomeYear(e.target.value)}
          />
        </div>

        {/* Amount input */}
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Amount
        </label>
        <input
          type="number"
          className="mt-1 block w-full dark:text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={editIncomeAmount}
          onChange={(e) => setEditIncomeAmount(e.target.value)}
          required
        />
      </div>
      {/* Error message display */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default EditIncomeForm;
