/* import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import UserNavigation from "../components/UserNavigation";
import { Helmet } from "react-helmet";

const Goals = () => {
  return (
    <div className="">
      <Helmet>
        <title>Financial Goals</title>
      </Helmet>
      <div className="dark:bg-gray-700 dark:text-white p-4 min-h-screen">
        <UserNavigation />
        <div className="max-w-[1000px] w-full mx-auto relative">
          <h2 className="my-8 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center">
            Goals Tracking
          </h2>

          <div
            id="goalsContainer"
            className="container flex flex-col p-2 my-2 mx-auto overflow-hidden "
          >
            <div className="inline-block">
              <Link
                to="/addGoal"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-2 rounded-md"
              >
                {" "}
                Add new goal
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Goals;
 */