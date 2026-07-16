    const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");
 
function showErrors(errors, focusElement) {
  errorDisplay.innerHTML = errors.map((e) => `<div>${e}</div>`).join("");
  errorDisplay.style.display = "flex";
  errorDisplay.style.flexDirection = "column";
  if (focusElement) focusElement.focus();
}
 
function showSuccess(message) {
  errorDisplay.innerHTML = `<div style="color: green;">${message}</div>`;
  errorDisplay.style.background = "#cfc";
  errorDisplay.style.display = "flex";
  setTimeout(() => {
    errorDisplay.style.display = "none";
    errorDisplay.style.background = "#fcc";
  }, 4000);
}
 
function hideErrors() {
  errorDisplay.style.display = "none";
  errorDisplay.innerHTML = "";
}
 
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || {};
}
 
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
 
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  hideErrors();
 
  const username = registrationForm.elements["username"];
  const email = registrationForm.elements["email"];
  const password = registrationForm.elements["password"];
  const passwordCheck = registrationForm.elements["passwordCheck"];
  const terms = registrationForm.elements["terms"];
 
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value;
  const passwordCheckValue = passwordCheck.value;
 
  const errors = [];
  let focusTarget = null;
 
  if (usernameValue === "") {
    errors.push("The username cannot be blank.");
    focusTarget = focusTarget || username;
  } else {
    if (usernameValue.length < 4) {
      errors.push("The username must be at least four characters long.");
      focusTarget = focusTarget || username;
    }
    if (new Set(usernameValue.toLowerCase()).size < 2) {
      errors.push("The username must contain at least two unique characters.");
      focusTarget = focusTarget || username;
    }
    if (!/^[a-zA-Z0-9]+$/.test(usernameValue)) {
      errors.push(
        "The username cannot contain any special characters or whitespace."
      );
      focusTarget = focusTarget || username;
    }
  }
 

 

