import Footer from "../components/Footer";
import Header from "../components/Header";
import { default as aboutUs } from "../assets/images/about_us.jpg";
import { default as giphy } from "../assets/images/giphy.gif";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${giphy})`, color: "#ffffff" }}
    >
      <Helmet>
        <title>About Us - Buddet Buddy</title>
      </Helmet>
      <Header />
      <section className="mt-20 flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800">
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

export default About;
