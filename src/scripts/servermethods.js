
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

/*
    How to use login In the project

*/

const loginData = {
  email: "hello@gmail.com",
  password: "1234567",
};
axios
  .post("https://partialbackendforweb.onrender.com/login")
  .then((response) => {
    console.log("Login Success:", response.data);
    const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000); // Current time + 1 hour
    localStorage.setItem(
      "token",
      JSON.stringify({ value: token, expires: expirationDate })
    );
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  });

/*

  UserHome , How to get all the data for the user (expenses, budget, email, goals, income)

*/

let token = getToken();

if (!token) {
  // redirect user to login screen
  return;
}

axios
  .get("https://partialbackendforweb.onrender.com/pages/userHome", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    // Handle successful response
    console.log("Response received:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error occurred:", error);
  });

/*

How to use Expenses

*/

/*
    1.  get all user data (expenses, budget, email, goals, income)

*/

token = getToken();

if (!token) {
  // redirect user to login screen
  return;
}
axios
  .get("https://partialbackendforweb.onrender.com/pages/api/expenses", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    // Handle successful response
    console.log("Response received:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error occurred:", error);
  });

/*
  2. add an expense to the user
*/

// Sample data
// ... (223 lines left)
// Collapse
// message.txt
// 7 KB
// ﻿
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

/*
    How to use login In the project

*/

const loginData = {
  email: "hello@gmail.com",
  password: "1234567",
};
axios
  .post("https://partialbackendforweb.onrender.com/login")
  .then((response) => {
    console.log("Login Success:", response.data);
    const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000); // Current time + 1 hour
    localStorage.setItem(
      "token",
      JSON.stringify({ value: token, expires: expirationDate })
    );
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  });

/*

  UserHome , How to get all the data for the user (expenses, budget, email, goals, income)

*/

let token = getToken();

if (!token) {
  // redirect user to login screen
  return;
}

axios
  .get("https://partialbackendforweb.onrender.com/pages/userHome", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    // Handle successful response
    console.log("Response received:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error occurred:", error);
  });

/*

How to use Expenses

*/

/*
    1.  get all user data (expenses, budget, email, goals, income)

*/

token = getToken();

if (!token) {
  // redirect user to login screen
  return;
}
axios
  .get("https://partialbackendforweb.onrender.com/pages/api/expenses", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    // Handle successful response
    console.log("Response received:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error occurred:", error);
  });

/*
  2. add an expense to the user
*/

// Sample data
const expenseData = {
  category: "Food",
  amount: 50,
  numberOfPayments: 1,
  startDate: "2024-03-02",
};

// POST request
axios
  .post(
    "https://partialbackendforweb.onrender.com/pages/api/expenses/add",
    expenseData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((response) => {
    // Handle success
    console.log("Expense added successfully:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error adding expense:", error);
  });

/*
  3. retrieve expenses based on year and month
*/

// Sample query parameters
const month = 3;
const year = 2024;

// GET request
axios
  .get(
    "https://partialbackendforweb.onrender.com/pages/api/expenses/retrieve",
    {
      params: {
        month: month,
        year: year,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((response) => {
    // Handle success
    console.log("Data retrieved successfully:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error retrieving data:", error);
  });

/*
  4. get the upcoming expensis for the month

*/

axios
  .get(
    "https://partialbackendforweb.onrender.com/pages/api/expenses/upcoming-expenses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((response) => {
    // Handle success
    console.log("Data retrieved successfully:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error retrieving data:", error);
  });

/*
    How to add a new User (Register)
    You dont have to use token.
    direct user to login page after success
*/

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "password123",
};

// POST request
axios
  .post("https://partialbackendforweb.onrender.com/register", userData)
  .then((response) => {
    // Handle success
    console.log("User registered successfully:", response.data);
    /// must redirect user to login page
  })
  .catch((error) => {
    // Handle error
    console.error("Error registering user:", error);
  });

/*
  Budget

*/

/*
  1. Get All the budgets for the user
*/

token = getToken();

axios
  .get("https://partialbackendforweb.onrender.com/pages/api/budget", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    // Handle success
    console.log("Budget data retrieved successfully:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error retrieving budget data:", error);
  });

/*
  2. add a budget for a specific category and month and year

*/

token = getToken();

const budgetData = {
  category: "Food",
  date: "2024-03-02",
  limit: 500,
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
  })
  .catch((error) => {
    // Handle error
    console.error("Error adding budget data:", error);
  });

/*
    4. Edit a specific budget by its _id
  */

token = getToken();
const editData = {
  budgetId: "65dcccdeab098c292ec7c910", // Replace with the actual budget ID
  newBudget: 1000, // Replace with the new budget value
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
  })
  .catch((error) => {
    // Handle error
    console.error("Error editing budget data:", error);
  });

/*

  Goals in the project

*/

/*
  Retrieve all goals for the user
*/

token = getToken();

// GET request
axios
  .get("https://partialbackendforweb.onrender.com/pages/api/goals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    // Handle success
    console.log("Goals data retrieved successfully:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error retrieving goals data:", error);
  });



  /*Adds a certain amount of money to the saved money in goal*/ 
const token = getToken();
const additionData = {
  goalId: "", // Replace with the actual goal ID
  addedAmount: 0, // Replace with new addition value
};


// PUT request
axios
  .put(
    "https://partialbackendforweb.onrender.com/pages/api/goals/addAmountToGoal",
    additionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then((response) => {
    // Handle success
    console.log("goal savedAmount updated successfully:", response.data);
  })
  .catch((error) => {
    // Handle error
    console.error("Error updating amountSaved data:", error);
  });