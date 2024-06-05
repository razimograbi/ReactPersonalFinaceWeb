import UserNavigation from "../components/GeneralComponents/UserNavigation";
import Footer from "../components/GeneralComponents/Footer";
import { Helmet } from "react-helmet";

// BudgetCategoryChanger component for changing budget categories
const BudgetCategoryChanger = () => {
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    // Main container with background color styling
    <div className="dark:bg-gray-400">
      <Helmet>
        <title>Budget Changer</title>
      </Helmet>
      <UserNavigation />
      {/* Main section with margin-top and flex alignment */}
      <div className="flex items-center justify-center my-4">
        <div className="flex flex-col w-1/2 max-w-md p-4 bg-white rounded-lg shadow-lg dark:bg-gray-900">
          <h2 className="mb-4 text-4xl font-semibold text-blue-500 dark:text-white">
            Change Budget Category
          </h2>
          <form onSubmit={handleSubmit} method="post">
            {/* Form fields */}
            <div className="flex flex-col mb-4">
              <label htmlFor="category" className="mb-2 dark:text-white">
                Category:
              </label>
              {/* Select field for category */}
              <select
                id="category"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="1">Food</option>
                <option value="2">Transportation</option>
                <option value="3">Entertainment</option>
                <option value="4">Health</option>
                <option value="5">Education</option>
                <option value="6">Savings</option>
                <option value="7">Other</option>
              </select>
            </div>
            {/* Form field for budget */}
            <div className="flex flex-col mb-4">
              <label htmlFor="budget" className="mb-2 dark:text-white">
                Budget:
              </label>
              <input
                type="number"
                id="budget"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Form field for description */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              {/* Button to go back */}
              <button
                type="button"
                className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ml-2"
                onClick="window.location.href = 'budgetTracking.html';"
              >
                Back
              </button>
            </div>
          </form>
          {/* Text content */}
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Review spending patterns, adjust allocations based on goals, monitor
            regularly for financial alignment and adaptability.
          </p>
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default BudgetCategoryChanger;
