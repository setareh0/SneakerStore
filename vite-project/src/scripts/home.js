import {
  getSneakerBrands,
  getSneakers,
} from "../../apis/services/sneaker.service";
import { getUser } from "../../apis/services/user.service";
import { errorHandler } from "../libs/error-handler";
import debounce from "lodash.debounce";
import { removeSessionToken } from "../libs/session-manager";

const productsEl = document.getElementById("products");
const productBrands = document.getElementById("products-brand");
const username = document.getElementById("username");
const greeting = document.getElementById("greeting");
const pages = document.getElementById("page");
const searchInput = document.getElementById("searchInput");
const paginations = document.getElementById("paginations");
const bottomEls = document.getElementById("bottomEls");
const theMost = document.getElementById("theMost");
const notFoundEl = document.getElementById("notFoundEl");
const scrollBar = document.querySelector(".scrollBar");
const logOut = document.getElementById("logOut");
let totalPages;
let curPage = 1;
let selectedBrand = null;
let currentSearchValue = "";

async function get() {
  try {
    const user = await getUser();
    username.innerText = user.username;
  } catch (error) {
    errorHandler(error);
  }
}
get();

function updateGreeting() {
  const hour = new Date().getHours();

  let greetingTxt;

  if (hour >= 6 && hour < 12) {
    greetingTxt = "Good Morning 👋";
  } else if (hour >= 12 && hour < 17) {
    greetingTxt = "Good Afternoon 👋";
  } else if (hour >= 17 && hour < 20) {
    greetingTxt = "Good Evening 👋";
  } else {
    greetingTxt = "Good Night 👋";
  }
  greeting.innerText = greetingTxt;
}
updateGreeting();

async function getProducts(
  brand = selectedBrand,
  page = 1,
  search = currentSearchValue
) {
  try {
    const params = { page, limit: 10, search };
    if (brand) {
      params.brands = brand;
    }

    const sneakersResponse = await getSneakers(params);
    const sneakers = sneakersResponse.data;

    totalPages = sneakersResponse.totalPages;

    productsEl.innerHTML = "";

    if (sneakers.length === 0) {
      notFoundSneaker(search);
    } else {
      sneakers.forEach((sneaker) => {
        const product = document.createElement("div");
        product.innerHTML = renderSneakers(sneaker);
        product.addEventListener("click", () => {
          window.location.href = `/sneakerItem.html?id=${sneaker.id}`;
        });
        productsEl.append(product);
      });
      pagination(page, totalPages);
      elementStyles(true);
    }
  } catch (error) {
    errorHandler(error);
  }
}

getProducts();

function renderSneakers(sneaker) {
  return `
    <img class="bg-[#F3F3F3] w-[182px] h-[182px] rounded-3xl" 
         src="${sneaker.imageURL}" 
         alt="${sneaker.name}" />
    <div class="mt-3">
      <h3 class="text-[20px] font-bold text-[#152536] font-Inter truncate">
        ${sneaker.name}
      </h3>
      <p class="text-[16px] font-semibold text-[#152536] font-Inter">
        $ ${sneaker.price}
      </p>
    </div>
  `;
}

function notFoundSneaker(searchValu) {
  const notFound = document.createElement("div");
  notFound.innerHTML = `
    <div class="flex justify-between items-baseline mt-6">
      <h2 class="font-bold text-[20px]">Results for "${searchValu}"</h2>
      <span class="font-bold text-[16px]">0 found</span>
    </div>
    <div class="flex flex-col items-center text-center font-Inter mt-12">
      <img src="./public/assets/images/1.png" alt="" />
      <h1 class="font-bold text-[25px] mt-2">Not Found</h1>
      <p class="text-[18px] mt-4">
        Sorry, the keyword you entered cannot be found, please check again or
        search with another keyword.
      </p>
    </div>
  `;
  notFoundEl.innerHTML = "";
  notFoundEl.append(notFound);
  elementStyles(false);
}

function elementStyles(show) {
  const display = show ? "flex" : "none";
  paginations.style.display = display;
  bottomEls.style.display = display;
  productsEl.style.display = show ? "grid" : "none";
  productBrands.style.display = display;
  theMost.style.display = display;
  scrollBar.style.display = show ? "block" : "none";
  notFoundEl.style.display = show ? "none" : "block";
}

async function loadBrands() {
  try {
    const brands = await getSneakerBrands();

    const allBrandsEl = document.createElement("div");
    allBrandsEl.classList =
      "bg-[#343A40] rounded-3xl text-white w-full text-[17px] py-[4px] px-[18px] flex justify-center items-center cursor-pointer";
    allBrandsEl.innerText = "All";
    allBrandsEl.addEventListener("click", () => {
      if (selectedBrand !== null) {
        selectedBrand = null;
        getProducts();
        brandClicked(allBrandsEl);
      }
    });
    productBrands.append(allBrandsEl);

    brands.forEach((brand) => {
      const brandEl = document.createElement("div");
      brandEl.classList =
        "py-[4px] px-[18px] w-full border-2 border-[#343A40] rounded-3xl flex justify-center items-center whitespace-nowrap";
      brandEl.innerHTML = brand;
      brandEl.addEventListener("click", () => {
        if (selectedBrand !== brand) {
          selectedBrand = brand;
          getProducts(brand);
          brandClicked(brandEl);
        }
      });
      productBrands.append(brandEl);
    });
  } catch (error) {
    errorHandler(error);
  }
}

function brandClicked(selectedBrandEl) {
  selectedBrand =
    selectedBrandEl.innerText === "All" ? null : selectedBrandEl.innerText;

  const allBrandEls = productBrands.querySelectorAll("div");
  allBrandEls.forEach((brandEl) => {
    brandEl.classList.remove("bg-[#343A40]", "text-white");
    brandEl.classList.add("border-2", "border-[#343A40]", "text-[#343A40]");
  });

  selectedBrandEl.classList.add(
    "bg-[#343A40]",
    "text-white",
    "py-[4px]",
    "px-[18px]"
  );
  selectedBrandEl.classList.remove(
    "border-2",
    "border-[#343A40]",
    "text-[#343A40]"
  );
}

loadBrands();

function pagination(page, totalPages) {
  pages.innerHTML = "";

  const startPage = 1;

  for (let i = startPage; i <= totalPages; i++) {
    const pageSpan = document.createElement("span");
    pageSpan.innerText = i;
    pageSpan.className = `px-3 py-1 rounded-md ${
      i === page ? "bg-black text-white active" : "bg-gray-200"
    }`;
    pageSpan.addEventListener("click", () => changePage(i));
    pages.append(pageSpan);
  }
}
function changePage(page) {
  curPage = page;
  getProducts(selectedBrand, curPage, currentSearchValue);
}
searchInput.addEventListener(
  "keyup",
  debounce((event) => {
    const searchValue = event.target.value.trim();
    currentSearchValue = searchValue;
    searching(searchValue);
  }, 3000)
);
function searching(searchValue) {
  curPage = 1;
  getProducts(selectedBrand, curPage, searchValue);
  pagination(curPage, totalPages);
}

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  removeSessionToken();
  window.location.href = "./login";
});

function authGuard() {
  const token = getSessionToken();
  if (!token) {
    window.location.href = "./login";
  }
}
authGuard();
