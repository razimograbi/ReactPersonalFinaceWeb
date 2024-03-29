import React from 'react';

const Modal = ({ isOpen, handleModal, content, handleSubmit ,positiveLabel, negativeLabel }) => {
    

  return (
    <>
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

        <div className="text-center mt-2">
          <button
            onClick={handleSubmit}
            id="yes-button"
            className=" dark:bg-gray-900 border border-green-500  text-black text-center p-2 text-base sm:text-lg font-bold rounded-md m-2 dark:text-white"
            type="button">
            {positiveLabel}
          </button>
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
