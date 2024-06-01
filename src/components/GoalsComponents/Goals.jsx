import React from "react";

/**
 * Goals component to display a list of goals with progress bars.
 *
 * @param {Object} props - The properties object.
 * @param {Object[]} props.goals - An array of goal objects.
 * @param {string} props.goals._id - The unique identifier of the goal.
 * @param {string} props.goals.name - The name of the goal.
 * @param {number} props.goals.amount - The total amount of the goal.
 * @param {number} props.goals.amountSaved - The amount already saved for the goal.
 * @returns {JSX.Element} A div element containing a list of goals with progress bars.
 */
const Goals = ({ goals }) => {
    // If no goals are available, display a message
  if (!goals) {
    return <p>No goals available.</p>;
  }

  return (
    <div>
      {/* Map through the goals array and render each goal */}
      {goals.map((goal) => (
        <div key={goal._id} className="shadow p-2 dark:text-white">
          {/* Display the goal name */}
          <p>{goal.name}</p>

          {/* Display the total goal amount */}
          <p>Goal: ${goal.amount}</p>

          {/* Display the amount already saved for the goal */}
          <p>Saved: ${goal.amountSaved}</p>

          {/* Progress bar indicating the percentage of goal amount saved */}
          <div className="w-full bg-gray-50 rounded-full dark:bg-gray-700 shadow">
            <div
              className="bg-lime-500 text-xs font-medium text-gray-50 text-center p-0.5 leading-none rounded-full"
              // Set the width of the progress bar based on the percentage of goal amount saved
              style={{
                width: `${Math.min(
                  Math.floor((goal.amountSaved / goal.amount) * 100),
                  100
                )}%`,
              }}
            >
              {/* Display the percentage of goal amount saved */}
              {Math.floor((goal.amountSaved / goal.amount) * 100)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Goals;
