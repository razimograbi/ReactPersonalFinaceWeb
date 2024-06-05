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
import TrackingNewBudgetCategory from "./TrackingNewBudgetCategory";
import SingleBudget from "./SingleBudget";

/**
 * Component: BudgetList
 * Description: Displays a list of budget items for a specific month and year,
 * allowing users to edit budget limits and track new budget categories.
 * 
 * @param {string} currentlySelectedMonth - The currently selected month to display budget data for
 * @param {string} currentlySelectedYear - The currently selected year to display budget data for
 */
function BudgetList({ currentlySelectedMonth, currentlySelectedYear }) {
  // State variables declaration
  const [isModalOpen, setIsModalOpen] = useState(false); // Boolean state to manage the visibility of the edit modal
  const [budgetId, setBudgetId] = useState(""); // State to hold the ID of the budget being edited
  const [amountSpent, setAmountSpent] = useState(""); // State to hold the amount spent for the selected budget
  const [budgetLimit, setBudgetLimit] = useState(""); // State to hold the new budget limit being set
  const [categoryName, setCategoryName] = useState(""); // State to hold the name of the category being edited
  const [budgetArray, setBudgetArray] = useState([]); // State to hold the array of budget data fetched from the server
  // Fetch budget data based on the selected month and year
  useEffect(() => {
    fetchData(); // Call fetchData initially

    // Call fetchData whenever either currentlySelectedMonth or currentlySelectedYear changes
  }, [currentlySelectedMonth, currentlySelectedYear]);

  // Fetch budget data from the server
  const fetchData = async () => {
    // Fetch data using Axios
    // Handle success and error cases
    displayBudgets(await retrieveBudgetFromServer());
  };

  // Display budget data based on selected month and year
  async function displayBudgets(response) {
    if (!currentlySelectedMonth || !currentlySelectedYear) {
      return;
    }

    const expenseArray = await getExpensesBasedOnMonthAndYear(
      currentlySelectedMonth,
      currentlySelectedYear
    ); // returns expense data

    setBudgetArray(() =>
      calculateSpentPercentages(
        response,
        expenseArray,
        currentlySelectedMonth,
        currentlySelectedYear
      )
    );
  }

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchData();
    // This effect will be triggered when refreshKey changes
  }, [refreshKey]);

  // Function to refresh the component
  const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the refreshKey state variable
  };
 
 // Allow only positive numbers greater than zero
  const handlenewBudgetLimitChange = (e) => {
    const inputAmount = e.target.value;
   
    if (/^\d*\.?\d+$/.test(inputAmount) && parseFloat(inputAmount) >= 0) {
      setBudgetLimit(inputAmount);
    }
  };

  //handles the editing of a budget amount
  const handleBudgetEdit = () => {
    const token = getToken();

    //preparing data to send to server
    const editData = {
      budgetId: budgetId, //actual budget ID
      newBudget: parseInt(budgetLimit), //new budget value
    };

    // PUT request to edit the amount of an existing budget
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
        setBudgetLimit(""); // Clear input field
        refreshComponent();
      })
      .catch((error) => {
        // Handle error
        console.error("Error editing budget data:", error);
      });
  };
  
  //closes the modal of the budget editing
  const handleModalClose = () => {
    setBudgetLimit("");
    setIsModalOpen(false);
  };

  //a method thats used to set the variables taken as arguments
  const setEditingVars = (category,spent,limit,_id,bool) => {
    setCategoryName(category),
    setAmountSpent(spent);
    setBudgetLimit(limit);
    setBudgetId(_id);
    setIsModalOpen(bool);
  }
  
  return (
    // Display the list of budgets and the button to track another category
    <div>
      <div>
        {/* Modal to edit the budget */}
        <Modal
          isOpen={isModalOpen}
          handleModal={handleModalClose}
          content={
            <>
              <p className="mb-2 font-bold text-lg text-center dark:text-white">
                Budget for {categoryName} category<br></br>{" "}
                {currentlySelectedMonth < 10
                  ? `0${currentlySelectedMonth}`
                  : currentlySelectedMonth}{" "}
                / {currentlySelectedYear}
              </p>
              {/* Display the budget limit input field */}
              <div className="flex  flex-col items-center ">
                <div className="dark:text-white">
                  Budget Limit <br></br>
                  <input
                    className="border rounded-md p-2 dark:text-black"
                    type="number"
                    value={budgetLimit}
                    onChange={handlenewBudgetLimitChange}
                    placeholder="Enter new budget amount"
                  />
                </div>
                {/* Display the amount spent for the selected category */}
                <p className="mt-4 dark:text-white">
                  You have spent ${amountSpent} on this category so far.
                </p>
              </div>
            </>
          }
          //handleSubmit={() => handleBudgetChange(budgetLimit, currentlySelectedMonth, currentlySelectedYear)}
          handleSubmit={() => handleBudgetEdit()}
          positiveLabel="Change"
          negativeLabel="Discard"
        ></Modal>
        {/* Display the list of budgets */}
        <ul
          id="budgetList"
          className="budgets-list max-w-xl divide-gray-200 dark:divide-gray-900"
        >
          {/* Display the list of budgets */}
          {budgetArray?.map((budget) => {
            return ( <SingleBudget budget={budget} setEditingVars={setEditingVars}/>    
            );
          })}
        </ul>
      </div>
      {/* Button to track another category */}
      <div className="flex justify-center">
      <TrackingNewBudgetCategory currentlySelectedMonth={currentlySelectedMonth} currentlySelectedYear={currentlySelectedYear} 
      budgetArray={budgetArray} refreshComponent={refreshComponent}/>
      </div>
    </div>
  );
}
// Export the BudgetList component as the default export
BudgetList.propTypes = {
  currentlySelectedMonth: PropTypes.string,
  currentlySelectedYear: PropTypes.string,
  calculateSpentPercentages: PropTypes.func,
  budgetArray: PropTypes.array,
  setBudgetArray: PropTypes.func,
  getExpensesBasedOnMonthAndYear: PropTypes.func,
};

export default BudgetList;
