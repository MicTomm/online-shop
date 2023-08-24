const hamburgerIcon = document.getElementById('hamburger-icon');
const asideMenu = document.getElementById('mobile-menu');

function toggleAsideMenu(){
    //toggle() method => rimuove la classe css se esiste, la aggiunge se non esiste. 
    asideMenu.classList.toggle('open');
}

hamburgerIcon.addEventListener('click', toggleAsideMenu);