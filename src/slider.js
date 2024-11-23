"use strict";

const images = ["slider_image_0.png", "slider_image_1.png", "slider_image_2.png"];
let current_slide = 0;
const header = ["Кубик Рубика", "Спидкубинг", "ПроКуб"];
const text = ["Что такое кубик Рубика и почему это не кубик Рубик?",
    "Как они это делают?",
    "Чем мы занимаемся и как это работает?"];

window.addEventListener("load", (event) => {
    setup();
});

function setup() {
    let slide = document.getElementById("slider");
    if (slide == null)
        return;
    slide.style.background = `url(public/img/${images[current_slide]}) no-repeat center`;
    slide.style.transition = "0.5s";
    slide.style.backgroundSize = "cover";
    setTimeout(() => {
        slide.style.background = `url(public/img/${images[current_slide]}) no-repeat center`;
        slide.style.transition = "0.5s";
        slide.style.backgroundSize = "cover";
    }, 500)
    let slider_h = document.getElementById("slider__header");
    slider_h.style.opacity = "0";
    setTimeout(() => {
        slider_h.innerHTML = header[current_slide];
        slider_h.style.transition = "0.5s";
        slider_h.style.opacity = "1";
    }, 500);
    let slider_text = document.getElementById("slider__text");
    slider_text.style.opacity = "0";
    setTimeout(() => {
        slider_text.innerHTML = text[current_slide];
        slider_text.style.transition = "0.5s";
        slider_text.style.opacity = "1";
    }, 500);
}

function next_slide() {
    current_slide -= 1;
    if (current_slide < 0) {
        current_slide += 3;
    }
    setup();
}

function prev_slide() {
    current_slide += 1;
    if (current_slide >= 3) {
        current_slide -= 3;
    }
    setup();
}
