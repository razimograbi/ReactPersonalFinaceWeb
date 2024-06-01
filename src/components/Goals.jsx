import React from "react";

const Goals = ({ goals }) => {
  if (!goals) {
    return <p>No goals available.</p>;
  }

  return (
    <div>
      {goals.map((goal) => (
        <div key={goal._id} className="shadow p-2 dark:text-white">
          <p>{goal.name}</p>
          <p>Goal: ${goal.amount}</p>
          <p>Saved: ${goal.amountSaved}</p>
          <div className="w-full bg-gray-50 rounded-full dark:bg-gray-700 shadow">
            <div
              className="bg-lime-500 text-xs font-medium text-gray-50 text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${Math.min(
                  Math.floor((goal.amountSaved / goal.amount) * 100),
                  100
                )}%`,
              }}
            >
              {Math.floor((goal.amountSaved / goal.amount) * 100)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Goals;
