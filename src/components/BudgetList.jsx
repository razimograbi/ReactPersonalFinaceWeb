import  { useState,useEffect } from 'react';
import PropTypes from "prop-types";
import Modal from '../components/Modal'; // Import the Modal component
import axios from "axios";

function BudgetList({  currentlySelectedMonth, currentlySelectedYear }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetId, setBudgetId] = useState('');
  const [amountSpent, setAmountSpent] = useState('');

  const [budgetLimit, setBudgetLimit] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  
 
  const [budgetArray, setBudgetArray] = useState([]);
   // Fetch budget data based on the selected month and year
   useEffect(() => {
  
    fetchData(); // Call fetchData initially
  
    // Call fetchData whenever either currentlySelectedMonth or currentlySelectedYear changes
  }, [currentlySelectedMonth, currentlySelectedYear]);
    
  const fetchData = async () => {
    const token = getToken();
    try {
      const response = await axios.get("https://partialbackendforweb.onrender.com/pages/api/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      displayBudgets(response.data);
    } catch (error) {
      console.error("Error retrieving budget data:", error);
    }
  };

    async function displayBudgets(response) {
    if (!currentlySelectedMonth || !currentlySelectedYear) {
      return;
    }

    const expenseArray = await getExpensesBasedOnMonthAndYear(); // Assuming this function returns expense data

    setBudgetArray(() =>
      calculateSpentPercentages(
        response,
        expenseArray,
        currentlySelectedMonth,
        currentlySelectedYear
      )
    );
  }

  async function getExpensesBasedOnMonthAndYear() {
    const token = getToken();
    try {
      const response = await axios.get(
        "https://partialbackendforweb.onrender.com/pages/api/expenses/retrieve",
        {
          params: {
            month: currentlySelectedMonth,
            year: currentlySelectedYear,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Once the data is fetched, return the expenses array
      return response.data.expenses; // This waits for the axios request to complete
    } catch (error) {
      console.error("Error retrieving data:", error);
      return []; // Return an empty array in case of an error
    }
  }

  function calculateSpentPercentages(budgetsArray, expensesArray, month, year) {
    // Format the month and year to match the budgetDate format ("YY-MM")
    const formattedMonth = month.padStart(2, "0"); // Ensure month is two digits
    const monthYear = year + "-" + formattedMonth; // Format to "YY-MM"
    const relevantBudgets = budgetsArray.filter(
      (budget) => budget.budgetDate === monthYear
    );
    const expensesSumByCategory = expensesArray.reduce((acc, expense) => {
      acc[expense.category.toLowerCase()] =
        (acc[expense.category.toLowerCase()] || 0) + expense.amount;
      return acc;
    }, {});

    return relevantBudgets.map((budget) => {
      const spent = expensesSumByCategory[budget.category.toLowerCase()] || 0;
      const spentPercentage = (spent / budget.limit) * 100;
      return {
        ...budget,
        spent,
        spentPercentage: spentPercentage.toFixed(2) + "%", // Format percentage with 2 decimal places
      };
    });
  }

    



  const [refreshKey, setRefreshKey] = useState(0); 
  useEffect(() => {
    fetchData();
    // This effect will be triggered when refreshKey changes
    // You can perform any actions here that need to be executed when the component is refreshed
  }, [refreshKey]);

  // Function to refresh the component
  const refreshComponent = () => {
    setRefreshKey(prevKey => prevKey + 1); // Increment the refreshKey state variable
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
  


  // Function to filter out categories not already in the budget array
  const getAvailableCategories = () => {
    const categories = ["Shopping",
    "Food",
    "Transportation",
    "Loan",
    "Groceries",
    "Bills",
    "Entertainment", // Added Entertainment category
    "Other",];
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
          refreshComponent();
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
            <p className="mb-2 font-bold text-lg text-center dark:text-white">Budget for {categoryName} category<br></br> {currentlySelectedMonth < 10 ? `0${currentlySelectedMonth}` : currentlySelectedMonth} / {currentlySelectedYear}</p>
             <div className="flex  flex-col items-center ">
                <div className="dark:text-white">
                Budget Limit <br></br> 
                <input className="border rounded-md p-2 dark:text-black"
                type="number"
                value={budgetLimit}
                onChange={handlenewBudgetLimitChange}
                placeholder="Enter new budget amount"
              />
              </div>
              <p className="mt-4 dark:text-white">You have spent ${amountSpent} on this category so far.</p>

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
            <p className="mb-2 font-bold text-lg text-center dark:text-white">Track Another Category</p>
            <p className="mb-2 text-lg text-center dark:text-white">{currentlySelectedMonth < 10 ? `0${currentlySelectedMonth}` : currentlySelectedMonth} / {currentlySelectedYear}</p>
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
                <div className="w-full  mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`rounded-full text-center p-0.5  leading-none dark:text-white ${
                        percentageSpent <= 100 ? 'bg-green-600' : 'bg-red-600'
                      }`}
                      style={{
                        width: percentageSpent <= 100 ? `${percentageSpent}%` : '100%',
                      }}>
                
                    ${budget.spent}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
              
              <button className="rounded-md border px-2 dark:text-white" onClick={() => {setCategoryName(budget.category), setAmountSpent(budget.spent); setBudgetLimit(budget.limit);setBudgetId(budget._id); setIsModalOpen(true);}}>Edit</button>
              
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
