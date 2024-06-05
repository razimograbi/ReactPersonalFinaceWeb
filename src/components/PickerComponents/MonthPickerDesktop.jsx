import React from 'react';


// DesktopMonthPicker Component : This component is used to select the month in desktop view
const DesktopMonthPicker = ({ selectedMonth, onMonthSelect }) => {
  // Months Array
  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" }
  ];

  return (
    // Month Picker Buttons
    <div className="flex flex-wrap justify-center my-8">
      {months.map(month => (
        // Month Button
        <button
          key={month.id}
          onClick={() => onMonthSelect(month.id.toString())}
          className={`month-btn dark:bg-gray-900 dark:text-white p-4 text-center cursor-pointer transition duration-300 
                      hover:bg-blue-500 dark:hover:bg-gray-500 ${selectedMonth === month.id.toString() ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          {month.name}
        </button>
      ))}
    </div>
  );
};

export default DesktopMonthPicker;
