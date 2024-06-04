import React from 'react';


/**
 * Modal component to display a dialog box with customizable content and buttons.
 * @param {boolean} isOpen - Indicates whether the modal is open or closed.
 * @param {function} handleModal - Function to handle modal close event.
 * @param {JSX.Element} content - JSX element representing the content of the modal.
 * @param {function} handleSubmit - Function to handle submission action, associated with the positive button.
 * @param {string} positiveLabel - Label for the positive button,  indicating an affirmative action.
 * @param {string} negativeLabel - Label for the negative button, indicating a cancel or discard action.
 * @returns {JSX.Element} Modal component.
 */
const Modal = ({ isOpen, handleModal, content, handleSubmit ,positiveLabel, negativeLabel }) => {
    

  return (
    <>
      {/* Modal backdrop */}
      <div
        id="confirm-screen"
        className={`backdrop ${isOpen ? "" : "hidden"} `}
        onClick={handleModal}
      ></div>
    
      <div
        id="modal"
        className={`${
          isOpen ? "" : "hidden"
        } fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/4 bg-white dark:bg-gray-700 p-4 border-slate-950 shadow min-w-[237px] max-w-[400px] rounded-md`}
      >
        {content}
        {/* Modal buttons */}
        <div className="text-center mt-2">
          <button
            onClick={handleSubmit}
            id="yes-button"
            className=" dark:bg-gray-900 border border-green-500  text-black text-center p-2 text-base sm:text-lg font-bold rounded-md m-2 dark:text-white"
            type="button">
            {positiveLabel}
          </button>
          {/* Negative button */}
          <button
            id="no-button"
            className=" dark:bg-gray-900 border border-red-600 p-2 text-base sm:text-lg font-bold rounded-md dark:text-white"
            type="button"
            onClick={handleModal}>
            {negativeLabel}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
