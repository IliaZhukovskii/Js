'use strict';



const appData = {
  title: '',
  screens: '',
  screenPrice: '',
  rollback: 10,
  adaptive: true,
  service1: '',
  service2: '',
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,


  isNumber: function (num) {
    return !isNaN(parseFloat(num) && isFinite(num));
  },

  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice);
    appData.title = appData.getTitle(appData.title);
    appData.logger();
  },

  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Космос");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Мониторы, планшеты, телефоны");

    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?", "5000");
    } while (!appData.isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },


  getAllServicePrices: function () {
    let price = 0;
    let price1 = 0;
    let i = 0;
    do {
      prompt("Какой дополнительный тип услуги нужен?", "Отправка писем");
      price = +prompt("Сколько это будет стоить?", "100");
      while (!appData.isNumber(price)) {
        price = +prompt("Сколько это будет стоить?", "100");
      }
      price1 += price;
      i++;
    } while (i < 2);
    return price1;
  },

  getFullPrice: function (price1, price2) {
    return price1 + price2;
  },

  getTitle: function (str) {
    let words = str.trim().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }

    return words.join(" ");
  },

  getServicePercentPrices: function (price) {
    return Math.round(price - (price * (appData.rollback / 100)));
  },

  getRollbackMessage: function (price) {
    if (price > 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price <= 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else if (price < 0) {
      return "Что то пошло не так";
    }
  },

  logger: function () {
    console.log("Название сайта: " + appData.title);
    console.log("Типы экранов для разработки: " + appData.screens);
    console.log("Стоимость данной работы: " + appData.fullPrice + " $");
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log("Стоимость с учётом отката посреднику: " + appData.getServicePercentPrices(appData.fullPrice) + " $");
    console.log("Стоимость дополнительных услуг: " + appData.allServicePrices + " $");

    for (let key in appData){
      console.log("Ключ: " + key + " Значение: " + appData[key]);
    }
  }

}

appData.start();