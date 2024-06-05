import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../GeneralComponents/Modal"; // Import the Modal component
import axios from "axios";
import {
  getToken,
} from "../../utils/util";

/**
 * Component: TrackingNewBudgetCategory
 * Description: Manages the "Track another category" button functionality for a specific month and year,
 * including adding it to the tracked list in the database.
 * 
 * @param {string} currentlySelectedMonth - The selected month for tracking a new budget category
 * @param {string} currentlySelectedYear - The selected year for tracking a new budget category
 * @param {array} budgetArray - Array of budget data fetched from the server
 * @param {function} refreshComponent - Function to refresh the parent component
 */
function TrackingNewBudgetCategory({ currentlySelectedMonth, currentlySelectedYear, budgetArray, refreshComponent }) {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false); // State to manage the visibility of the add budget modal
  const [selectedCategory, setSelectedCategory] = useState(""); // State to hold the selected category for adding a new budget
  const [budgetLimit, setBudgetLimit] = useState(""); // State to hold the budget limit for the new budget category
  const [refreshKey, setRefreshKey] = useState(0); // State for key to trigger component refresh

  
  useEffect(() => {
    
  }, [refreshKey, currentlySelectedMonth, currentlySelectedYear]);

  // Function to handle adding tracking another budget to db
  const handleAddBudget = () => {
    const token = getToken();
    const formattedMonth = currentlySelectedMonth.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const formattedDate = `${currentlySelectedYear}-${formattedMonth}-01`;

    //preparing data to send to server
    const budgetData = {
      category: selectedCategory,
      date: formattedDate,
      limit: parseInt(budgetLimit),
    };

    //POST operation to add the budget category to the tracked list of categories for certain month and year
    axios.post(
      "https://partialbackendforweb.onrender.com/pages/api/budget/add",
      budgetData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("Budget data added successfully:", response.data);
      handleRefresh();
      //refreshComponent();
    })
    .catch((error) => {
      console.error("Error adding budget data:", error);
    });

    setIsTrackModalOpen(false);
  };

  const handlenewBudgetLimitChange = (e) => {
    const inputAmount = e.target.value;
    if (/^\d*\.?\d+$/.test(inputAmount) && parseFloat(inputAmount) >= 0) {
      setBudgetLimit(inputAmount);
    }
  };

  //handles refreshing parent component
  const handleRefresh = () => {
    refreshComponent();
  }

  // Function to filter out categories not already in the budget array
  const getAvailableCategories = () => {
    const categories = [
      "Shopping",
      "Food",
      "Transportation",
      "Loan",
      "Groceries",
      "Bills",
      "Entertainment", 
      "Other",
    ];
    return categories.filter(
      (category) => !budgetArray.find((budget) => budget.category === category)
    );
  };

  return (
    // Display the modal and button to track another category
    <>
      <Modal
        isOpen={isTrackModalOpen}
        handleModal={() => setIsTrackModalOpen(false)}
        content={
          <>
            <p className="mb-2 font-bold text-lg text-center dark:text-white">
              Track Another Category
            </p>
            {/* Display the category and budget limit input fields */}
            <div className="flex flex-col items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md p-2 mb-4"
              >
                <option value="">Select Category</option>
                {
                  getAvailableCategories().map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                }
              </select>
              {/* Display the budget limit input field */}
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
      {/* Button to track another category */}
      <button
          onClick={() => setIsTrackModalOpen(true)}
          className="bg-blue-500 m-4 rounded-md text-white p-2 items-center"
        >
          Track another category
        </button>
    </>
  );
}
// Prop types for TrackingNewBudgetCategory component
TrackingNewBudgetCategory.propTypes = {
  currentlySelectedMonth: PropTypes.string,
  currentlySelectedYear: PropTypes.string,
  calculateSpentPercentages: PropTypes.func,
  budgetArray: PropTypes.array,
  setBudgetArray: PropTypes.func,
  getExpensesBasedOnMonthAndYear: PropTypes.func,
};

export default TrackingNewBudgetCategory;
