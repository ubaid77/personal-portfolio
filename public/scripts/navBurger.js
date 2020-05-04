const burger = document.querySelector('.burger');
const header = document.querySelector('.nav-links');
const headerLinks = document.querySelectorAll('.nav-links li');


burger.addEventListener('click', ()=>{
    header.classList.toggle('open');
    burger.classList.toggle('toggle');
    
})