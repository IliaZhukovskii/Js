'use strict';
//Получение элементов в переменные
let book = document.querySelectorAll(".book");
let h2 = document.querySelectorAll("h2 > a");
let adv = document.querySelectorAll("div");
let book2 = book[0].querySelectorAll("ul > li");
let book5 = book[5].querySelectorAll("ul > li");
let book6 = book[2].querySelectorAll("ul > li");


//Восстановление порядка книг
book[1].after(book[0]);
book[0].after(book[4]);
book[5].after(book[2]);

//Замена картинки заднего фона
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//Исправление заголовка в книге 3
h2[4].textContent = "Книга 3. this и Прототипы Объектов";

//Удаление рекламы
adv[6].remove(); 

//Восстановление порядка глав во 2 книге
book2[9].after(book2[2]);
book2[3].after(book2[6]);
book2[6].after(book2[8]);

//Восстановление порядка глав в 5 книге
book5[1].after(book5[9]);
book5[4].after(book5[2]);
book5[2].after(book5[6]);
book5[6].after(book5[7]);

//Добавление главы в 6 книгу
let newElem = document.createElement("li");
newElem.textContent = "Глава 8: За пределами ES6";
book6[8].after(newElem);


