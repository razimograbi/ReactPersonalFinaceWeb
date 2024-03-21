
// // Fake data for financial goals
// const goals = [
//   { name: "Buy a BMW", goalAmount: 50000, amountSaved: 25000 },
//   { name: "Vacation in Hawaii", goalAmount: 100000, amountSaved: 2000 },
//   // Add more goals as needed
// ];

// // Function to generate HTML for a financial goal
// const goalRow = (goal) => {
//   const percentage = (goal.amountSaved / goal.goalAmount) * 100;
//   const remaining = goal.goalAmount - goal.amountSaved;
//   const dasharray = `${percentage} 100`;

//   return `
//     <div class="max-w-sm rounded overflow-hidden shadow-lg">
//     <div class="bg-blue-700 dark:bg-gray-900 text-white p-4 mb-4 flex items-center">
//       <div class="flex-grow">
//           <h2 class="text-xl font-bold">${goal.name}</h2>
//           <p>Goal Amount: $${goal.goalAmount}</p>
//           <p>Amount Saved: $${goal.amountSaved}</p>
//           <p>Remaining: $${remaining}</p>
//       </div>
//       <div class="relative w-20 h-20">
//           <svg viewBox="0 0 36 36" class="circular-chart">
//               <path class="circle-bg" fill="white" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
//               <path class="circle" fill="white" stroke-dasharray="${
//                 (goal.amountSaved / goal.goalAmount) * 100
//               }, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" stroke="black"/>
//               <text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-size="0.4rem" fill="black">${(
//                 (goal.amountSaved / goal.goalAmount) *
//                 100
//               ).toFixed(2)}%</text>
//           </svg>
//       </div>
//     </div>
//   </div>
  
  

//     `;
// };

// // Function to create the goals section
// const createGoalsSection = () => {
//   const goalsContainer = document.getElementById("goalsContainer");
//   goals.forEach((goal) => {
//     goalsContainer.insertAdjacentHTML("beforeend", goalRow(goal));
//   });
// };
