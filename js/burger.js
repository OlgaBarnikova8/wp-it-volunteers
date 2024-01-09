let line = document.querySelector('.icon-menu');
let links = document.querySelectorAll('.menu__link');
let menu = document.querySelector('.menu__body');
let overlay = document.querySelector('.burger-menu__overlay');

line.addEventListener('click', toogleMenu);
overlay.addEventListener('click', toogleMenu);

function toogleMenu() {
  line.classList.toggle('active');  
  menu.classList.toggle('active');
  document.body.classList.toggle('lock');   
}
