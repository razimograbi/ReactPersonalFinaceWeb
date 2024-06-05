import React from 'react';


// ContactFormBlock Component : This component is used to display the contact form.
const ContactFormBlock = () => {
    return (
      // Form for sending a message
        <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
        <h2 className="text-blue-500 bfmb-4 text-2xl font-bold">
          Ready to Get Started?
        </h2>
        {/* <!-- Form for sending a message --> */}
        <form id="contactForm">
          <div className="mb-6">
            <div className="mx-0 mb-1 sm:mb-4">
              <div className="mx-0 mb-1 sm:mb-4">
                <label
                  htmlFor="name"
                  className="pb-1 text-xs uppercase tracking-wider"
                ></label>
                {/* <!-- Name input field --> */}
                <input
                  type="text"
                  id="name"
                  autoComplete="given-name"
                  placeholder="Your name"
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                  name="name"
                />
              </div>
              {/* <!-- Email input field --> */}
              <div className="mx-0 mb-1 sm:mb-4">
                <label
                  htmlFor="email"
                  className="pb-1 text-xs uppercase tracking-wider"
                ></label>
                {/* <!-- Email input field --> */}
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                  name="email"
                />
              </div>
            </div>
            {/* <!-- Textarea for message input --> */}
            <div className="mx-0 mb-1 sm:mb-4">
              <label
                htmlFor="textarea"
                className="pb-1 text-xs uppercase tracking-wider"
              ></label>
              <textarea
                id="textarea"
                name="textarea"
                cols="30"
                rows="5"
                placeholder="Write your message..."
                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
              ></textarea>
            </div>
          </div>
          {/* <!-- Submit button --> */}
          <div className="text-center">
            {/* <!-- Button for submitting the form --> */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-black px-6 py-3 font-xl rounded-md sm:mb-0"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    );
};


export default ContactFormBlock 