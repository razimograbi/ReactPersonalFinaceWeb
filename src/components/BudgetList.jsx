import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Modal from '../components/Modal'; // Import the Modal component

function BudgetList({ budgetArray, currentlySelectedMonth, currentlySelectedYear }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [amountSpent, setAmountSpent] = useState('');
  const [newAmountSpent, setNewAmountSpent] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [newBudgetLimit, setnewBudgetLimit] = useState('');

  
  
  const handlenewBudgetLimitChange = (e) => {
    const inputAmount = e.target.value;
    // Allow only positive numbers greater than zero
    if (/^\d*\.?\d+$/.test(inputAmount) && parseFloat(inputAmount) >= 0) {
      setBudgetLimit(inputAmount);
    }
  };
  const handleSpentAmountChange = (e) => {
    // Allow only positive numbers greater than or equal to zero
    const inputAmount = e.target.value;
    if (/^\d*\.?\d+$/.test(inputAmount) && parseFloat(inputAmount) >= 0) {
      // Add your logic to update the spent amount in the state or perform any other actions
      setAmountSpent(inputAmount);
    }
  };

  const handleBudgetChange = async (newBudgetLimit, category, month, year) => {
    if (parseFloat(amountSpent) > parseFloat(budgetLimit)) {
      handleBudgetChange(budgetLimit, categoryName, currentlySelectedMonth, currentlySelectedYear);
      return;
    }
    // Add your logic here to update the budget in the database
    // Example: Axios request to update budget
    console.log('Updating budget:',budgetLimit, category, month, year);

    // After updating the budget, you can perform any necessary actions
    setIsModalOpen(false); // Close the modal
    setnewBudgetLimit(''); // Clear input field
  };
 

  const handleModalClose = () => {
    setnewBudgetLimit('');
    setIsModalOpen(false);
  };
    
  console.log(budgetArray);
  return (
    <div>

      <Modal
        isOpen={isModalOpen}
        handleModal={handleModalClose}
        content={
          <>
            <p class="mb-2 font-bold text-lg">Budget for {categoryName} Category {currentlySelectedMonth < 10 ? `0${currentlySelectedMonth}` : currentlySelectedMonth} / {currentlySelectedYear}</p>
             <div class="flex  flex-col items-center ">
              <div>
              Budget Limit <br></br> 
              <input class="border rounded-md"
              type="number"
              value={budgetLimit}
              onChange={handlenewBudgetLimitChange}
              placeholder="Enter new budget amount"
            />
            </div>
            <div>
            <p class="mt-2">Amount Spent</p> 
            <input class="border rounded-md"
              type="number"
              value={amountSpent}
              onChange={handleSpentAmountChange}
              placeholder="Enter spent amount"
            />
            </div>
            </div>
            {/* Conditional message */}
            {amountSpent > budgetLimit && (
            <p className="text-red-500 mt-2">Spent amount cannot exceed budget limit</p>
            )}
          </>
        }
        handleSubmit={() => handleBudgetChange(newBudgetLimit, categoryName, currentlySelectedMonth, currentlySelectedYear)}
        positiveLabel="Change"
        negativeLabel="Discard"
      >
      </Modal>

    <ul id="budgetList"
      className="budgets-list max-w-xl divide-gray-200 dark:divide-gray-900">
      
    
      {budgetArray?.map((budget) => {
        const percentageSpent = (budget.spent / budget.limit) * 100;
        return (
          <li key={budget.category}>
            <div className="flex gap-5 p-2 my-2">
              <div className="flex flex-col gap-1 w-96">
                <div className="flex justify-between gap-2">
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
              
              <button className="rounded-md border px-2" onClick={() => { setAmountSpent(budget.spent); setBudgetLimit(budget.limit);setCategoryName(budget.category); setIsModalOpen(true);}}>Edit Budget</button>
              
                
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
