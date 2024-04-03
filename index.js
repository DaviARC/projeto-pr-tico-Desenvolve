let lista = document.querySelector(".cont-nav");
let nav = document.querySelector(".nav");
let sombra = document.querySelector(".sombra");
let menuFechado = document.querySelector(".menu-fechado");
let menuHeader = document.querySelector(".menu-header");

let itemNav = document.querySelector(".item-nav-prod");
let hover = document.querySelector(".item-desktop-hover")

function verificaOpen(){
    if(lista.classList.contains('open')){
        lista.classList.remove('open');
        sombra.classList.remove('open');
        menuFechado.style.display="none";
        menuHeader.style.display="block";
        nav.style.display = "none";
    }
    else
    {
        lista.classList.add('open');
        sombra.classList.add('open');
        menuHeader.style.display="none";
        menuFechado.style.display="block";
        nav.style.display = "block";
    }
}
menuHeader.addEventListener('click', verificaOpen);
menuFechado.addEventListener('click', verificaOpen);
itemNav.addEventListener("mouseover", () => {
    hover.style.display = "block"
})
itemNav.addEventListener("mouseout", () => {
    hover.style.display = "none"
})

const swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 100,
});