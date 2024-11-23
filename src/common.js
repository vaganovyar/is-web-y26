"use strict";

const start_time = Date.now();

function scrollCheck() {
  if (window.innerWidth <= 1000)
    return;
  let elem = document.getElementById("slider");
  if (elem != null) {
    let data = elem.getBoundingClientRect();
    if (data.y + data.height >= 0) {
      let logo = document.getElementById("top_menu_logo");
      logo.style.transform = "rotate(-360deg)";
      logo.style.transition = "0.5s";
      logo.style.width = "0%";
      let menu = document.getElementById("top_menu");
      menu.style.width = "100%";
      menu.style.transition = "0.5s";
    } else {
      let logo = document.getElementById("top_menu_logo");
      logo.style.transform = "rotate(360deg)";
      logo.style.transition = "0.5s";
      logo.style.width = "3%";
      let menu = document.getElementById("top_menu");
      menu.style.width = "90%";
      menu.style.transition = "0.5s";
    }
  } else {
    let logo = document.getElementById("top_menu_logo");
    logo.style.transform = "rotate(360deg)";
    logo.style.transition = "0.5s";
    logo.style.width = "3%";
    let menu = document.getElementById("top_menu");
    menu.style.width = "90%";
    menu.style.transition = "0.5s";
  }
}

window.addEventListener("scroll", scrollCheck);

window.addEventListener("load", (event) => {
  scrollCheck();
  let elem = document.getElementById("load_time");
  let loadTime = Date.now() - start_time;

  elem.innerHTML = `Время загрузки страницы: ${loadTime}ms`;

  let name = document.location.href;
  let filename = name.split("/");
  filename = filename[filename.length - 1];
  let menu = document.getElementById("top_menu").children[0];
  if (filename !== "index.html") {
    for (let i = 0; i < menu.children.length; i++) {
      let child = menu.children[i].children[0];
      if (child.href === name) {
        let line = child.children[0];
        line.style.opacity = "1";
        line.style.width = "98.4%";
      }
    }
  } else {
    menu.children[0].children[0].children[1].style.opacity = "1";
    menu.children[0].children[0].children[1].style.width = "98.4%";
  }
});
