import React from 'react';


// WorkingHoursBlock Component : This component is used to display the working hours of the company.
const WorkingHoursBlock = () => {
    return (
        <li className="flex">
        {/* <!-- Icon --> */}
        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
            <path d="M12 7v5l3 3"></path>
          </svg>
        </div>
        {/* <!-- Working hours --> */}
        <div className="ml-4 mb-4">
          {/* <!-- Working hours --> */}
          <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Working hours
          </h3>
          {/* <!-- Working hours details --> */}
          <p className="text-gray-600 dark:text-slate-400">
            Monday - Friday: 08:00 - 17:00
          </p>
          {/* <!-- Working hours details --> */}
          <p className="text-gray-600 dark:text-slate-400">
            Saturday &amp; Sunday: 08:00 - 12:00
          </p>
        </div>
      </li>
    );
};


export default WorkingHoursBlock