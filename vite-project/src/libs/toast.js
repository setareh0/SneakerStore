import Toastify from "toastify-js";

export const toast = (text, mode = "error") => {
  Toastify({
    text,
    duration: 2000,
    close: true,
    style: {
      background: mode === "success" ? "green" : "red",
      borderRadius: "5px",
      fontWeight: "500",
    },
  }).showToast();
};
