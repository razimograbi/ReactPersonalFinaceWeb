const loginBtn = document
  .getElementById("loginBtn")
  .addEventListener("click", (e) => {
    login();
  });

function getToken() {
  const tokenObj = JSON.parse(localStorage.getItem("token"));
  if (!tokenObj) return null;

  const currentTime = new Date().getTime();
  if (currentTime > tokenObj.expires) {
    localStorage.removeItem("token"); // Remove expired token
    return null;
  }

  return tokenObj.value; // Return the token if it hasn't expired
}

function login() {
  // Retrieve email and password from input fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
      window.location.href = "userHome.html";
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
}
