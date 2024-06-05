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

// Define the BudgetList component
function BudgetList({ currentlySelectedMonth, currentlySelectedYear }) {
  // State variables declaration

  const [isModalOpen, setIsModalOpen] = useState(false); // Boolean state to manage the visibility of the edit modal
  const [budgetId, setBudgetId] = useState(""); // State to hold the ID of the budget being edited
  const [amountSpent, setAmountSpent] = useState(""); // State to hold the amount spent for the selected budget
  const [budgetLimit, setBudgetLimit] = useState(""); // State to hold the new budget limit being set
  const [categoryName, setCategoryName] = useState(""); // State to hold the name of the category being edited
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false); // Boolean state to manage the visibility of the add budget modal
  const [selectedCategory, setSelectedCategory] = useState(""); // State to hold the selected category for adding a new budget
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
    // You can perform any actions here that need to be executed when the component is refreshed
  }, [refreshKey]);

  // Function to refresh the component
  const refreshComponent = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the refreshKey state variable
  };

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

  // Function to handle tracking another budget
  const handleAddBudget = () => {
    const token = getToken();

    // Format the month with leading zeros if necessary
    const formattedMonth = currentlySelectedMonth.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });

    // Combine year and month in the desired format
    const formattedDate = `${currentlySelectedYear}-${formattedMonth}-01`;
    console.log(formattedDate);
    console.log(selectedCategory);
    console.log(budgetLimit);

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
        //window.location.reload();
        refreshComponent();
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding budget data:", error);
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

  const handleBudgetEdit = () => {
    const token = getToken();
    const editData = {
      budgetId: budgetId, // Replace with the actual budget ID
      newBudget: parseInt(budgetLimit), // Replace with the new budget value
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
        setBudgetLimit(""); // Clear input field
        refreshComponent();
      })
      .catch((error) => {
        // Handle error
        console.error("Error editing budget data:", error);
      });
  };

  const handleModalClose = () => {
    setBudgetLimit("");
    setIsModalOpen(false);
  };

  // console.log(budgetArray);
  return (
    <div>
      <div>
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

        <Modal
          isOpen={isTrackModalOpen}
          handleModal={() => {
            setBudgetLimit("");
            setIsTrackModalOpen(false);
          }}
          content={
            <>
              {/* Modal content for tracking another category */}
              <p className="mb-2 font-bold text-lg text-center dark:text-white">
                Track Another Category
              </p>
              <p className="mb-2 text-lg text-center dark:text-white">
                {currentlySelectedMonth < 10
                  ? `0${currentlySelectedMonth}`
                  : currentlySelectedMonth}{" "}
                / {currentlySelectedYear}
              </p>
              {/* Form fields for tracking another category */}
              <div className="flex flex-col items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded-md p-2 mb-4"
                >
                  <option value="">Select Category</option>
                  {getAvailableCategories().map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
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
        <ul
          id="budgetList"
          className="budgets-list max-w-xl divide-gray-200 dark:divide-gray-900"
        >
          {/* Display the list of budgets */}
          {budgetArray?.map((budget) => {
            const percentageSpent = (budget.spent / budget.limit) * 100;
            return (
              <li
                className="hover:shadow-lg transform hover:scale-105 transition-all duration-300 "
                key={budget.category}
              >
                <div className="flex gap-5 p-2 items-center justify-center">
                  <div className="flex flex-col gap-1 w-96 ">
                    <div className="flex justify-between items-center ">
                      <h5 className="dark:text-white">{budget.category}</h5>
                      <p className="dark:text-white">${budget.limit}</p>
                    </div>
                    <div className="w-full  mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                      <div
                        className={`rounded-full text-center p-0.5  leading-none dark:text-white ${
                          percentageSpent <= 100 ? "bg-green-600" : "bg-red-600"
                        }`}
                        style={{
                          width:
                            percentageSpent <= 100
                              ? `${percentageSpent}%`
                              : "100%",
                        }}
                      >
                        ${budget.spent}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="rounded-md border px-2 dark:text-white"
                      onClick={() => {
                        setCategoryName(budget.category),
                          setAmountSpent(budget.spent);
                        setBudgetLimit(budget.limit);
                        setBudgetId(budget._id);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Button to track another category */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsTrackModalOpen(true)}
          className="bg-blue-500 m-4 rounded-md text-white p-2 items-center"
        >
          Track another category
        </button>
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
