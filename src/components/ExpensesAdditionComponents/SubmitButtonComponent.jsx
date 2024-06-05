import React from 'react';

/**
 * Component: SubmitButton
 * Description: Component used to display and handle the submit button.
 * 
 * @param {string} buttonText - The text displayed on the submit button
 * @param {function} onClick - Function to be executed when the button is clicked
 * @param {string} extraClasses - Additional CSS classes to customize the button (optional)
 */
const SubmitButton = ({ buttonText, onClick, extraClasses = "" }) => {
  return (
    // Submit Button
    <button
      type="submit"
      onClick={onClick}
      className={`mt-10 ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${extraClasses}`}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;
