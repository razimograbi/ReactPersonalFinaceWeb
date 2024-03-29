import React, { useState,useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Modal from '../components/Modal'; // Import the Modal component
import axios from "axios";
import UserNavigation from "../components/UserNavigation";

function BudgetList({ budgetArray, currentlySelectedMonth, currentlySelectedYear }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetId, setBudgetId] = useState('');
  const [amountSpent, setAmountSpent] = useState('');

  const [budgetLimit, setBudgetLimit] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
 

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
  


  // Function to filter out categories not already in the budget array
  const getAvailableCategories = () => {
    const categories = ['Food', 'Groceries', 'Shopping', 'Transportation', 'Loans', 'Other', 'Bills', 'Entertainment'];
    return categories.filter(category => !budgetArray.find(budget => budget.category === category));
  };

  // Function to handle tracking another budget
  const handleAddBudget = () => {
    const token = getToken();
 

    // Format the month with leading zeros if necessary
    const formattedMonth = currentlySelectedMonth.toLocaleString('en-US', { minimumIntegerDigits: 2 });

    // Combine year and month in the desired format
    const formattedDate = `${currentlySelectedYear}-${formattedMonth}-01`;
    console.log(formattedDate)
    console.log(selectedCategory)
    console.log(budgetLimit)
   
    const budgetData = {
      category: selectedCategory,
      date: formattedDate,
      limit: parseInt(budgetLimit),
    };

    // POST request
    axios
      .post(
        "https://partialbackendforweb.onrender.com/pages/api/budget/add",
        budgetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("Budget data added successfully:", response.data);
        window.location.reload();
        
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding budget data:", error);
        refreshComponent();
      });
    setIsTrackModalOpen(false);
  };

  const handlenewBudgetLimitChange = (e) => {
    const inputAmount = e.target.value;
    // Allow only positive numbers greater than zero
    if (/^\d*\.?\d+$/.test(inputAmount) && parseFloat(inputAmount) >= 0) {
      setBudgetLimit(inputAmount);
    }
  };
 
  
  const handleBudgetEdit =  () => {
    
      const token = getToken();
      const editData = {
        budgetId: budgetId, // Replace with the actual budget ID
        newBudget:parseInt(budgetLimit), // Replace with the new budget value
      };

      // PUT request
      axios
        .put(
          "https://partialbackendforweb.onrender.com/pages/api/budget/edit",
          editData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Handle success
          console.log("Budget data edited successfully:", response.data);
           // After updating the budget, you can perform any necessary actions
          setIsModalOpen(false); // Close the modal
          setBudgetLimit(''); // Clear input field
        })
        .catch((error) => {
          // Handle error
          console.error("Error editing budget data:", error);
        });


   
  };
 

  const handleModalClose = () => {
    setBudgetLimit('');
    setIsModalOpen(false);
  };
    
  console.log(budgetArray);
  return (
    <div>
    <div>

      <Modal
        isOpen={isModalOpen}
        handleModal={handleModalClose}
        content={
          <>
            <p className="mb-2 font-bold text-lg text-center">Budget for {categoryName} category, {currentlySelectedMonth < 10 ? `0${currentlySelectedMonth}` : currentlySelectedMonth} / {currentlySelectedYear}</p>
             <div className="flex  flex-col items-center ">
                <div>
                Budget Limit <br></br> 
                <input className="border rounded-md p-2"
                type="number"
                value={budgetLimit}
                onChange={handlenewBudgetLimitChange}
                placeholder="Enter new budget amount"
              />
              </div>
              <p className="mt-4">You have spent ${amountSpent} on this category so far.</p>

            </div>
          
          </>
        }
        //handleSubmit={() => handleBudgetChange(budgetLimit, currentlySelectedMonth, currentlySelectedYear)}
        handleSubmit={() => handleBudgetEdit()}
        positiveLabel="Change"
        negativeLabel="Discard"
      >
      </Modal>

      <Modal
        isOpen={isTrackModalOpen}
        handleModal={() => {setBudgetLimit('');setIsTrackModalOpen(false);}}
        content={
          <>
            <p className="mb-2 font-bold text-lg text-center">Track Another Category</p>
            <p className="mb-2 text-lg text-center">{currentlySelectedMonth < 10 ? `0${currentlySelectedMonth}` : currentlySelectedMonth} / {currentlySelectedYear}</p>
            <div className="flex flex-col items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md p-2 mb-4"
              >
                <option value="">Select Category</option>
                {getAvailableCategories().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="number"
                value={budgetLimit}
                onChange={handlenewBudgetLimitChange}
                placeholder="Enter new budget amount"
                className="border rounded-md p-2 mb-4"
              />
            </div>
          </>
        }
        handleSubmit={handleAddBudget}
        positiveLabel="Track"
        negativeLabel="Discard"
      />
    <ul id="budgetList"
      className="budgets-list max-w-xl divide-gray-200 dark:divide-gray-900">
      
        
      {budgetArray?.map((budget) => {
        const percentageSpent = (budget.spent / budget.limit) * 100;
        return (
          <li className ="hover:shadow-lg transform hover:scale-105 transition-all duration-300 " key={budget.category}>
            <div className="flex gap-5 p-2 items-center justify-center">
              <div className="flex flex-col gap-1 w-96 ">
                <div className="flex justify-between items-center ">
                  <h5 className="dark:text-white">{budget.category}</h5>
                  <p className="dark:text-white">${budget.limit}</p>
                </div>
                <div className="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-green-600 text-xs h-4 rounded-full text-center p-0.5 leading-none dark:bg-green-500 dark:text-white"
                    style={{ width: `${percentageSpent}%` }}
                  >
                    ${budget.spent}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
              
              <button className="rounded-md border px-2 dark:text-white" onClick={() => {setCategoryName(budget.category), setAmountSpent(budget.spent); setBudgetLimit(budget.limit);setBudgetId(budget._id); setIsModalOpen(true);}}>Edit</button>
              
                
                {/* <Link to="/budgetCategoryChanger" className="text-blue-500">
                  Edit Budget
                </Link> */}
              </div>
            </div>
          </li>
          
        );
      })}
    </ul>
    
    
    
    </div>
    <div className="flex justify-center">
    <button onClick={() => setIsTrackModalOpen(true)} className="bg-blue-500 m-4 rounded-md text-white p-2 items-center">Track another category</button>
    </div>
    </div>
  );
}

BudgetList.propTypes = {
  currentlySelectedMonth: PropTypes.string,
  currentlySelectedYear: PropTypes.string,
  calculateSpentPercentages: PropTypes.func,
  budgetArray: PropTypes.array,
  setBudgetArray: PropTypes.func,
  getExpensesBasedOnMonthAndYear: PropTypes.func,
};

export default BudgetList;
