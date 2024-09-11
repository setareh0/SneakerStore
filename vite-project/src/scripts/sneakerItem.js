import { getSneakerItems } from "../../apis/services/sneaker.service";
import { errorHandler } from "../libs/error-handler";

const sneakerName = document.getElementById("sneaker-name");
const image = document.getElementById("image");
const sneakerPrice = document.getElementById("sneaker-price");
const sneakerColors = document.getElementById("sneaker-colors");
const sneakerSizes = document.getElementById("sneaker-sizes");
const count = document.getElementById("count");
const add = document.querySelector(".fa-plus");
const remove = document.querySelector(".fa-minus");
let sneakerCount = 0;
let basePrice = 0;

// view more and less text
const text = document.getElementById("text");
const toggle = document.getElementById("toggle");
const allText = text.innerText;
const partOfText = allText.slice(0, 30);

text.innerText = partOfText;

toggle.addEventListener("click", () => {
  if (toggle.innerText === "view more") {
    text.innerText = allText;
    toggle.innerText = "view less";
  } else {
    text.innerText = partOfText;
    toggle.innerText = "view more";
  }
});

//add sneaker and calculate the price
add.addEventListener("click", () => {
  sneakerCount++;
  count.innerText = sneakerCount;
  updatePrice();
});
remove.addEventListener("click", () => {
  if (sneakerCount > 0) {
    sneakerCount--;
    count.innerText = sneakerCount;
    updatePrice();
  }
});

function updatePrice() {
  const totalPrice = basePrice * sneakerCount;
  sneakerPrice.innerText = `$${totalPrice}.00`;
}

async function getSneaker(sneakerId) {
  try {
    const sneaker = await getSneakerItems(sneakerId);

    if (sneaker && sneaker.id === parseInt(sneakerId)) {
      sneakerName.innerText = sneaker.name;
      image.innerHTML = `<img src="${sneaker.imageURL}" alt="sneaker-image" />`;
      sneakerPrice.innerText = `$${sneaker.price}.00`;

      basePrice = parseFloat(sneaker.price);

      const colors = sneaker.colors.split("|");
      sneakerColors.innerHTML = colors
        .map(
          (color) => `
        <div class="sneaker-color py-[11px] px-[16px] rounded-full w-[40px] h-[40px] flex justify-center items-center bg-[${color}]"></div>
      `
        )
        .join("");

      const colorEl = document.querySelectorAll(".sneaker-color");

      colorEl.forEach((color) => {
        color.addEventListener("click", () => {
          colorEl.forEach((el) => {
            el.innerHTML = "";
          });

          const whiteBack = color.classList.contains("bg-[white]");

          const colorChange = whiteBack ? "black" : "white";
          color.innerHTML = `<i class="fa-solid fa-check text-[${colorChange}]"></i>`;
        });
      });

      const sizes = sneaker.sizes.split("|");
      sneakerSizes.innerHTML = sizes
        .map(
          (size) => `
        <div class="sneaker-size border-2 border-[#717171] px-[12px] py-[9px] rounded-full">${size}</div>
      `
        )
        .join("");
      const sizeEl = document.querySelectorAll(".sneaker-size");

      sizeEl.forEach((size) => {
        size.addEventListener("click", () => {
          sizeEl.forEach((el) =>
            el.classList.remove("bg-[#3f3f3f]", "text-white")
          );
          size.classList.add("bg-[#3f3f3f]", "text-white", "border-[#3f3f3f]");
        });
      });
    }
  } catch (error) {
    errorHandler(error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const sneakerId = urlParams.get("id");

if (sneakerId) {
  getSneaker(sneakerId);
}
