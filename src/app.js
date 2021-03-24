"use strict";

// Global Variables

// Relative with menu
// 햄버거 메뉴와 관련된 변수들
const burgerMenu = document.querySelector(".burger");
const burgerBtn = document.querySelector(".burger__btn");
const timesBtn = document.querySelector(".times__btn");

// Relative with nav-bar
// 네비게이션 바와 관련된 셀렉터
const navContainer = document.querySelector(".nav__container");

// Relative with home-section
// 홈 섹션의 높이
const homeHeight = home.getBoundingClientRect().height;

// Relative with move-to-top Button
// 페이지 최상단으로 올려주는 버튼
const moveToTopBtn = document.querySelector(".move-to-top");

// Relative with scroll alarm
// 섹션들의 Id값을 모아놓은 배열
const sectionIds = ["#home", "#about", "#skills", "#works", "#contact"];

// Id에 부합하는 섹션을 찾아서 배열로 만들어주는 코드
const sections = sectionIds.map((id) => document.querySelector(id));
// Nav-bar에서 해당 Id들의 네비게이션 버튼을 찾아주는 코드
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

// Selected Nav Item을 이용해 네비게이션 배열의 첫번째 요소를 선택하는 코드
let selectedNavItem = navItems[0];

//IntersectionObserver의 옵션
const observerOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

// Functions

// Relative with menu
// 햄버거 버튼 클릭시 네비게이션 바를 보여주는 함수
const leftToRight = (ul) => {
  ul.style.animation = "leftToRight 400ms ease-in-out";
  ul.style.backgroundColor = "#e5e5e5";
};

// 햄버거 버튼 클릭시 DOM 요소를 만들어주는 함수
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

// 버튼의 상태에 따라 열기와 닫기 버튼을 번갈아가며 보여주는 함수
const toggleClass = () => {
  burgerBtn.classList.toggle("toggled");
  timesBtn.classList.toggle("toggled");
};

// X 버튼 클릭 시 모든 요소들을 제거해주는 함수
const clearUl = () => {
  const ul = document.querySelector(".burger__list");
  burgerMenu.removeChild(ul);
};

// Relative with nav-bar
// 네비게이션 바를 투명에서 연한 회색으로 변경해주는 함수
const transparentToLightGrey = () => {
  if (window.scrollY > homeHeight / 3) {
    navContainer.classList.add("scrolled");
  } else {
    navContainer.classList.remove("scrolled");
  }
};

// Relative wiht home section
// 홈 섹션을 스크롤할 때 배경을 투명하게 만들어주는 함수
const makeOpacityToHome = () => {
  const yHeight = window.scrollY;
  if (yHeight < homeHeight) {
    home.style.opacity = 1 - yHeight / homeHeight;
  }
};

// Relative with move-to-top Button
// 페이지 최상단으로 올려주는 함수
const moveToTop = () => {
  window.scrollTo(0, 0);
};

// 최상단에서는 버튼이 보이지 않다가 스크롤을 시작하면 보이도록 만들어주는 함수
const hideMoveToTopBtn = () => {
  if (window.scrollY > homeHeight / 2) {
    moveToTopBtn.classList.add("visible");
  } else {
    moveToTopBtn.classList.remove("visible");
  }
};

// Relative with scroll alarm
// IntersectionObserver를 사용하기 위한 callback 함수
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

// Event Handlers

// Relative with menu
// 햄버거 메뉴에서 발생하는 이벤트 핸들러
burgerBtn.addEventListener("click", () => {
  burgerClickEventHandler();
  toggleClass();
});

timesBtn.addEventListener("click", () => {
  clearUl();
  toggleClass();
});

// Relative with nav-bar
// 네비게이션 바를 투명한 색에서 회색으로 변경해주는 이벤트 핸들러
document.addEventListener("scroll", transparentToLightGrey);

// Relative with home section
// 스크롤시 홈 섹션을 투명하게 만들어주는 이벤트 핸들러
window.addEventListener("scroll", () => {
  makeOpacityToHome();
});

// Relative with move-to-top Button
// 화살표 버튼 클릭 시 함수를 실행해주는 핸들러
moveToTopBtn.addEventListener("click", moveToTop);
// 최상단에서 스크롤 시 화살표 버튼을 보여주는 핸들러
document.addEventListener("scroll", hideMoveToTopBtn);

// Relative with scroll alarm
// IntersectionObserver 객체 생성
const observer = new IntersectionObserver(callback, observerOption);
sections.forEach((section) => observer.observe(section));
