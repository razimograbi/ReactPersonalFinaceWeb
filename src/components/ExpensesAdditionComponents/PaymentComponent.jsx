import React from 'react';


/**
 * Component: PaymentInput
 * Description: Component used to input and handle the number of payments.
 * 
 * @param {number} numberOfPayment - The number of payments being input
 * @param {function} handleNumberOfPayment - Function to handle changes in the number of payments input
 */
const PaymentInput = ({ numberOfPayment, handleNumberOfPayment }) => {
  return (
    // Number of Payments Input
      <div>
        {/* Number of Payments Label */}
        <label
          htmlFor="number-of-payments"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Number of payments
        </label>
        {/* Number of Payments Input */}
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
