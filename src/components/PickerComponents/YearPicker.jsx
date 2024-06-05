import React from 'react';

const YearPicker = ({ currentlySelectedYear, selectingYear, years }) => {
  return (
    <div>
      <label htmlFor="year" className="dark:text-white">
        Year
      </label>
      <select
        id="year"
        onChange={selectingYear}
        value={currentlySelectedYear}
        className="dark:bg-gray-900 dark:text-white p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearPicker;
