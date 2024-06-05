import React from 'react';

// ContactHeader Component : This component is used to display the contact header.
const ContactHeader = () => {
    return (
        // Contact Header
        <div className="mb-4">
            {/* Contact Header */}
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                    Contact
                </p>
                
                <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                    Get in Touch
                </h2>
                {/* Description */}
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                    In hac habitasse platea dictumst
                </p>
            </div>
        </div>
    );
};

export default ContactHeader;
