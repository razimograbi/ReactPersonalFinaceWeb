import React from 'react';


// SubmitButton Component : This component is used to display the submit button.
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
