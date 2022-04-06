'use strict';



const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  rollback: 10,
  adaptive: true,
  services: {},
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,


  isNumber: function (num) {
    return !isNaN(parseFloat(num) && isFinite(num));
  },

  isString: function (string) {
    return !string.match(/^\d+$/);
  },

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getServicePercentPrices(appData.fullPrice);
    appData.getTitle(appData.title);
    appData.logger();
  },

  asking: function () {

    do {
      appData.title = prompt("Как называется ваш проект?", "Космос");
    } while (!appData.isString(appData.title));


    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;
      do {
        name = prompt("Какие типы экранов нужно разработать?", "Мониторы");
      } while (!appData.isString(name));

      do {
        price = +prompt("Сколько будет стоить данная работа?", "10000");
      } while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name: name,
        price: price
      });
    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt("Какой дополнительный тип услуги нужен?", "Отправка писем");
      } while (!appData.isString(name));
    
      do {
        price = prompt("Сколько это будет стоить?", "100");
      } while (!appData.isNumber(price));

      appData.services[[i] + ": " + name] = +price;
   
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function () {
    /* for (let screen of appData.screens) {
      appData.screenPrice += screen.price;
    }  */

    appData.screenPrice = appData.screens.reduce(function(a, screen){
      return appData.screenPrice += screen.price;
    }, 0);
   
  
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }

  },

  getFullPrice: function (price1, price2) {
    appData.fullPrice = price1 + price2;
  },

  getTitle: function (str) {
    let words = str.trim().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }

    appData.title = words.join(" ");
  },

  getServicePercentPrices: function (price) {
    appData.servicePercentPrice = Math.round(price - (price * (appData.rollback / 100)));
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
    console.log("Стоимость данной работы: " + appData.fullPrice + " $");
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log("Стоимость с учётом отката посреднику: " + appData.servicePercentPrice + " $");
    console.log("Стоимость дополнительных услуг: " + appData.allServicePrices + " $");


    /* for (let key in appData) {
      console.log("Ключ: " + key + " Значение: " + appData[key]);
    } */
  }

};

appData.start();