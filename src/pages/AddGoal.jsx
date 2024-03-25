import UserNavigation from "../components/UserNavigation";
import Footer from "../components/Footer";
import { default as DolarSign } from "../assets/images/dollar-sign-svgrepo-com.svg";
import { Helmet } from "react-helmet";
import { useState } from "react";
import axios from "axios";

const AddGoal = () => {

  const [choosenName, setNameOfGoal] = useState(null);
  const [amountOfMoney, setAmountOfMoney] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAmountOfMoney = (e) => {
    setAmountOfMoney(e.target.value);
  };

  const handleNameOfGoal = (e) => {
    setNameOfGoal(e.target.value);
  };

  const handleModal = (e) => {
    e.preventDefault();
    
    setIsModalOpen((prev) => !prev);
  };

  function getToken() {
    const tokenObj = JSON.parse(localStorage.getItem("token"));
    if (!tokenObj) return null;

    const currentTime = new Date().getTime();
    if (currentTime > tokenObj.expires) {
      localStorage.removeItem("token"); // Remove expired token
      return null;
    }

    return tokenObj.value;
  }

  const handleSubmit = () => {
    const goalData = {
      name: choosenName,
      amount: amountOfMoney,
      /*add more fields here as needed  */
    };
    const token = getToken();
      axios.post("https://partialbackendforweb.onrender.com/pages/api/goals/add",goalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Goals data retrieved successfully:");
      })
      .catch((error) => {
        console.error("Error retrieving goals data:", error);
      });
  };

  return (
    <div className="h-screen dark:bg-gray-800">
      <Helmet>
        <title>Add Goal</title>
      </Helmet>
      <div
        id="confirm-screen"
        className={`backdrop ${isModalOpen ? "" : "hidden"}`}
        onClick={handleModal}
      ></div>
      {/* <div
        id="modal"
        className={`${
          isModalOpen ? "" : "hidden"
        } mr-8 sm:ml-auto md:ml-4 lg:ml-20 sm:mr-none md:mr-none lg:mr-none fixed z-50 top-1/4 left-1/4 w-1/2 bg-white p-4 border-slate-950 shadow min-w-[237px] max-w-[400px] rounded-md`}
      > */}
      <div
        id="modal"
        className={`${
          isModalOpen ? "" : "hidden"
        } fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/4 bg-white p-4 border-slate-950 shadow min-w-[237px] max-w-[400px] rounded-md`}
      >
        <h1 className="text-center my-4 font-bold text-xl">
          Confirm Addition?
        </h1>
        <div className="bg-slate-400 shadow max-w-[400px]">
          <ul>
            <li className="flex gap-3 p-2">
              <h5 className="font-bold">Name of goal:</h5>
              <p id="goalname-in-model" className="">
                {choosenName}
              </p>
            </li>
            <li className="flex gap-3 p-2">
              <h5 className="font-bold">Amount of money :</h5>
              <div className="flex gap-1">
                <span>$</span>
                <p id="amount-of-money-in-model" className="">
                  {amountOfMoney}
                </p>
              </div>
            </li>
            
          </ul>
        </div>
        <div className="text-center mt-2">
          <button
            onClick={handleSubmit}
            id="yes-button"
            className="border border-green-500  text-black text-center p-2 text-base sm:text-lg font-bold rounded-md m-2"
            type="button">
          
            Yes
          </button>
          <button
            id="no-button"
            className=" border border-red-600 p-2 text-base sm:text-lg font-bold rounded-md"
            type="button"
            onClick={handleModal}>
          
            No
          </button>
        </div>
      </div>
     {/*  <div id="confirm-screen" className="backdrop hidden"></div>
        <div
        id="modal"
        className="hidden mr-8 sm:ml-auto md:ml-4 lg:ml-20 sm:mr-none md:mr-none lg:mr-none fixed z-50 top-1/4 left-1/4 w-2/4 bg-white p-4 border-slate-950 shadow min-w-[237px] max-w-[400px]"
        >
        <h1 className="text-center my-4 font-bold text-xl">
          Confirm Addition?
        </h1>
        <div className="bg-slate-400 shadow max-w-[400px]">
          <ul>
            <li className="flex gap-3 p-2">
              <h5 className="font-bold">Name of Goal</h5>
              <p id="amount-of-payments-in-model" className=""></p>
            </li>
            <li className="flex gap-3 p-2">
              <h5 className="font-bold">Amount of money</h5>
              <div className="flex gap-1">
                <span>$</span>
                <p id="amount-of-money-in-model" className=""></p>
              </div>
            </li>
          </ul>
        </div>
        <div className="text-center mt-2">
          <button
            id="yes-button"
            className="bg-green-500 text-black text-center p-2 text-base sm:text-lg font-bold"
            type="button"
            onClick={handleSubmit}
          >
            yes!
          </button>
          <button
            id="no-button"
            className="bg-red-600 border-red-600 p-2 text-base sm:text-lg font-bold"
            type="button"
          >
            No!
          </button>
        </div>
      </div> */}
      <UserNavigation />
      <div
        id="menu-overlay"
        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 hidden"
      ></div>
      <div className="h-max flex flex-col items-center justify-center gap-8 mt-8 mb-10 dark:bg-gray-800">
        <h2 className="my-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
          Add New Goal
        </h2>
        <form className="max-w-sm mx-auto p-12 border rounded-md shadow" onSubmit={handleModal}>
          <div className="relative flex flex-col gap-3 justify-center items-end mb-5">
            <div>
              <label
                htmlFor="number-of-payments"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name of Goal
              </label>
              <input
                type="text"
                id="name-of-goal"
                className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                required
                onChange={handleNameOfGoal}
              />
            </div>
            <div className="mb-5">
              <label
                id="money-label"
                htmlFor="amount-of-money"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                
              >
                Goal Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <img
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    src={DolarSign}
                    alt="dollar-sign"
                  />
                </div>
                <input
                  type="number"
                  id="amount-of-money"
                  className="bg-gray-50 border border-gray-300 text-gray-900 max-w-44 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleAmountOfMoney}
                  required
                />
              </div>
            </div>
          </div>
          <button
            id="add-expense-button"
            type="submit"
            className="mt-10 ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-7 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Goal
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddGoal;
