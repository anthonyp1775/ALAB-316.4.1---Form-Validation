    const registration = document.querySelector("#registration")
    if (registration) {
    registration.addEventListener("submit", function(event){
    event.preventDefault();

    const formData = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        passwordcheck: document.getElementById("passwordCheck").value,
    }});
    }

        if (formData.password !== formData.passwordcheck) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Submitted Successfully:", formData);