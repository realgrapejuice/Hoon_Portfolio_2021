"use strict";

// Relative with Hamburger menu
const burgerMenu = document.querySelector(".burger");
const burgerBtn = document.querySelector(".burger__btn");
const timesBtn = document.querySelector(".times__btn");

const leftToRight = (ul) => {
  ul.style.animation = "leftToRight 400ms ease-in-out";
  ul.style.backgroundColor = "#e5e5e5";
};

const burgerClickEventHandler = () => {
  const ul = document.createElement("ul");
  ul.setAttribute("class", "burger__list");
  const menuArr = ["Home", "About me", "Skills", "Works", "Contact"];
  menuArr.map((element) => {
    const target = element.split(" ")[0].toLowerCase();
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.setAttribute("class", "burger__list-item");
    a.setAttribute("href", `#${target}`);
    a.setAttribute("class", "burger__list-link");
    a.setAttribute("data-link", `#${target}`);
    a.innerText = element;
    li.appendChild(a);
    ul.appendChild(li);
    a.addEventListener("click", () => {
      clearUl();
      toggleClass();
    });
  });
  leftToRight(ul);
  burgerMenu.appendChild(ul);
};

const toggleClass = () => {
  burgerBtn.classList.toggle("toggled");
  timesBtn.classList.toggle("toggled");
};

const clearUl = () => {
  const ul = document.querySelector(".burger__list");
  burgerMenu.removeChild(ul);
};

burgerBtn.addEventListener("click", () => {
  burgerClickEventHandler();
  toggleClass();
});

timesBtn.addEventListener("click", () => {
  clearUl();
  toggleClass();
});

// Relative with move to top button
const home = document.querySelector(".header__container");
const homeHeight = home.getBoundingClientRect().height;
const moveToTopBtn = document.querySelector(".move-to-top");

const moveToTop = () => {
  window.scrollTo(0, 0);
};

const hideMoveToTopBtn = () => {
  if (window.scrollY > homeHeight / 2) {
    moveToTopBtn.classList.add("visible");
  } else {
    moveToTopBtn.classList.remove("visible");
  }
};

moveToTopBtn.addEventListener("click", moveToTop);
document.addEventListener("scroll", hideMoveToTopBtn);

// Relative with scroll alarm
const sectionIds = ["#home", "#about", "#skills", "#works", "#contact"];

// Id에 부합하는 섹션을 찾아서 배열로 만들어주는 코드
const sections = sectionIds.map((id) => document.querySelector(id));
// Nav-bar에서 해당 Id들의 네비게이션 버튼을 찾아주는 코드
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

// Selected Nav Item을 이용해 네비게이션 배열의 첫번째 요소를 선택하는 코드
let selectedNavItem = navItems[0];

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    let selectedIndex;
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 스크롤이 아래로 진행되어 페이지가 올라오는 경우
      if (entry.boundingClientRect.y < 0) {
        selectedIndex = index + 1;
      } else {
        selectedIndex = index - 1;
      }
      selectedNavItem.classList.remove("active");
      selectedNavItem = navItems[selectedIndex];
      selectedNavItem.classList.add("active");
    }
  });
};

const observerOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver(callback, observerOption);
sections.forEach((section) => observer.observe(section));
