'use strict';

let title;
let screens;
let screenPrice;
let rollback = 10;
let adaptive;

let service1;
let service2;

let fullPrice;

let allServicePrices = 0;
let servicePercentPrice = 0;


function isNumber(num) {
  return !isNaN(parseFloat(num) && isFinite(num));
}

function asking() {
  title = prompt("Как называется ваш проект?", "Космос");
  screens = prompt("Какие типы экранов нужно разработать?", "Мониторы, планшеты, телефоны");

  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?", "5000");
  } while (!isNumber(screenPrice));
  adaptive = confirm("Нужен ли адаптив на сайте?");
}

function getAllServicePrices() {
  let price = 0;
  let price1 = 0;
  let i = 0;
  do {
    prompt("Какой дополнительный тип услуги нужен?", "Отправка писем");
    price = +prompt("Сколько это будет стоить?", "100");
    while (!isNumber(price)) {
      price = +prompt("Сколько это будет стоить?", "100");
    }
    price1 += price;
    i++;
  } while (i < 2);
  return price1;
}

function showTypeOf(variable) {
  console.log("Тип: " + variable, typeof variable);
}

function getFullPrice(price1, price2) {
  return price1 + price2;
}

function getTitle(str) {
  let words = str.trim().split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
  }

  return words.join(" ");
}

function getServicePercentPrices(price) {
  return Math.round(price - (price * (rollback / 100)));
}

function getRollbackMessage(price) {
  if (price > 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price <= 30000) {
    return "Даем скидку в 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else if (price < 0) {
    return "Что то пошло не так";
  }
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice);
title = getTitle(title);


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
showTypeOf(allServicePrices);
showTypeOf(servicePercentPrice);
showTypeOf(fullPrice);
showTypeOf(service1);
showTypeOf(service2);
showTypeOf(rollback);
showTypeOf(screens);


console.log("Типы экранов для разработки: " + screens);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость за вычетом процента отката посреднику: " + getServicePercentPrices(fullPrice) + " $");
console.log("Стоимость дополнительных услуг: " + allServicePrices + " $");