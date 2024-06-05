import React from 'react';


/**
 * Component: DatePicker
 * Description: Component used for selecting a date.
 * 
 * @param {string} selectedDate - The currently selected date
 * @param {function} handleDateChange - Function to handle changes when a new date is selected
 */
const DatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    // Date Picker
    <div className="mb-5">
      {/* Date Picker Label */}
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Start Date
      </label>
      {/* Date Picker Input */}
      <input
        type="date"
        id="start-date"
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
  );
};

export default DatePicker;
