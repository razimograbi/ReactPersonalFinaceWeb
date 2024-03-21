document.addEventListener("DOMContentLoaded", function () {
  // Retrieve token from localStorage
  const tokenData = localStorage.getItem("token");
  if (tokenData) {
    const token = JSON.parse(tokenData).value;
    // Make GET request with token
    axios
      .get("https://partialbackendforweb.onrender.com/pages/userHome", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Handle successful response
        console.log("Response received:", response.data);

        const userData = response.data;
        const userName = userData.name;
        const userEmail = response.data.email;
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);
        // Save username and name in local storage

        // Update the username
        const userNameHam = document.getElementById("userNameHam");
        userNameHam.textContent = userName;

        // Update the user email
        const userEmailHam = document.getElementById("userEmailHam");
        userEmailHam.textContent = userEmail;
        // Update the welcome message
        const welcomeMsgUser = document.getElementById("welcomeMsgUser");
        welcomeMsgUser.textContent = `Welcome ${userName},`;
        // Get current date
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const currentYear = currentDate.getFullYear();

        // Calculate income for current month
        const currentMonthIncome = userData.income.reduce((acc, cur) => {
          const incomeDate = new Date(cur.date);
          if (
            incomeDate.getMonth() + 1 === currentMonth &&
            incomeDate.getFullYear() === currentYear
          ) {
            return acc + cur.amount;
          } else {
            return acc;
          }
        }, 0);

        // Update Income
        const incomeElement = document.getElementById("incomeCnt");
        incomeElement.textContent = `$${currentMonthIncome}`;

        // Calculate expenses for current month
        const currentMonthExpenses = userData.expenses.reduce((acc, cur) => {
          const expenseDate = new Date(cur.startDate);
          if (
            expenseDate.getMonth() + 1 === currentMonth &&
            expenseDate.getFullYear() === currentYear
          ) {
            return acc + cur.amount;
          } else {
            return acc;
          }
        }, 0);

        // Update Expenses
        const expensesElement = document.getElementById("expansesCnt");
        expensesElement.textContent = `$${currentMonthExpenses}`;

        // Get budget limit for current month
        const budgetEntry = userData.budget.find((entry) => {
          const budgetDate = new Date(entry.budgetDate);
          return (
            budgetDate.getMonth() + 1 === currentMonth &&
            budgetDate.getFullYear() === currentYear
          );
        });

        const budgetLimit = budgetEntry ? budgetEntry.limit : 0;

        // Calculate budget remaining for current month
        const budgetRemain = budgetLimit - currentMonthExpenses;

        // Update Budget Remain
        const budgetRemainElement = document.getElementById("budgetCnt");
        budgetRemainElement.textContent = `$${budgetRemain}`;

        const goalsContainer = document.querySelector(".goal-container");

        // Clear existing goals
        goalsContainer.innerHTML = "";

        // Iterate through each goal and create HTML elements dynamically
        response.data.goals.forEach((goal) => {
          const goalDiv = document.createElement("div");
          goalDiv.classList.add("shadow", "p-2", "dark:text-white");
          goalDiv.innerHTML = `
                        ${goal.name}<br>
                        Goal: ${goal.amount}<br>
                        Saved: ${goal.amountSaved}<br>
                        <div class="w-full bg-gray-50 rounded-full dark:bg-gray-700 shadow">
                            <div class="bg-lime-500 text-xs font-medium text-gray-50 text-center p-0.5 leading-none rounded-full" style="width: ${Math.floor(
                              (goal.amountSaved / goal.amount) * 100
                            )}%"> ${Math.floor(
            (goal.amountSaved / goal.amount) * 100
          )}%</div>
                        </div>
                    `;
          goalsContainer.appendChild(goalDiv);
        });

        const latestExpensesBody =
          document.getElementById("latestExpensesBody");

        // Clear existing rows
        latestExpensesBody.innerHTML = "";

        // Iterate through each expense and create HTML elements dynamically
        response.data.expenses.forEach((expense) => {
          //..............................
          const expenseDate = new Date(expense.startDate);
          const expenseMonth = expenseDate.getMonth();

          // Get the current month
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();

          if (expenseMonth == currentMonth) {
            const expenseRow = document.createElement("tr");
            expenseRow.classList.add(
              "border-b",
              "bg-white",
              "dark:bg-gray-900",
              "dark:border-gray-700"
            );

            // Add table data for each column
            expenseRow.innerHTML = `
                          <td class="whitespace-nowrap px-6 py-4 font-medium">${expense.startDate}</td>
                          <td class="whitespace-nowrap px-6 py-4 dark:text-white">${expense.payee}</td>
                          <td class="whitespace-nowrap px-6 py-4 dark:text-white">${expense.category}</td>
                          <td class="whitespace-nowrap px-6 py-4 dark:text-white">$${expense.amount}</td>
                      `;

            // Append the row to the table body
            latestExpensesBody.appendChild(expenseRow);
          }
        });

        // Update Donut

        // Define the categories to display in the donut chart
        const categoriesToShow = [
          "Shopping",
          "Food",
          "Transportation",
          "Loan",
          "Groceries",
          "Other",
        ];

        // Extract expenses data from response.data
        const expensesData = response.data.expenses;
        console.log(expensesData);

        // Initialize an object to store total amounts for each category
        const expensesByCategory = {};

        // Initialize total amounts for each category to 0
        categoriesToShow.forEach((category) => {
          expensesByCategory[category] = 0;
        });

        // // Calculate total amount spent in each category
        // expensesData.forEach((expense) => {
        //   const category = expense.category;
        //   const amount = parseFloat(expense.amount);
        //   // If the category is in the categoriesToShow array, update the total amount
        //   if (categoriesToShow.includes(category)) {
        //     expensesByCategory[category] += amount;
        //   }
        // });
        expensesData.forEach((expense) => {
          const category = expense.category;
          const amount = parseFloat(expense.amount);

          // Get the month from the expense's date
          const expenseDate = new Date(expense.startDate);
          const expenseMonth = expenseDate.getMonth();

          // Get the current month
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();

          // Check if the expense's month matches the current month
          if (
            expenseMonth === currentMonth &&
            categoriesToShow.includes(category)
          ) {
            expensesByCategory[category] += amount;
          }
        });

        const dataDoughnut = {
          labels: categoriesToShow,
          datasets: [
            {
              data: categoriesToShow.map(
                (category) => expensesByCategory[category]
              ),
              backgroundColor: [
                "rgb(133, 105, 241)",
                "rgb(164, 101, 241)",
                "rgb(101, 143, 241)",
                "rgb(200, 100,241)",
                "rgb(11, 81,96)",
              ],
              hoverOffset: 4,
            },
          ],
        };

        const configDoughnut = {
          type: "doughnut",
          data: dataDoughnut,
          options: {
            plugins: {
              doughnutlabel: {
                labels: [
                  {
                    text: "Total", // Text to display
                    font: {
                      size: "20", // Font size
                    },
                    color: "#000", // Text color
                  },
                ],
              },
            },
          },
        };
        console.log(expensesByCategory);
        var chartBar = new Chart(
          document.getElementById("chartDoughnut"),
          configDoughnut
        );
      })
      .catch((error) => {
        // Handle error
        console.error("Error occurred:", error);
      });
  } else {
    console.error("Token not found in localStorage");
  }
});
