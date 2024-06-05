import React from 'react';

const DatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Start Date
      </label>
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
