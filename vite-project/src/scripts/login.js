import { login } from "../../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const usernameValue = formData.get("username");
  const passwordValue = formData.get("password");

  try {
    const response = await login({
      username: usernameValue,
      password: passwordValue,
    });
    toast("Logged in", "success");
    setSessionToken(response.token);
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  } catch (error) {
    errorHandler(error);
  }
});
