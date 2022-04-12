'use strict';

//Получение переменных со страницы
let title = document.getElementsByTagName('h1')[0];
let buttonPlus = document.querySelector('.screen-btn');
let percent = document.querySelectorAll('.other-items.percent');
let number = document.querySelectorAll('.other-items.number');

let range = document.querySelector('.rollback input');
let rangeValue = document.querySelector('.rollback .range-value');

let startBtn = document.getElementsByClassName('handler_btn')[0];
let resetBtn = document.getElementsByClassName('handler_btn')[1];

let total = document.getElementsByClassName('total-input')[0];
let totalCount = document.getElementsByClassName('total-input')[1];
let totalCountOther = document.getElementsByClassName('total-input')[2];
let fullTotalCount = document.getElementsByClassName('total-input')[3];
let totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {

  //Переменные объекта
  title: '',
  screens: [],
  screenPrice: 0,
  rollback: 10,
  adaptive: true,
  services: {},
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePrices: 0,
  servicesPercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  countScreensArr: [],
  countScreens: 0,

  //Запуск методов
  init: function () {
    startBtn.disabled = true;
    appData.test();
    appData.addTitle();
    appData.range();
    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);
  },

  //Запуск методов
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    /*  appData.logger(); */
    appData.showResult();
  },

  //Проверка пустых полей
  test: function () {
    screens = document.querySelectorAll('.screen'); 
    for (let item of screens){
      let select = item.querySelector('select');
      let input = item.querySelector('input');
      if (select.value == "" || input.value == "") {
        startBtn.disabled = false;
        return  startBtn.disabled;
      }
    }
  },
  
  //Изменение названия документа
  addTitle: function () {
    document.title = title.textContent;
  },

  //Выбор экранов
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, index) {
      let select = screen.querySelector('select');
      let input = screen.querySelector('input');
      let selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value
      });

      //Запись экранов в массив для дльнейшего подсчета
      if (select.value !== "") {
        appData.countScreensArr.push(selectName);
      }
    });
  },

  //Выбор дополнительных функций
  addServices: function () {
    //В процентах
    percent.forEach(function (item) {
      let check = item.querySelector('input[type=checkbox]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    //В числах
    number.forEach(function (item) {
      let check = item.querySelector('input[type=checkbox]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  //Добавление экранов
  addScreenBlock: function () {
    let cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    appData.test();
  },

  //Отслеживание range
  range: function () {
    let rangeSpan = function () {
      rangeValue.textContent = range.value + "%";
      appData.rollback = range.value;
    };

    range.addEventListener('input', rangeSpan);
  },

  //Вывод результатов
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicesPercentPrices;
    totalCount.value = appData.countScreens;
  },

  //Расчёты
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.servicesPercentPrices = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

    for (let i = 0; i <= appData.countScreensArr.length; i++) {
      appData.countScreens = i;
    }
  },

  //Вывод в консоль
  logger: function () {
    console.log("Название сайта: " + appData.title);
    console.log("Стоимость данной работы: " + appData.fullPrice + " $");
    console.log(appData.getRollbackMessage(appData.fullPrice));
    console.log("Стоимость с учётом отката посреднику: " + appData.servicePricesPercent + " $");
    console.log("Стоимость дополнительных услуг: " + appData.allServicePrices + " $");
  }
};

appData.init();