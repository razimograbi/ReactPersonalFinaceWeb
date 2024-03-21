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
            {/* <!-- <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:focus:ring-blue-550 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Sign in with Facebook
          </button> --> */}
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
