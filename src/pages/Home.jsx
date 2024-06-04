import Footer from "../components/GeneralComponents/Footer";
import Header from "../components/GeneralComponents/Header";
import { default as wallpaperBudgetHome } from "../assets/images/wallpaperBudgetHome.jpg";
import { default as aboutUs } from "../assets/images/about_us.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//Define home component
const Home = () => {
  
  return (
    <div className="bg-gray-900 text-white font-sans bg-cover bg-no-repeat bg-page overflow-y-auto h-full h-screen">
      <Helmet>
        <title>Budget Buddy - Home</title>
      </Helmet>
      <Header />
      <div
        id="menu-overlay"
        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 hidden"
      ></div>
      {/* <!-- Hero Section --> */}
      <section className="bg-gray-800 text-white h-screen flex items-center">
        <div className="mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Take Control of Your Finances with Budget Buddy
          </h1>
          <p className="text-lg mb-8">
            Manage your money, set goals, and achieve financial success.
          </p>
          <Link
            to="/Register"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Get Started
          </Link>
        </div>
      </section>
      <div
        className="mx-auto  h-80 w-full mt-28 bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url(${wallpaperBudgetHome})`,
        }}
      >
        <h1 className="text-6xl sm:text-8xl mt-2 pt-10 dark:text-white text-center"></h1>
      </div>
      {/* <!-- Features Section --> */}
      <section id="features" className="py-16">
        <div className="mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-6">
            {/* <!-- Feature 1 --> */}
            <div className="p-8 bg-white rounded-lg shadow-md text-black">
              <h3 className="text-xl font-bold mb-4">Budget Management</h3>
              <p>
                Effortlessly create and manage your budget to track expenses and
                savings.
              </p>
            </div>

            {/* <!-- Feature 2 --> */}
            <div className="p-8 bg-white rounded-lg shadow-md text-black">
              <h3 className="text-xl font-bold mb-4">Goal Setting</h3>
              <p>
                Set SMART financial goals and track your progress towards
                achieving them.
              </p>
            </div>

            {/* <!-- Feature 3 --> */}
            <div className="p-8 bg-white rounded-lg shadow-md text-black">
              <h3 className="text-xl font-bold mb-4">Expenses Menotring</h3>
              <p>
                Gain valuable insights into your spending patterns and make
                informed financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- About Us Section --> */}
      <section className="flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <img
                src={aboutUs}
                alt=""
                className="relative z-00 object-cover w-full h-96 rounded-3xl"
              />
            </div>
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <h2 className="mb-4 text-4xl font-semibold text-blue-500 dark:text-gray-300">
                About Us
              </h2>
              <p className="mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                Welcome to Budget Buddy, crafted with passion by three dedicated
                students from Braude Academic College! As final-year students,
                we recognized the need for a comprehensive Personal Finance
                Manager to empower individuals in taking control of their
                financial journey. With a commitment to simplifying financial
                management, we have designed Budget Buddy to be your trusted
                companion in navigating the complexities of personal finances...
              </p>
              <Link
                to="/aboutUs"
                className="px-4 py-3 text-blue-700 transition-all transform border border-blue-500 rounded-3xl hover:bg-blue-600 dark:border-blue-400 dark:hover:bg-blue-500 dark:hover:text-gray-100 dark:hover:border-blue-500 dark:text-blue-400 hover:text-gray-100"
              >
                Discover more
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
