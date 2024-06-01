import axios from "axios";

// Function to retrieve token from localStorage
export function getToken() {
  const tokenObj = JSON.parse(localStorage.getItem("token"));
  if (!tokenObj) {
    return null;
  }

  const currentTime = new Date().getTime();
  if (currentTime > tokenObj.expires) {
    localStorage.removeItem("token"); // Remove expired token
    return null;
  }

  return tokenObj.value; // Return the token if it hasn't expired
}

// Calculate spent percentages for each budget category
export async function getExpensesBasedOnMonthAndYear(
  currentMonth,
  currentYear
) {
  const token = getToken();
  try {
    const response = await axios.get(
      "https://partialbackendforweb.onrender.com/pages/api/expenses/retrieve",
      {
        params: {
          month: currentMonth,
          year: currentYear,
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

// Calculate spent percentages for each budget category
export function calculateSpentPercentages(
  budgetsArray,
  expensesArray,
  month,
  year
) {
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

// retrieve all the budgets for the user from the server
export async function retrieveBudgetFromServer() {
  const token = getToken();
  try {
    const response = await axios.get(
      "https://partialbackendforweb.onrender.com/pages/api/budget",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving budget data:", error);
    return [];
  }
}

// calculates the remaining budget that the user has for a current month and year.
export async function calculateRemainingBudget(currentMonth, currentYear) {
  currentMonth = String(currentMonth);
  currentYear = String(currentYear);

  const expenseArray = await getExpensesBasedOnMonthAndYear(
    currentMonth,
    currentYear
  );
  const budgetArray = calculateSpentPercentages(
    await retrieveBudgetFromServer(),
    expenseArray,
    currentMonth,
    currentYear
  );
  const totalRemainingBudget = budgetArray.reduce((accumulator, current) => {
    return accumulator + (current.limit - current.spent);
  }, 0);

  return totalRemainingBudget;
}
