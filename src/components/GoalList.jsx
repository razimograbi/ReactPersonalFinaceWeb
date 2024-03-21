import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GoalList = () => {
  const [goalsData, setGoalsData] = useState([]);

  useEffect(() => {
    const fetchGoalsData = async () => {
      try {
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
          const token = JSON.parse(tokenData).value;
          const response = await axios.get(
            "https://partialbackendforweb.onrender.com/pages/userHome",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setGoalsData(response.data.goals);
        } else {
          console.error("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchGoalsData();
  }, []);

  return (
    <div
      id="goalsContainer"
      className="container flex flex-col p-2 my-2 mx-auto overflow-hidden "
    >
      {goalsData.length !== 0 && (
        <>
          {goalsData.map((goal) => (
            <div
              key={goal.id}
              className="shadow p-2 m-2 dark:bg-gray-900 rounded-md"
            >
              <div className="text-xl font-bold">{goal.name}</div>
              <p>
                Goal amount: ${goal.amount}
                <br />
                Amount saved: ${goal.amountSaved}
              </p>
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-50 shadow">
                <div
                  className="bg-lime-500 text-xs text-gray-50 text-center font-bold p-0.5 leading-none rounded-full"
                  style={{
                    width: `${(goal.amountSaved / goal.amount) * 100}%`,
                  }}
                >
                  {(goal.amountSaved / goal.amount) * 100}%
                </div>
              </div>
            </div>
          ))}
          <Link
            to="/addGoal"
            className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Goal
          </Link>
        </>
      )}
    </div>
  );
};

export default GoalList;
