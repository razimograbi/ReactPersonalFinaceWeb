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

const categoryButton = document.getElementById("categoryButton");
const dropdown = document.getElementById("dropdown");
const questionMark = document.getElementById("questionMark");
const infoMessage = document.getElementById("infoMessage");
const moneyLabel = document.getElementById("money-label");
const profilePictureButton = document.getElementById("profile-pic-button");

const confirmScreen = document.getElementById("confirm-screen");
const modal = document.getElementById("modal");
const categoryTypeInModel = document.getElementById("category-type-in-model");
const amountOfMoneyInModel = document.getElementById(
  "amount-of-money-in-model"
);
const amountOfPaymentsInModel = document.getElementById(
  "amount-of-payments-in-model"
);

const addExpenseButton = document.getElementById("add-expense-button");

const dropdownLinks = document.querySelectorAll(".dropdown-link");

// handling hovering over the question mark
questionMark.addEventListener("mouseover", () => {
  infoMessage.classList.remove("hidden");
});
// handling hovering out of the question mark
questionMark.addEventListener("mouseout", () => {
  infoMessage.classList.add("hidden");
});

const toggleCategoryList = () => {
  dropdown.classList.toggle("hidden");
};

let currentlyChosenCategory = "Category";
//handling category
categoryButton.addEventListener("click", toggleCategoryList);

// choosing a category from list action handle
dropdownLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // to make sure that the link doesnt activate when clicked

    categoryButton.innerHTML =
      link.textContent +
      `<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>`;
    toggleCategoryList();

    if (link.textContent === "Loan") {
      moneyLabel.textContent = "Amount Of Borrowed Money";
    } else {
      moneyLabel.textContent = "Amount Spent";
    }
    currentlyChosenCategory = link.textContent;
  });
});

// hamburg button handle

const menuButton = document
  .getElementById("menuBtn")
  .addEventListener("click", () => {
    document.getElementById("popupmenu").classList.toggle("hidden");
  });

//profile picture click
profilePictureButton.addEventListener("click", () => {
  document.getElementById("profile-pic-dropdown").classList.toggle("hidden");
});

const toggleModel = () => {
  confirmScreen.classList.toggle("hidden");
  modal.classList.toggle("hidden");
  categoryTypeInModel.textContent = currentlyChosenCategory;
  amountOfMoneyInModel.textContent =
    document.getElementById("amount-of-money").value;
  amountOfPaymentsInModel.textContent =
    document.getElementById("number-of-payments").value;
};

addExpenseButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentlyChosenCategory === "Category") {
    return;
  }
  toggleModel();
});

confirmScreen.addEventListener("click", () => {
  toggleModel();
});

// yes and no button in the modal:
document.getElementById("yes-button").addEventListener("click", () => {
  toggleModel();
  document.getElementById("amount-of-money").value = "";
  document.getElementById("number-of-payments").value = "1";
  return;
});

// no button inside thr modal
document.getElementById("no-button").addEventListener("click", () => {
  toggleModel();
});
