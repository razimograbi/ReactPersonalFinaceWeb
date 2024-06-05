import React from 'react';

const PaymentInput = ({ numberOfPayment, handleNumberOfPayment }) => {
  return (
    
      <div>
        <label
          htmlFor="number-of-payments"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Number of payments
        </label>
        <input
          type="number"
          id="number-of-payments"
          value={numberOfPayment}
          onChange={handleNumberOfPayment}
          className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
  );
};

export default PaymentInput;
