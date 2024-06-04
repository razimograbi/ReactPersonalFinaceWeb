import { Link } from "react-router-dom";
import { default as growth } from "../../assets/images/growth.jpg";
import { Helmet } from "react-helmet";
import { useState } from "react";
import axios from "axios"; // Import axios


// Register component for user registration page 
const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Define handleRegister function
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Extract user data from the form fields directly
    const { fullname, email, password, confirmPassword } = formData;
  
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return; // Abort registration if passwords don't match
    }
  
    // Create user data object
    const userData = {
      name: fullname,
      email: email,
      password: password,
    };
  
    // POST request
    axios
      .post("https://partialbackendforweb.onrender.com/register", userData)
      .then((response) => {
        // Handle success
        console.log("User registered successfully:", response.data);
        // Show success alert
        alert("User registered successfully!");
        // Redirect user to login page
      })
      .catch((error) => {
        // Handle error
        console.error("Error registering user:", error);
        // Show error alert
        alert("Error registering user. Please try again later.");
      });
  };
  

  return (
    // Main container with background image and text color styling 
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${growth})`, color: "#ffffff" }}
    >
      {/* Helmet component for setting the page title */}
      <Helmet>
        <title>Register - Budget Buddy</title>
      </Helmet>
      {/* Register form container */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-md shadow-md max-w-md w-full text-white">
          <h1 className="text-3xl font-bold mb-4">Create an Account</h1>

          {/* <!-- Registration Form --> */}
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="fullname"
                className="block text-gray-300 text-sm font-semibold mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* <!-- Email Input Field --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-semibold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* <!-- Password Input Field --> */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-semibold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* <!-- Confirm Password Input Field --> */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-300 text-sm font-semibold mb-2"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* <!-- Register Button --> */}
            <div>
              <button
                onClick={handleRegister}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Register
              </button>
            </div>
          </form>

          {/* <!-- Already have an account Link --> */}
          <p className="text-sm mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:underline">
              {" "}
              Login
            </Link>
          </p>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home Screen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
