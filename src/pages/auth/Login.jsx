import { Link, useNavigate } from "react-router-dom";
import { default as giphy } from "../../assets/images/giphy.gif";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const tokenObj = JSON.parse(localStorage.getItem("token"));
  if (tokenObj) {
    localStorage.removeItem("token");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Create loginData object
    const loginData = {
      email: email,
      password: password,
    };

    // Send POST request using Axios
    axios
      .post("https://partialbackendforweb.onrender.com/login", loginData)
      .then((response) => {
        console.log("Login Success:", response.data);
        // Handle token and expiration date
        const token = response.data.token; // Assuming token is returned in the response
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000); // Current time + 1 hour
        localStorage.setItem(
          "token",
          JSON.stringify({ value: token, expires: expirationDate })
        );
        // Redirect to user home page
        navigate("/userHome");
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  }
  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${giphy})`, color: "#ffffff" }}
    >
      <Helmet>
        <title>Login - Budget Buddy</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-md shadow-md max-w-md w-full text-white">
          {/* <!-- Adjust background color to gray-800 and text color to white --> */}
          <h1 className="text-3xl font-bold mb-4">Login to Budget Buddy</h1>

          {/* <!-- Login Form --> */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-semibold mb-2"
              >
                Email:
              </label>
              {/* <!-- Adjust text color to gray-300 --> */}
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-semibold mb-2"
              >
                Password:
              </label>
              {/* <!-- Adjust text color to gray-300 --> */}
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link to="/login" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
              <button
                type="submit"
                id="loginBtn"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Login
              </button>
            </div>
          </form>
          <div className="py-3">
            
          </div>
          {/* <!-- Create Account Link --> */}
          <p className="text-sm mt-4">
            Don&apos;t have an account?
            <Link to="/register" className="text-blue-500 hover:underline">
              {" "}
              Create one
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

export default Login;
