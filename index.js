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
 
  const users = getUsers();
  if (usernameValue !== "" && users[usernameValue.toLowerCase()]) {
    errors.push("That username is already taken.");
    focusTarget = focusTarget || username;
  }
 
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    errors.push("The email must be a valid email address.");
    focusTarget = focusTarget || email;
  } else if (emailValue.toLowerCase().endsWith("@example.com")) {
    errors.push('The email must not be from the domain "example.com."');
    focusTarget = focusTarget || email;
  }
 
  if (passwordValue.length < 12) {
    errors.push("Passwords must be at least 12 characters long.");
    focusTarget = focusTarget || password;
  }
  if (!/[A-Z]/.test(passwordValue) || !/[a-z]/.test(passwordValue)) {
    errors.push(
      "Passwords must have at least one uppercase and one lowercase letter."
    );
    focusTarget = focusTarget || password;
  }
  if (!/[0-9]/.test(passwordValue)) {
    errors.push("Passwords must contain at least one number.");
    focusTarget = focusTarget || password;
  }
  if (!/[^a-zA-Z0-9]/.test(passwordValue)) {
    errors.push("Passwords must contain at least one special character.");
    focusTarget = focusTarget || password;
  }
  if (passwordValue.toLowerCase().includes("password")) {
    errors.push('Passwords cannot contain the word "password".');
    focusTarget = focusTarget || password;
  }
  if (
    usernameValue !== "" &&
    passwordValue.toLowerCase().includes(usernameValue.toLowerCase())
  ) {
    errors.push("Passwords cannot contain the username.");
    focusTarget = focusTarget || password;
  }
  if (passwordValue !== passwordCheckValue) {
    errors.push("Both passwords must match.");
    focusTarget = focusTarget || passwordCheck;
  }
 
  if (!terms.checked) {
    errors.push("The terms and conditions must be accepted.");
    focusTarget = focusTarget || terms;
  }
 
  if (errors.length > 0) {
    showErrors(errors, focusTarget);
    return;
  }
 
  users[usernameValue.toLowerCase()] = {
    username: usernameValue.toLowerCase(),
    email: emailValue.toLowerCase(),
    password: passwordValue,
  };
  saveUsers(users);
 
  registrationForm.reset();
  showSuccess("Registration successful!");
});
 
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  hideErrors();
 
  const username = loginForm.elements["username"];
  const password = loginForm.elements["password"];
  const persist = loginForm.elements["persist"];
})