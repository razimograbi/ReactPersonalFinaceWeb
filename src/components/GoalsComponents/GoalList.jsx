import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from '../GeneralComponents/Modal'; // Import the Modal component
import { getToken } from "../../utils/util";


// Define the GoalList component
const GoalList = () => {
    // State variables declaration
    const [goalsData, setGoalsData] = useState([]); // State to hold the array of goals data fetched from the server
    const [selectedGoalForDeletion, setSelectedGoalForDeletion] = useState(null); // State to hold the selected goal for deletion
    const [selectedGoalForAddingMoney, setSelectedGoalForAddingMoney] = useState(null); // State to hold the selected goal for adding money
    const [addMoneyAmount, setAddMoneyAmount] = useState(""); // State to hold the amount of money to add
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Boolean state to manage the visibility of the delete modal
    const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false); // Boolean state to manage the visibility of the add money modal

    // Function to handle deletion of a goal
  const handleDeleteGoal = () => {
    const token = getToken();
    axios
      .delete(
        `https://partialbackendforweb.onrender.com/pages/api/goals/delete/${selectedGoalForDeletion._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("Removed Goal", response.data);
        setIsDeleteModalOpen(false);
        fetchGoalsData();
      })
      .catch((error) => {
        // Handle error
        console.error("Error Deleting Goal:", error);
      });
  };


    // Function to handle addition of money to a goal
  const handleAddMoney = () => {
    try {
      const token = getToken();
      const additionData = {
        goalId: selectedGoalForAddingMoney._id, // Replace with the actual goal ID
        addedAmount: parseInt(addMoneyAmount), // Replace with new addition value
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
          fetchGoalsData();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating amountSaved data:", error);
        });
            console.log("im in handle add money for goal name")
            console.log(selectedGoalForAddingMoney.name)
            setIsAddMoneyModalOpen(false);
            setAddMoneyAmount("");
            
          } catch (error) {
            console.error("Error adding money to goal:", error);
          }
  };

    // Function to fetch goals data
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
    
    // useEffect hook to fetch goals data on component mount
    useEffect(() => {
      fetchGoalsData();
    }, []);

      // Render the component
  return (
    <div>
      {/* Delete Goal Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        handleModal={() => setIsDeleteModalOpen(false)}
        content={<>
        <p className="text-lg font-bold dark:text-white">
          Are you sure you want to delete your goal "{selectedGoalForDeletion ? selectedGoalForDeletion.name : ''}"?
        </p>
        </>
      }
       handleSubmit={() => handleDeleteGoal(selectedGoalForDeletion)} // Pass selected goal for deletion to handleDeleteGoal
        positiveLabel="Yes"
        negativeLabel="No"
       
      />

      {/* Add Money Modal */}
      <Modal
        isOpen={isAddMoneyModalOpen}
        handleModal={() => setIsAddMoneyModalOpen(false)}
        content={<>
          <p className="text-lg font-bold dark:text-white"> You've saved ${selectedGoalForAddingMoney ? selectedGoalForAddingMoney.amountSaved : ''} for {selectedGoalForAddingMoney ? selectedGoalForAddingMoney.name : ''}. How much would you like to add?
          </p>
          <div className="flex flex-row m-2">
          <p className="text-2xl mx-2">$ </p><input className="border rounded-md p-2 dark:text-black" type="number" value={addMoneyAmount} onChange={(e) => setAddMoneyAmount(e.target.value)} />
          </div>
         </>}
        handleSubmit={handleAddMoney}
        positiveLabel="Add"
        negativeLabel="Discard"
      >
        
      </Modal>
      
      
      {/* Container for the list of goals */}
      <div
        id="goalsContainer"
        className="container flex flex-col p-2 my-2 mx-auto my-auto overflow-hidden "
      >
        <Link
              to="/addGoal"
              className="bg-blue-500 max-w-40 text-center hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-4 ml-2"
            >
              Add New Goal
            </Link>
        {goalsData.length !== 0 && (
          <>
            {/* Display the list of goals */} 
            {goalsData.map((goal) => (
              <div
                key={goal._id}
                className=" shadow p-2 m-2 dark:bg-gray-900 hover:shadow-lg transform hover:scale-102 transition-all duration-300"
              >
                {/* Goal name */}
                <div className="text-xl font-bold">{goal.name}</div>
                <div className="float-right flex sm:flex-row flex-col">
                <button className="float-right bg-green-500 px-1 mb-2 sm:px-2 sm:m-2 rounded-md text-white" onClick={() => { setSelectedGoalForAddingMoney(goal); setIsAddMoneyModalOpen(true); }}>Add Money</button>
                <button className="float-right bg-red-500  sm:px-2 sm:m-2 rounded-md text-white" onClick={() => { setSelectedGoalForDeletion(goal); setIsDeleteModalOpen(true); }}>Delete</button>
                </div>
                {/* Goal amount and amount saved */}
                <p>
                  Goal amount: ${goal.amount}
                  <br />
                  Amount saved: ${goal.amountSaved}
                </p>
                <div>
                  {/* Progress bar */}
                <div className="sm mt-4 w-full bg-gray-200 rounded-full dark:bg-gray-50 shadow">
                  <div
                    className="bg-lime-500 text-xs text-gray-700 text-center font-bold p-0.5 leading-none rounded-full"
                    style={{
                      width: `${Math.max(0, Math.min((goal.amountSaved / goal.amount) * 100, 100))}%`,
                    }}
                  >
                    {(goal.amountSaved / goal.amount) * 100}%
                  </div>
                </div>
              </div>
              </div>
            ))}
            
          </>
        )}
      </div>
    </div>
  );
};

export default GoalList;
