import React from 'react';


// MonthPicker Component in Phone view
const MonthPicker = ({ selectedMonth, onMonthChange }) => {
  return (
    // Month Picker
    <div className="my-5 flex justify-center">
      {/* Month Picker Label */}
      <label htmlFor="month" className="flex items-center dark:text-white">
        Month
      </label>
      {/* Month Picker Select */}
      <select
        id="month"
        value={selectedMonth}
        onChange={onMonthChange}
        className="dark:bg-gray-900 dark:text-white p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        {/* Month Options */}
        <option value="">Select Month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default MonthPicker;
