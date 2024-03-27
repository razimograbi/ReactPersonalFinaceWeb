import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from '../components/Modal'; // Import the Modal component

const GoalList = () => {
  const [goalsData, setGoalsData] = useState([]);
  const [selectedGoalForDeletion, setSelectedGoalForDeletion] = useState(null);
  const [selectedGoalForAddingMoney, setSelectedGoalForAddingMoney] = useState(null);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);

  const handleDeleteGoal = async () => {
    try {
      // Call API to delete the selected goal using its ID
      // You can access the selected goal ID from selectedGoalForDeletion state
      // After successful deletion, update the goalsData state to reflect the changes
      console.log("im in handle delete for goal name")
      console.log(selectedGoalForDeletion.name)
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleAddMoney = async () => {
    try {
      // Call API to add money to the selected goal using its ID and the addMoneyAmount state
      // After successful addition, update the goalsData state to reflect the changes
      console.log("im in handle add money for goal name")
      console.log(selectedGoalForAddingMoney.name)
      setIsAddMoneyModalOpen(false);
      setAddMoneyAmount("");
    } catch (error) {
      console.error("Error adding money to goal:", error);
    }
  };

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
          console.log(response.data.goals)
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
    <div>
      
      <Modal
        isOpen={isDeleteModalOpen}
        handleModal={() => setIsDeleteModalOpen(false)}
        content={<>
        <p class="text-lg font-bold">
          Are you sure you want to delete your goal " {selectedGoalForDeletion ? selectedGoalForDeletion.name : ''}"?
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
          <p class="text-lg font-bold"> You've saved {selectedGoalForAddingMoney ? selectedGoalForAddingMoney.amountSaved : ''} for {selectedGoalForAddingMoney ? selectedGoalForAddingMoney.name : ''}. How much would you like to add?
          </p>
        
          <input class="border rounded-md p-2" type="number" value={addMoneyAmount} onChange={(e) => setAddMoneyAmount(e.target.value)} />

         </>}
        handleSubmit={handleAddMoney}
        positiveLabel="Add"
        negativeLabel="Discard"
      >
        
      </Modal>
      
      

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
            {goalsData.map((goal) => (
              <div
                key={goal._id}
                className=" shadow p-2 m-2 dark:bg-gray-900 rounded-md"
              >
                <div className="text-xl font-bold">{goal.name}</div>
                <div className="float-right flex sm:flex-row flex-col">
                <button className="float-right bg-green-500 px-1 mb-2 sm:px-2 sm:m-2 rounded-md text-white" onClick={() => { setSelectedGoalForAddingMoney(goal); setIsAddMoneyModalOpen(true); }}>Add Money</button>
                <button className="float-right bg-red-500  sm:px-2 sm:m-2 rounded-md text-white" onClick={() => { setSelectedGoalForDeletion(goal); setIsDeleteModalOpen(true); }}>Delete</button>
                </div>
                <p>
                  Goal amount: ${goal.amount}
                  <br />
                  Amount saved: ${goal.amountSaved}
                </p>
                <div>
                <div className="sm mt-4 w-full bg-gray-200 rounded-full dark:bg-gray-50 shadow">
                  <div
                    className="bg-lime-500 text-xs text-gray-700 text-center font-bold p-0.5 leading-none rounded-full"
                    style={{
                      width: `${(goal.amountSaved / goal.amount) * 100}%`,
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
