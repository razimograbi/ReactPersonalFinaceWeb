import React from 'react';


// ContactInfo Component : This component is used to display the contact information.
const ContactInfo = () => {
    return (
        // Contact Information
        <li className="flex">
            {/* Contact Icon */}
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
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                </svg>
                {/* Contact Details */}
            </div>
            <div className="ml-4">
                {/* Contact Information */}
                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    Contact
                </h3>
                <p className="text-gray-600 dark:text-slate-400">
                    Mobile: +972 (53) 720-5189
                </p>
                <p className="text-gray-600 dark:text-slate-400">
                    Mail: tailnext@gmail.com
                </p>
            </div>
        </li>
    );
}

export default ContactInfo;
