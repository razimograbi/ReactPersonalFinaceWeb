import React from 'react';
import CategorySelector from './CategorySelectorComponent';
import MoneyInput from './MoneyInputComponent';
import DatePicker from './DatePickerComponent';
import PaymentInput from './PaymentComponent';
import SubmitButton from './SubmitButtonComponent';


/**
 * Component: ExpenseForm
 * Description: Component used for displaying a form to add expenses.
 * 
 * @param {string} choosenCategory - The currently chosen expense category
 * @param {function} handleChooseCategory - Function to handle the selection of an expense category
 * @param {array} dropdownLinks - Array of expense category options for the dropdown menu
 * @param {string} amountOfMoney - The amount of money for the expense
 * @param {function} handleAmountOfMoney - Function to handle changes in the amount of money input
 * @param {string} selectedDate - The selected date for the expense
 * @param {function} handleDateChange - Function to handle changes in the selected date
 * @param {number} numberOfPayment - The number of times the expense needs to be paid
 * @param {function} handleNumberOfPayment - Function to handle changes in the number of payments
 * @param {function} handleModal - Function to handle the expense form modal
 * @param {bool} isQuestionOpen - State variable to manage the visibility of a question modal
 * @param {function} setIsQuestionOpen - Function to set the visibility state of the question modal
 */
const ExpenseForm = ({
  choosenCategory,
  handleChooseCategory,
  dropdownLinks,
  amountOfMoney,
  handleAmountOfMoney,
  selectedDate,
  handleDateChange,
  numberOfPayment,
  handleNumberOfPayment,
  handleModal,
  isQuestionOpen,
  setIsQuestionOpen
}) => {
  return (
    // Expense Form Component JSX 
    <form
      className="max-w-sm mx-auto p-12 border rounded-md shadow"
      onSubmit={handleModal}
    >
      {/* Choose Category Label */}
      <label
        htmlFor="categoryButton"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Choose Category
      </label>
      {/* Category Selector Component */}
      <CategorySelector
        choosenCategory={choosenCategory}
        handleChooseCategory={handleChooseCategory}
        dropdownLinks={dropdownLinks}
      />
      {/* Money Input Component */}
      <MoneyInput
        amountOfMoney={amountOfMoney}
        handleAmountOfMoney={handleAmountOfMoney}
      />
      {/* Date Picker Component */}
      <DatePicker
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      {/* Payment Input Component */}
      <div className="relative flex gap-3 justify-center items-end mb-5">
        <PaymentInput
          numberOfPayment={numberOfPayment}
          handleNumberOfPayment={handleNumberOfPayment}
        />
        {/* Question Mark Icon */}
        <span
          id="questionMark"
          onMouseOver={() => setIsQuestionOpen(true)}
          onMouseOut={() => setIsQuestionOpen(false)}
          className="bg-gray-800 text-white px-2 dark:bg-blue-600 dark:text-white py-1 rounded text-xs inline-block mb-2"
        >
          ?
        </span>
        {/* Info Message */}
        <div
          id="infoMessage"
          className={`${isQuestionOpen ? "" : "hidden"} w-20 bg-zinc-700 rounded-lg text-neutral-50 text-center text-sm p-1 left-full absolute`}
        >
          The number of monthly payments.
        </div>
      </div>
      {/* Submit Button Component */}
      <SubmitButton
        buttonText="Add Expense"
        onClick={handleModal} // Adjust if needed based on your modal logic
      />
    </form>
  );
};

export default ExpenseForm;
