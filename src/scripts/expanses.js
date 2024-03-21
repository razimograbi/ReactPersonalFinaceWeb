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

        // Extract the expenses array from response.data
        const expenses = response.data.expenses;

        // Select the table body
        const latestExpensesBody = document.querySelector(
          "#latestExpensesBody"
        );

        // Clear existing rows
        latestExpensesBody.innerHTML = "";

        // Iterate through each expense and create HTML elements dynamically
        expenses.forEach((expense) => {
          // Create table row
          const expenseRow = document.createElement("tr");
          expenseRow.classList.add(
            "border-b",
            "bg-white",
            "dark:bg-gray-900",
            "dark:border-gray-700"
          );

          // Populate row with expense data
          expenseRow.innerHTML = `
                    <td class="whitespace-nowrap px-6 py-4 font-medium">${new Date(
                      expense.startDate
                    ).toLocaleDateString()}</td>
                    <td class="whitespace-nowrap px-6 py-4 dark:text-white">${expense.payee}</td>
                    <td class="whitespace-nowrap px-6 py-4 dark:text-white">${
                      expense.category
                    }</td>
                    <td class="whitespace-nowrap px-6 py-4 dark:text-white">$${
                      expense.amount
                    }</td>
                `;

          // Append row to table body
          latestExpensesBody.appendChild(expenseRow);
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
        expenses.forEach((expense) => {
          const category = expense.category;
          const amount = parseFloat(expense.amount);

          // Get the month from the expense's date
          const expenseDate = new Date(expense.startDate);
          const expenseYear = expenseDate.getFullYear();

          // Get the current month
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();

          // Check if the expense's month matches the current month
          if (
            expenseYear === currentYear &&
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

        //Update My Chart

        const incomes = response.data.income;

        // Initialize an array to hold income for each month, starting with zeros for all months
        const monthlyIncomes = Array(12).fill(0);

        // Map income amounts to respective months
        incomes.forEach((income) => {
          const month = new Date(income.date).getMonth();
          monthlyIncomes[month] += income.amount;
        });

        // Initialize an array to hold expenses for each month, starting with zeros for all months
        const monthlyExpenses = Array(12).fill(0);

        // Map income amounts to respective months
        expenses.forEach((income) => {
          const month = new Date(income.startDate).getMonth();
          monthlyExpenses[month] += income.amount;
        });

        // If there are months without income, they will remain zero

        console.log(monthlyIncomes);
        console.log(monthlyExpenses);

        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ], // Update with your months
            datasets: [
              {
                label: "Income",
                data: monthlyIncomes, // Fake data for income
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
              {
                label: "Expenses",
                data: monthlyExpenses, // Fake data for expenses
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "y", // Display bars horizontally
            plugins: {
              legend: {
                position: "right", // Position the legend to the right
              },
            },
            scales: {
              x: {
                beginAtZero: true, // Start the scale from zero
              },
            },
          },
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  } else {
    console.error("Token not found in localStorage");
  }
});
