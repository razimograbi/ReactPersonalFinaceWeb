import UserNavigation from "../components/GeneralComponents/UserNavigation";
import Footer from "../components/GeneralComponents/Footer";
import { Helmet } from "react-helmet";
import GoalList from "../components/GoalsComponents/GoalList";

/**
 * Component: Goals1
 * Description: Component for tracking financial goals.
 */
const Goals1 = () => {
  return (
    // Main container with background color styling 
    <div className="dark:bg-gray-700 dark:text-white">
      <Helmet>
        <title>Financial Goals</title>
      </Helmet>
      <UserNavigation />
      {/* Main section with margin-top and flex alignment  */}
      <div className=" w-screen">
        {/* Container for centering content   */}
        <div className="max-w-[1000px] w-full mx-auto relative">
          <h2 className="my-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
            Goals Tracking
          </h2>
          <GoalList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Goals1;
