import PropTypes from "prop-types";
import { default as AvatarAnisha } from "../assets/images/avatar-anisha.png";
import { Link } from "react-router-dom";

function BudgetList({ budgetArray }) {
  console.log(budgetArray);
  return (
    <ul
      id="budgetList"
      className="budgets-list max-w-xl divide-gray-200 dark:divide-gray-900"
    >
      {budgetArray?.map((budget) => {
        const percentageSpent = (budget.spent / budget.limit) * 100;
        return (
          <li key={budget.category}>
            <div className="flex gap-5 p-2 my-2">
              <div>
                <img
                  src={AvatarAnisha}
                  className="rounded-full w-10 h-10 mb-2 ml-2"
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col gap-1 w-96">
                <div className="flex justify-between gap-2">
                  <h5 className="dark:text-white">{budget.category}</h5>
                  <p className="dark:text-white">${budget.limit}</p>
                </div>
                <div className="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-green-600 text-xs h-4 rounded-full text-center p-0.5 leading-none dark:bg-green-500 dark:text-white"
                    style={{ width: `${percentageSpent}%` }}
                  >
                    ${budget.spent}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Link to="/budgetCategoryChanger" className="text-blue-500">
                  Edit Budget
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

BudgetList.propTypes = {
  currentlySelectedMonth: PropTypes.string,
  currentlySelectedYear: PropTypes.string,
  calculateSpentPercentages: PropTypes.func,
  budgetArray: PropTypes.array,
  setBudgetArray: PropTypes.func,
  getExpensesBasedOnMonthAndYear: PropTypes.func,
};

export default BudgetList;
