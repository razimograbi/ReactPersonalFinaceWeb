import React from 'react';
import DolarSign from "../../assets/images/dollar-sign-svgrepo-com.svg"; // Make sure the path is correct


// MoneyInput Component : This component is used to display the money input field.
const MoneyInput = ({ amountOfMoney, handleAmountOfMoney }) => {
  // Money Input Field JSX
  return (
    
    <div className="mb-5">
      <label
        id="money-label"
        htmlFor="amount-of-money"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Amount Spent
      </label>
      {/* Money Input Field */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
          <img
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            src={DolarSign}
            alt="dollar-sign"
          />
        </div>
        {/* Money Input Field */}
        <input
          type="number"
          id="amount-of-money"
          value={amountOfMoney}
          onChange={handleAmountOfMoney}
          className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
    </div>
  );
};

export default MoneyInput;
