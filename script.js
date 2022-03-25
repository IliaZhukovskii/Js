

let title = "lesson02";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 20;
let rollback = 10;
let fullPrice = 50;
let adaptive = true;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов" +" " + screenPrice +" " + "рублей/ долларов/гривен/юани \nСтоимость разработки сайта" +" " + fullPrice + " "+ "рублей/ долларов/гривен/юани");
screens = screens.toLowerCase();
console.log(screens.split(' '));
console.log("Процент отката посреднику за работу" + " " + fullPrice * (rollback / 100));