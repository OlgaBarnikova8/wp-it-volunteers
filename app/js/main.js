const btn   = document.querySelector('.button');
const hello = document.querySelector('.hello');
const text  = document.querySelector('.text');

btn.addEventListener('click', function () {
	text.innerHTML = 'Hello from Odessa!!!';    
})
