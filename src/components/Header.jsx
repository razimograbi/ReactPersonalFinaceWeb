import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="navbar-container" className="fixed w-full -top-1 z-20">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">
            Budget Buddy
          </Link>
          <div className="container mx-auto flex items-center justify-between relative">
            <button
              id="menuBtn"
              className="block sm:hidden bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 ml-auto"
              onClick={() => {
                const popupMenu = document.getElementById("popupmenu");
                popupMenu.classList.toggle("hidden");
              }}
            >
              &#9776;
              {/* <!-- Hamburger Icon --> */}
            </button>
            <div className="sm:flex space-x-4 hidden">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/aboutUs" className="hover:text-gray-300">
                About Us
              </Link>
              <Link to="/contactUs" className="hover:text-gray-300">
                Contact Us
              </Link>
            </div>
            <div className="items-center sm:flex hidden">
              <Link
                to="/login"
                className="mr-4 bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 block"
              >
                Register
              </Link>
            </div>
            <div
              id="popupmenu"
              className="justify-start gap-4 hidden sm:hidden absolute bg-slate-600 width-[70px] top-[60px] rounded-lg left-0 right-0 p-4 pb-6"
            > 
              <Link to="/" className="hover:text-gray-300 block">
                Home
              </Link>
              <a href="#features" className="hover:text-gray-300 block">
                Features
              </a>
              <Link to="/aboutUs" className="hover:text-gray-300 block">
                About Us
              </Link>
              <Link to="/contactUs" className="hover:text-gray-300 block">
                Contact Us
              </Link>
              <Link
                to="/login"
                className="mr-4 bg-white text-blue-500 py-2 px-4 rounded-full hover:bg-blue-100 block my-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 block"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
