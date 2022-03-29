'use strict';

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");

let rollback = 10;

let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let allServicePrices = 0;
let servicePercentPrice = 0;


function showTypeOf(variable){
  console.log(variable, typeof variable);
}

const getAllServicePrices = function(){
  allServicePrices = servicePrice1 + servicePrice2;
  return allServicePrices;
}

function getFullPrice(price1, price2){
  fullPrice = price1 + price2;
  return fullPrice;
}

function getTitle(str){
  let words = str.trim().split(" ");

  for (let i = 0; i < words.length; i++) { 
    words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
   }

  return words.join(" ");
}

function getServicePercentPrices(price){
  servicePercentPrice = Math.round(price - (price * (rollback / 100)));
  return servicePercentPrice;
}

function getRollbackMessage (price){
  if (price > 30000){
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price <=30000){
    return "Даем скидку в 5%";
  } else if (price < 15000 && price >=0){ 
    return "Скидка не предусмотрена";
  } else if(price < 0){
    return "Что то пошло не так";
  }
}


getAllServicePrices();
getFullPrice(screenPrice, allServicePrices);


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);


console.log("Типы экранов для разработки: " + screens);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость за вычетом процента отката посреднику: " + getServicePercentPrices(fullPrice) + " $");






