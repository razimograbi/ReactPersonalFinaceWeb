import React from 'react';


// AddressBlock Component : This component is used to display the address of the company.
const AddressBlock = () => {
    return (
        // Address Block
        <div className="flex">
            {/* Address Icon */}
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
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
            </svg>
        </div>
        {/* Address Details  */}
        <div className="ml-4">
            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Our Address
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
                1230 Maecenas Street Donec Road
            </p>
            <p className="text-gray-600 dark:text-slate-400">
                New York, EEUU
            </p>
        </div>
    </div>
    );
};



export default AddressBlock