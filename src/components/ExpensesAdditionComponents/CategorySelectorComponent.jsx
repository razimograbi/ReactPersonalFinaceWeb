import React, { useState } from 'react';

const CategorySelector = ({ choosenCategory, handleChooseCategory, dropdownLinks }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        id="categoryButton"
        onClick={handleDropdown}
        className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {choosenCategory}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdown"
        className={`${isDropdownOpen ? "" : "hidden"} z-10 transition delay-150 mb-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul className="py-2 text-sm text-black dark:text-gray-200">
          {dropdownLinks.map((link, index) => (
            <li key={index}>
              <p
                onClick={() => {
                  handleChooseCategory(link);
                  handleDropdown(); // Close dropdown after selection
                }}
                className="dropdown-link cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {link}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySelector;
