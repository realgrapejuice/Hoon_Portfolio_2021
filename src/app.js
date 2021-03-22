"use strict";

const burgerMenu = document.querySelector(".burger");
const burgerBtn = document.querySelector(".burger__btn");
const timesBtn = document.querySelector(".times__btn");

const leftToRight = (ul) => {
  ul.style.animation = "leftToRight 500ms linear";
  ul.style.backgroundColor = "#edc87d";
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
    a.innerText = element;
    li.appendChild(a);
    ul.appendChild(li);
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
