const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



// Contact Form Validation
const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    clearErrors();

    if (name.value.trim() === "") {
      showError(name, "Name is required");
      valid = false;
    }

    if (email.value.trim() === "") {
      showError(email, "Email is required");
      valid = false;
    } else if (!email.value.includes("@")) {
      showError(email, "Enter valid email");
      valid = false;
    }

    if (message.value.trim() === "") {
      showError(message, "Message is required");
      valid = false;
    }

    if (valid) {
      alert("Message submitted successfully");
      form.reset();
    }

  });

  function showError(input, msg) {
    const parent = input.parentElement;
    parent.querySelector(".error-text").textContent = msg;
  }

  function clearErrors() {
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");
  }

}

