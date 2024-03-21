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
        // Assuming you have already fetched the response and stored it in 'response'

        // Extracting the goals array from the response
        const goalsData = response.data.goals;

        // Function to generate HTML for a financial goal
        const goalRow = (goal) => {
          const percentage = (goal.amountSaved / goal.amount) * 100;
          const remaining = goal.amount - goal.amountSaved;

          return `
        <div class="shadow p-2 m-2 dark:bg-gray-900 rounded-md">
            <div class="text-xl font-bold">${goal.name}</div>
            Goal amount: $${goal.amount}<br>Amount saved: $${goal.amountSaved}
            <div class="w-full bg-gray-200 rounded-full dark:bg-gray-50 shadow">
                <div class="bg-lime-500 text-xs font-medium text-gray-50 text-center font-bold p-0.5 leading-none rounded-full" style="width: ${percentage}%"> ${percentage}%</div>
            </div>
        </div>
    `;
        };

        // Function to create the goals section
        const createGoalsSection = () => {
          const goalsContainer = document.getElementById("goalsContainer");

          // Clear existing content in goalsContainer
          goalsContainer.innerHTML = "";

          // Iterate through each goal and append its HTML to goalsContainer
          goalsData.forEach((goal) => {
            goalsContainer.insertAdjacentHTML("beforeend", goalRow(goal));
          });

          // Add an "Add Goal" button
          goalsContainer.insertAdjacentHTML(
            "beforeend",
            `
        <a href="addGoal.html" id="addGoalButton" class="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Goal</a>
    `
          );

          // Add event listener to the "Add Goal" button
          document
            .getElementById("addGoalButton")
            .addEventListener("click", () => {
              // Implement your logic to handle the click event, such as showing a modal or navigating to a page to add a new goal
              console.log("Add Goal button clicked");
            });
        };

        // Call the function to create the goals section
        createGoalsSection();
      })
      .catch((error) => {
        // Handle error
        console.error("Error occurred:", error);
      });
  } else {
    console.error("Token not found in localStorage");
  }
});
