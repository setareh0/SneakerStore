import { signup } from "../../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const usernameValue = formData.get("username");
  const passwordValue = formData.get("password");

  try {
    const response = await signup({
      username: usernameValue,
      password: passwordValue,
    });
    toast("Signed in", "success");
    setSessionToken(response.token);
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  } catch (error) {
    errorHandler(error);
  }
});
