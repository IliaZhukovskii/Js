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
let inputDisabled = [];

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
    this.test();
    this.addTitle();
    this.range();
    startBtn.addEventListener('click', this.start);
    buttonPlus.addEventListener('click', this.addScreenBlock);
    resetBtn.addEventListener('click', this.reset);
  },

  //Запуск методов
  start: function () {
    const newAddScreens = appData.addScreens.bind(appData);
    newAddScreens();
    const newAddServices = appData.addServices.bind(appData);
    newAddServices();
    const newAddPrices = appData.addPrices.bind(appData);
    newAddPrices();
    const newShowResult = appData.showResult.bind(appData);
    newShowResult();
    const newDisplayStart = appData.displayStart.bind(appData);
    newDisplayStart();
  },

  //Проверка пустых полей
  test: function () {
    screens = document.querySelectorAll('.screen');
    startBtn.disabled = false;
    for (let item of screens) {
      let select = item.querySelector('select');
      let input = item.querySelector('input');

      select.addEventListener('input', this.test);
      input.addEventListener('input', this.test);

      if (select.value == "" || input.value == "") {
        startBtn.disabled = true;
        return;
      }
    }
  },

  //Метод блокировки всех input и select
  displayStart: function () {
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    buttonPlus.disabled = true;

    screens = document.querySelectorAll('.screen');
    let inputText = document.querySelectorAll('input[type=text]');
    //Записал заблокированные input в массив, что бы потом разблокировать только эти
    inputText.forEach((item) => {
      if (item.disabled == false) {
        item.disabled = true;
        inputDisabled.push(item);
      }
    });

    screens.forEach((item) => {
      let select = item.querySelector('select');
      select.disabled = true;
    });
  },

  //Выбор экранов
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      let select = screen.querySelector('select');
      let input = screen.querySelector('input');
      let selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value
      });

      //Запись экранов в массив для дльнейшего подсчета
      if (select.value !== "") {
        this.countScreensArr.push(+input.value);
      }
    });
  },

  //Выбор дополнительных функций
  addServices: function () {
    //В процентах
    percent.forEach((item) => {
      let check = item.querySelector('input[type=checkbox]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    //В числах
    number.forEach((item) => {
      let check = item.querySelector('input[type=checkbox]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  //Добавление экранов
  addScreenBlock: function () {
    let cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  //Отслеживание range
  range: function () {
    let rangeSpan = () => {
      rangeValue.textContent = range.value + "%";
      this.rollback = range.value;
    };

    range.addEventListener('input', rangeSpan);
  },

  //Вывод результатов
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicesPercentPrices;
    totalCount.value = this.countScreens;
  },

  //Расчёты
  addPrices: function () {

    for (let screen of this.screens) {
      this.screenPrice += screen.price;
    }
    this.screens = [];

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicesPercentPrices = this.fullPrice - (this.fullPrice * (this.rollback / 100));

    this.countScreens = this.countScreensArr.reduce((a, b) => {
      return a + b;
    }, 0);
    this.countScreensArr = [];
  },

  //Сброс
  reset: function () {
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    buttonPlus.disabled = false;

    inputDisabled.forEach((item) => {
      item.disabled = false;
      item.value = "";
    });

    screens.forEach((item, index) => {
      let select = item.querySelector('select');
      select.disabled = false;
      select.value = "";
      if (index !== 0) {
        item.remove();
      }
    });

    let inputCheckbox = document.querySelectorAll('input[type=checkbox]');
    inputCheckbox.forEach((item) => {
      item.checked = false;
    });

    //Сброс range и результатов
    range.value = 0;
    rangeValue.textContent = 0 + "%";
    total.value = "0";
    totalCountOther.value = "0";
    fullTotalCount.value = "0";
    totalCountRollback.value = "0";
    totalCount.value = "0";

    appData.default.call(appData);

  },

  default: function () {
    this.screens = [];
    this.screenPrice = 0;
    this.rollback = 10;
    this.adaptive = true;
    this.services = {};
    this.fullPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicePrices = 0;
    this.servicesPercentPrices = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.countScreensArr = [];
    this.countScreens = 0;
  },

  //Изменение названия документа
  addTitle: function () {
    document.title = title.textContent;
  },

  //Вывод в консоль
  logger: function () {
    console.log("Название сайта: " + this.title);
    console.log("Стоимость данной работы: " + this.fullPrice + " $");
    console.log(appData.getRollbackMessage(this.fullPrice));
    console.log("Стоимость с учётом отката посреднику: " + this.servicePricesPercent + " $");
    console.log("Стоимость дополнительных услуг: " + this.allServicePrices + " $");
  }
};

appData.init();


