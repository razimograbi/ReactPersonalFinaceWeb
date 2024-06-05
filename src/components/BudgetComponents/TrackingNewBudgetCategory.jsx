import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../GeneralComponents/Modal"; // Import the Modal component
import axios from "axios";
import {
  getToken,
  getExpensesBasedOnMonthAndYear,
  calculateSpentPercentages,
  retrieveBudgetFromServer,
} from "../../utils/util";

// Define the TrackingNewBudgetCategory component
function TrackingNewBudgetCategory({ currentlySelectedMonth, currentlySelectedYear, budgetArray ,refreshComponent}) {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetLimit, setBudgetLimit] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    //fetchData();
  }, [refreshKey, currentlySelectedMonth, currentlySelectedYear]);

  /* const fetchData = async () => {
    displayBudgets(await retrieveBudgetFromServer());
  }; */

  // Function to handle tracking another budget
  const handleAddBudget = () => {
    const token = getToken();
    const formattedMonth = currentlySelectedMonth.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const formattedDate = `${currentlySelectedYear}-${formattedMonth}-01`;

    const budgetData = {
      category: selectedCategory,
      date: formattedDate,
      limit: parseInt(budgetLimit),
    };

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

  const handleRefresh = () => {
    refreshComponent();
  }
  /* const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  }; */

  // Function to filter out categories not already in the budget array
  const getAvailableCategories = () => {
    const categories = [
      "Shopping",
      "Food",
      "Transportation",
      "Loan",
      "Groceries",
      "Bills",
      "Entertainment", // Added Entertainment category
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
