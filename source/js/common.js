'use strict';

var navMain = document.querySelector(".main-nav");
var navButtonMenu = document.querySelector(".button-menu--top");

navMain.classList.remove("main-nav--nojs");
navButtonMenu.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

var navService = document.querySelector(".services-nav");
var navServiceMenu = document.querySelector(".button-menu--middle");

navService.classList.remove("services-nav--nojs");
navServiceMenu.addEventListener("click", function () {
  if (navService.classList.contains("services-nav--closed")) {
    navService.classList.remove("services-nav--closed");
    navService.classList.add("services-nav--opened");
  } else {
    navService.classList.add("services-nav--closed");
    navService.classList.remove("services-nav--opened");
  }
});

var telForm = document.querySelector('.form__phone');
var testButton = document.querySelector(".form__button");
if (testButton) {
  testButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (!telForm.value) {
      swal({
        type: 'error',
        text: 'Заполните обязательное поле: номер телефона'
      });
  } else {
    swal("Ваша заявка отправлена!");
    }
  });
}
