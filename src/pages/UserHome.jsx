import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import UserNavigation from "../components/UserNavigation";
import Footer from "../components/Footer";
import { default as Expense } from "../assets/images/Expenses.png";
import { default as IncomeIcon } from "../assets/images/incomeIcon.png";
import { default as moneyBagBlue } from "../assets/images/money-bag-blue.png";
import { Chart } from "chart.js/auto";
import Modal from "../components/Modal"; // Import the Modal component

// Function to retrieve token from localStorage
function getToken() {
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

const UserHome = () => {
  const chartDoughnutRef = useRef(null);
  const [editIncomeAmount, setEditIncomeAmount] = useState(""); // State to hold the edited income amount
  const [isEditIncomeModalOpen, setIsEditIncomeModalOpen] = useState(false); // Boolean state to manage the visibility of the edit income modal
  const [editIncomeMonth, setEditIncomeMonth] = useState("");
  const [editIncomeYear, setEditIncomeYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve token from localStorage
    const tokenData = getToken();
    if (tokenData) {
      const token = tokenData;
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

          /*
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
          */

          // Calculate expenses for current month
          const currentMonthExpenses = userData.expenses.filter((expense) => {
            const expenseDate = new Date(expense.startDate);
            return (
              expenseDate.getMonth() + 1 === currentMonth &&
              expenseDate.getFullYear() === currentYear
            );
          });

          // Calculate the total amount of expenses for the current month
          const totalExpensesForMonth = currentMonthExpenses.reduce(
            (total, expense) => {
              // Access the 'amount' property of each expense object and convert it to a number
              const expenseAmount = parseFloat(expense.amount);
              return total + expenseAmount;
            },
            0
          );

          // Update Expenses
          const expensesElement = document.getElementById("expansesCnt");
          //expensesElement.textContent = `$${currentMonthExpenses}`;
          expensesElement.textContent = `$${totalExpensesForMonth}`;
          /*
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
          */
          // Get budget entries for the current month
          // Get budget entries for the current month
          const currentMonthBudgetEntries = userData.budget.filter((entry) => {
            const budgetDate = new Date(entry.budgetDate);
            return (
              budgetDate.getMonth() + 1 === currentMonth &&
              budgetDate.getFullYear() === currentYear
            );
          });

          // Calculate total budget for the current month
          const totalBudgetForMonth = currentMonthBudgetEntries.reduce(
            (total, entry) => {
              return total + entry.limit;
            },
            0
          );

          // Calculate remaining budget for this month
          const remainingBudgetForMonth =
            totalBudgetForMonth - totalExpensesForMonth;

          // Update UI to display remaining budget for this month
          const budgetElement = document.getElementById("budgetCnt");
          budgetElement.textContent = `$${remainingBudgetForMonth}`;

          var budgetSentence = document.getElementById("budgetSentence");
          budgetSentence.textContent = `You've budgeted $${totalBudgetForMonth} for this month`;

          const goalsContainer = document.querySelector(".goal-container");

          // Clear existing goals
          goalsContainer.innerHTML = "";

          // Iterate through each goal and create HTML elements dynamically
          response.data.goals.forEach((goal) => {
            const goalDiv = document.createElement("div");
            goalDiv.classList.add("shadow", "p-2", "dark:text-white");
            goalDiv.innerHTML = `
                          ${goal.name}<br>
                          Goal: $${goal.amount}<br>
                          Saved: $${goal.amountSaved}<br>
                          <div class="w-full bg-gray-50 rounded-full dark:bg-gray-700 shadow">
                              <div class="bg-lime-500 text-xs font-medium text-gray-50 text-center p-0.5 leading-none rounded-full" style="width: ${Math.min(
                                Math.floor(
                                  (goal.amountSaved / goal.amount) * 100
                                ),
                                100
                              )}%">
                               
                               ${Math.floor(
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
            const currentDay = currentDate.getDate();

            if (
              expenseMonth == currentMonth &&
              currentDay >= expenseDate.getDate()
            ) {
              const expenseRow = document.createElement("tr");
              expenseRow.classList.add(
                "border-b",
                "bg-white",
                "dark:bg-gray-900",
                "dark:border-gray-700"
              );

              // Add table data for each column
              expenseRow.innerHTML = `
                            <td class="whitespace-nowrap px-6 py-4 font-medium">${new Date(
                              expense.startDate
                            ).toLocaleDateString()}</td>
                           
                            <td class="whitespace-nowrap px-6 py-4 dark:text-white">${
                              expense.category
                            }</td>
                            <td class="whitespace-nowrap px-6 py-4 dark:text-white">$${
                              expense.amount
                            }</td>
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
            "Bills",
            "Entertainment", // Added Entertainment category
            "Other",
          ];

          // Extract expenses data from response.data
          const expensesData = response.data.expenses;
          // console.log(expensesData);

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
                  "rgb(51, 153, 255)", // Light Blue (Shopping)
                  "rgb(255, 102, 102)", // Light Red (Food)
                  "rgb(255, 204, 51)", // Light Yellow (Transportation)
                  "rgb(102, 204, 0)", // Light Green (Loan)
                  "rgb(166, 206, 227)", // Light Blue (Groceries)
                  "rgb(253, 218, 236)", // Light Pink (Bills)
                  "rgb(255, 153, 0)", // Light Orange (Entertainment)
                  "rgb(0, 153, 153)", // Light Teal (Other)
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

          if (chartDoughnutRef.current !== null) {
            chartDoughnutRef.current.destroy();
          }
          chartDoughnutRef.current = new Chart(
            document.getElementById("chartDoughnut"),
            configDoughnut
          );
        })
        .catch((error) => {
          // Handle error
          console.error("Error occurred:", error);
        });
    } else {
      navigate("/");
    }
  }, []);

  // Function to handle opening the edit income modal
  const handleEditIncomeModalOpen = () => {
    setIsEditIncomeModalOpen(true);
    setEditIncomeMonth(""); // Reset editIncomeMonth state
    setEditIncomeAmount(""); // Reset editIncomeAmount state
  };

  // Function to handle closing the edit income modal
  const handleEditIncomeModalClose = () => {
    setIsEditIncomeModalOpen(false);
  };

  const handleEditIncomeSubmit = () => {
    // Validate the year
    const year = parseInt(editIncomeYear);
    if (year < 1990 || year > currentYear) {
      setErrorMessage("Please enter a year between 1990 and " + currentYear);
      return;
    }
    if (!editIncomeAmount) {
      setErrorMessage("Amount field is required");
      return;
    }
    setErrorMessage("");

    // Make the POST request to update the income
    const token = getToken();

    const data = {
      amount: parseInt(editIncomeAmount),
      month: editIncomeMonth,
      year: editIncomeYear,
    };

    // Make the POST request to update the income
    axios
      .post("https://partialbackendforweb.onrender.com/income/add2", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Income added successfully:", response.data);
        // Close the modal after successful submission
        setIsEditIncomeModalOpen(false);
      })
      .catch((error) => {
        console.error("Error occurred while adding income:", error);
      });
  };

  // // Function to handle submitting the edited income
  // const handleEditIncomeSubmit = () => {
  //   // Validate the year
  //   const year = parseInt(editIncomeYear);
  //   if (year < 1990 || year > currentYear) {
  //     setErrorMessage("Please enter a year between 1990 and " + currentYear);
  //     return;
  //   }
  //   if (!editIncomeAmount) {
  //     setErrorMessage("Amount field is required");
  //     return;
  //   }
  //   setErrorMessage("");

  //   // Prepare data for the PUT request
  //   const token = getToken();

  //   console.log(editIncomeMonth)
  //   const monthIndex = new Date(Date.parse(editIncomeMonth + " 1, 2000")).getMonth();
  //   console.log(monthIndex)

  //   const date1 = new Date(editIncomeYear, monthIndex, 1);
  //   console.log(date1)

  //   const data = {
  //     amount: editIncomeAmount,
  //     date: date1, // Set the current date
  //   };
  //   console.log(data.date)
  //   // Make the PUT request to update the income
  //   axios
  //     .post("https://partialbackendforweb.onrender.com/income/Adanadd", data, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log("Income added successfully:", response.data);
  //       // Close the modal after successful submission
  //       setIsEditIncomeModalOpen(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error occurred while adding income:", error);
  //     });
  // };
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <Modal
        isOpen={isEditIncomeModalOpen}
        handleModal={handleEditIncomeModalClose}
        content={
          <>
            <p className="text-lg text-center font-bold dark:text-white">
              Edit Income
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Month
              </label>
              <select
                className="mt-1 block w-full dark:text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={editIncomeMonth}
                onChange={(e) => setEditIncomeMonth(e.target.value)}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Year
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="mt-1 block w-1/2 px-3 py-2 dark:text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editIncomeYear}
                  onChange={(e) => setEditIncomeYear(e.target.value)} // This line remains the same
                />
              </div>

              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Amount
              </label>
              <input
                type="number"
                className="mt-1 block w-full dark:text-black border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={editIncomeAmount}
                onChange={(e) => setEditIncomeAmount(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </>
        }
        handleSubmit={handleEditIncomeSubmit}
        positiveLabel="Save"
        negativeLabel="Cancel"
      />
      <div className="dark:bg-gray-700">
        <Helmet>
          <title>Home Screen</title>
        </Helmet>
        <UserNavigation />
        <p
          id="welcomeMsgUser"
          className=" flex-initial text-2xl font-bold text-center dark:text-white mt-4"
        ></p>

        <section className="" id="hero">
          {/* <!--Income, spendings  section--> */}
          <div className="container flex-initial  flex  flex-col items-center px-4 mx-auto mt-8 mb-6 space-x-2 space-y-0 md:space-y-0 text-lg  py-2">
            <p
              id="budgetSentence"
              className="dark:text-white mb-2 font-bold"
            ></p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className=" items-center relative flex-initial w-40 md:w-60 md:h-32 flex flex-col text-center shadow p-2  block-inline  mx-auto overflow-hidden  dark:bg-gray-900 dark:text-white dark:text-xl bg-gray-100 font-bold">
                <div className="flex flex-row items-center mt-4">
                  <img className="w-8 block-inline" src={IncomeIcon} />
                  <p className=" mt-4 ml-2">Income</p>
                </div>
                <div
                  id="incomeCnt"
                  className="text-lime-700 dark:text-green-500 mt-2"
                ></div>
                <button
                  onClick={handleEditIncomeModalOpen}
                  className="float-left text-sm text-blue-500"
                >
                  {" "}
                  Edit income
                </button>
              </div>
              <div className=" items-center relative flex flex-initial w-40 md:w-60 md:h-32 flex-col text-center shadow p-2  mx-auto  dark:bg-gray-900 dark:text-white dark:text-xl font-bold bg-gray-100">
                <div className="flex flex-row items-center mt-4">
                  <img className="w-8 block-inline" src={Expense} />
                  <p className="mt-4 ml-2">Expenses</p>
                </div>
                <div
                  id="expansesCnt"
                  className="text-rose-600 dark:text-red-700 mt-2"
                ></div>
              </div>
              <div className=" relative flex flex-col flex-initial w-40 md:w-60 md:h-32 text-center shadow p-2  mx-auto bg-gray-100 dark:bg-gray-900 dark:text-white dark:text-xl font-bold">
                {/* <!-- <div className="text-blue-500 dark:to-blue-700">$4000</div> --> */}
                <div className="flex flex-row items-center mt-4">
                  <img
                    className="w-8 ml-6 mt-4 block-inline"
                    src={moneyBagBlue}
                  />
                  <p className="mt-4 ml-1">Budget remain</p>
                </div>
                <div
                  id="budgetCnt"
                  className="text-blue-500  dark:to-blue-700"
                ></div>
              </div>
            </div>
          </div>
          {/* <!--features panel --> */}
          <div className="container flex flex-col gap-7 items-center mx-auto ">
            {/* <!-- expenses and goals--> */}
            <div className="container flex flex-col justify-center items-center md:flex-row md:space-x-2 sd:space-x-0 mx-auto px-2">
              {/* <!--expenses--> */}

              <div className=" container flex flex-col text-center p-6 my-2 shadow-lg rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900 max-w-[500px] max-h-[500px]">
                <p
                  to="#"
                  className="py-3 px-5 bg-gray-100 dark:text-white dark:bg-gray-700 font-bold text-center"
                >
                  Current month expenses
                </p>

                <canvas
                  className="container flex p-10 dark:bg-gray-900"
                  id="chartDoughnut"
                ></canvas>
              </div>

              {/* <!--Goals--> */}

              <div
                id="GoalsContainer"
                className="container flex flex-col p-6 my-2 mx-auto shadow-lg rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900 max-w-[500px] max-h-[500px] overflow-y-auto"
              >
                <Link
                  to="#"
                  className="py-3 px-5 bg-gray-100 dark:bg-gray-700 dark:text-white font-bold text-center"
                >
                  Goals Tracking
                </Link>
                <div
                  className="goal-container"
                  style={{ height: "100%", overflowY: "auto" }}
                ></div>
              </div>
            </div>
            {/* <!-- upcoming bills and transactions--> */}
            {/* <!-- upcoming bills and transactions--> */}
            <div className="container flex flex-col space-x-2 mx-4 px-2">
              {/* <!-- Transcation activity--> */}
              <div className="container flex flex-col p-2 my-2 mx-auto shadow-lg rounded-lg overflow-hidden dark:bg-gray-900 dark:border-solid dark:border-white max-w-[1200px] bg-gray-200">
                <Link
                  to="#"
                  className="py-3 px-5 bg-gray-100 text-center dark:text-2xl font-bold dark:text-white dark:bg-gray-700"
                >
                  Latest Expenses
                </Link>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div
                    className="inline-block min-w-full py-2 sm:px-6 lg:px-8"
                    style={{ maxHeight: "500px", overflowY: "auto" }}
                  >
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light dark:text-gray-400">
                        <thead className="border-b bg-white font-medium dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              Date
                            </th>

                            <th scope="col" className="px-6 py-4">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody id="latestExpensesBody">
                          {/* <!-- Table rows for expenses will be added here dynamically --> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default UserHome;
