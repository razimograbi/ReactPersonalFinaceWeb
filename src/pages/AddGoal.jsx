import UserNavigation from "../components/UserNavigation";
import Footer from "../components/Footer";
import { default as DolarSign } from "../assets/images/dollar-sign-svgrepo-com.svg";
import { Helmet } from "react-helmet";
import { useState, } from "react";
import Modal from '../components/Modal'; // Import the Modal component
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGoal = () => {
 // State variables for managing goal name, amount of money, and modal visibility
 const [choosenName, setNameOfGoal] = useState(null); // Goal name
 const [amountOfMoney, setAmountOfMoney] = useState(null); // Amount of money
 const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

 // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

    // Function to handle changes in the amount of money input field
  const handleAmountOfMoney = (e) => {
   
    setAmountOfMoney(e.target.value);
   
  };

    // Function to handle changes in the goal name input field
  const handleNameOfGoal = (e) => {
    setNameOfGoal(e.target.value);
  };

    // Function to handle modal visibility
  const handleModal = (e) => {
    e.preventDefault();
    
    setIsModalOpen((prev) => !prev);
  };

    // Function to retrieve token from localStorage
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

    // Function to handle form submission
  const handleSubmit = () => {
    const goalData = {
      name: choosenName,
      amount: parseInt(amountOfMoney),
      
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
        setIsModalOpen((prev) => !prev);
      
        navigate("/goals1");
        
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
 
      <Modal 
        isOpen={isModalOpen} 
        handleModal={handleModal} 
        content={
          <>
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
          </>
        }
        handleSubmit={handleSubmit}
        positiveLabel="Yes"
        negativeLabel="No"
      />
     
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
