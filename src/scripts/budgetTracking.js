document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("janBtn")
    .addEventListener("click", () => selectMonth(1));
  document
    .getElementById("febBtn")
    .addEventListener("click", () => selectMonth(2));
  document
    .getElementById("marBtn")
    .addEventListener("click", () => selectMonth(3));
  document
    .getElementById("aprBtn")
    .addEventListener("click", () => selectMonth(4));
  document
    .getElementById("mayBtn")
    .addEventListener("click", () => selectMonth(5));
  document
    .getElementById("junBtn")
    .addEventListener("click", () => selectMonth(6));
  document
    .getElementById("julBtn")
    .addEventListener("click", () => selectMonth(7));
  document
    .getElementById("augBtn")
    .addEventListener("click", () => selectMonth(8));
  document
    .getElementById("sepBtn")
    .addEventListener("click", () => selectMonth(9));
  document
    .getElementById("octBtn")
    .addEventListener("click", () => selectMonth(10));
  document
    .getElementById("novBtn")
    .addEventListener("click", () => selectMonth(11));
  document
    .getElementById("decBtn")
    .addEventListener("click", () => selectMonth(12));

  // document
  // .getElementById("decBtn")
  // .addEventListener("click", () => selectMonth(12));
  // Year selector
  document.getElementById("year").addEventListener("change", function () {
    selectingYear(this.value);
  });
});

let currentlySelectedMonth = null;
let currentlySelectedYear = "2024";

let budgetsArray = [];

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

function getToken() {
  const tokenObj = JSON.parse(localStorage.getItem("token"));
  if (!tokenObj) return null;

  const currentTime = new Date().getTime();
  if (currentTime > tokenObj.expires) {
    localStorage.removeItem("token"); // Remove expired token
    return null;
  }

  return tokenObj.value; // Return the token if it hasn't expired
}

const token = getToken();

axios
  .get("https://partialbackendforweb.onrender.com/pages/api/budget", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    budgetsArray = response.data;
  })
  .catch((error) => {
    console.error("Error retrieving budget data:", error);
  });

async function getExpensesBasedOnMonthAndYear() {
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

// Function to display expenses breakdown
async function displayBudgets(budgetsArray) {
  if (!currentlySelectedMonth || !currentlySelectedYear) {
    return;
  }

  const expenseArray = await getExpensesBasedOnMonthAndYear();

  budgetsArray = calculateSpentPercentages(
    budgetsArray,
    expenseArray,
    currentlySelectedMonth,
    currentlySelectedYear
  );

  const budgetsList = document.getElementById("budgetList");
  budgetsList.innerHTML = ""; // Clear previous budgets
  budgetsArray.forEach((budget) => {
    const li = document.createElement("li");
    const percentageSpent = (budget.spent / budget.limit) * 100;
    li.innerHTML = `
      <div class="flex gap-5 p-2 my-2">
        <div>
          <img src="../Images/avatar-anisha.png" class="rounded-full w-10 h-10 mb-2 ml-2" />
        </div>
        <div class="flex flex-col gap-1 w-96">
          <div class="flex justify-between gap-2">
            <h5 class="dark:text-white">${budget.category}</h5>
            <p class="dark:text-white">$${budget.limit}</p>
          </div>
          <div class="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
            <div class="bg-green-600 text-xs h-4 rounded-full text-center p-0.5 leading-none dark:bg-green-500 dark:text-white" style="width: ${percentageSpent}%">
              $${budget.spent}
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <a href="budgetCategoryChanger.html" class="text-blue-500">Edit Budget</a>
        </div>
      </div>
    `;

    budgetsList.appendChild(li);
  });
}

// Get the select element by its ID
const selectYear = document.getElementById("year");

// Get the current year
const currentYear = new Date().getFullYear();

// Generate options for years from 1970 to current year
for (let year = currentYear; year >= 1970; year--) {
  // Create an option element
  const option = document.createElement("option");

  // Set the value and text content of the option
  option.value = year;
  option.textContent = year;

  // Append the option to the select element
  selectYear.appendChild(option);
}

selectYear.value = "2024";

//----------------------------------------------------------------------
// let selectedYear = null; // Variable to store the selected year

// Function to handle year selection
function selectingYear(year) {
  selectYear.value = year; // Store the selected year
  currentlySelectedYear = year.toString();
}

// Function to handle month selection
function selectMonth(month) {
  if (currentlySelectedYear) {
    // Log the selected year and month to the console
    console.log("Selected Year:", currentlySelectedYear);
    console.log("Selected Month:", month);
    currentlySelectedMonth = month.toString();
    displayBudgets(budgetsArray);
  } else {
    // Prompt the user to select a year first
    console.log("Please select a year first");
  }
}

document.getElementById("month").addEventListener("change", (e) => {
  const monthValue = e.target.value;
  selectMonth(monthValue);
});

//----------------------------------------------------------------------

// Event listener for month picker change
// document.getElementById("monthPicker").addEventListener("change", function () {
//   const selectedMonth = this.value;
//   const fakeData = {
//     "2024-02": {
//       // February 2024
//       budget: 2000,
//       expenses: 500,
//       categories: {
//         food: 100,
//         learning: 300,
//         car: 100,
//       },
//     },
//     // Add more months as needed
//   };

//   if (fakeData[selectedMonth]) {
//     const { budget, expenses, categories } = fakeData[selectedMonth];
//     const remainingBudget = budget - expenses;
//     const budgetUsagePercentage = (expenses / budget) * 100;

//     document.getElementById(
//       "budgetInfo"
//     ).textContent = `In ${selectedMonth}, you have used $${expenses} out of $${budget}. Your remaining budget is $${remainingBudget}.`;
//     document.getElementById("budgetDisplay").classList.remove("hidden");

//     const budgetFill = document.getElementById("budgetFill");
//     budgetFill.style.width = `${budgetUsagePercentage}%`;
//     document.getElementById(
//       "percentage"
//     ).textContent = `${budgetUsagePercentage}%`;

//     // Display expenses breakdown
//     displayExpenses(categories);
//     document.getElementById("expensesDisplay").classList.remove("hidden");
//   } else {
//     document.getElementById("budgetInfo").textContent =
//       "No data available for the selected month.";
//     document.getElementById("budgetDisplay").classList.remove("hidden");
//     document.getElementById("expensesDisplay").classList.add("hidden");
//     budgetFill.style.width = `${0}%`;
//     document.getElementById("percentage").textContent = ``;
//   }
// });

// Function to toggle layout based on window width
// function toggleLayout() {
//   const layoutContainer = document.getElementById("layoutContainer");
//   if (window.innerWidth < 1000) {
//     // Example breakpoint for phones
//     layoutContainer.classList.remove("flex-row");
//     layoutContainer.classList.add("flex-col");
//   } else {
//     layoutContainer.classList.remove("flex-col");
//     layoutContainer.classList.add("flex-row");
//   }
// }

// Initial toggle layout
// toggleLayout();

// Toggle layout on window resize
//window.addEventListener("resize", toggleLayout);
