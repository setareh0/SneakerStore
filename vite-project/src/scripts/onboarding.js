import Swiper from "swiper";

import { Pagination } from "swiper/modules";

Swiper.use([Pagination]);


const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const nextBtn = document.getElementById("Next");

const updateBtnText = () => {
  if (swiper.isEnd) {
    nextBtn.innerText = "Get Started";
    nextBtn.href = "./login";
  } else {
    nextBtn.innerText = "Next";
    nextBtn.href = "#";
  }
};

swiper.on("slideChange", updateBtnText);

const btnClicked = () => {
  if (swiper.isEnd) {
    window.location.href = nextBtn.href;
  } else {
    swiper.slideNext();
  }
};

nextBtn.addEventListener("click", btnClicked);

updateBtnText();
