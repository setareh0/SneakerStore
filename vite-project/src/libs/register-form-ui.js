const iconLock = document.querySelector(".fa-lock");
const iconEnvelope = document.querySelector(".fa-envelope");
const iconEyeSlash = document.querySelector(".fa-eye-slash");
const inputEnvelope = document.getElementById("inputEnvelope");
const inputPassword = document.getElementById("inputPassword");
const Submit = document.getElementById("Submit");

inputPassword.addEventListener("click", () => (iconLock.style.color = "#000"));
inputEnvelope.addEventListener(
  "click",
  () => (iconEnvelope.style.color = "#000")
);
inputPassword.addEventListener(
  "click",
  () => (iconEyeSlash.style.color = "#000")
);
iconEyeSlash.addEventListener("click", () => {
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    iconEyeSlash.classList.remove("fa-eye-slash");
    iconEyeSlash.classList.add("fa-eye");
  } else {
    inputPassword.type = "password";
    iconEyeSlash.classList.remove("fa-eye");
    iconEyeSlash.classList.add("fa-eye-slash");
  }
});

function checkInputs() {
  const username = inputEnvelope.value;
  const password = inputPassword.value;

  if (username && password) {
    Submit.style.backgroundColor = "#212529";
  } else {
    Submit.style.backgroundColor = "#6E7174";
  }
}

inputEnvelope.addEventListener("input", checkInputs);
inputPassword.addEventListener("input", checkInputs);
