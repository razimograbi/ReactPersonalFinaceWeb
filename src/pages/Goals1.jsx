import UserNavigation from "../components/UserNavigation";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import GoalList from "../components/GoalList";

const Goals1 = () => {
  return (
    <div className="dark:bg-gray-700 dark:text-white">
      <Helmet>
        <title>Financial Goals</title>
      </Helmet>
      <UserNavigation />
      <div className=" w-screen">
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
