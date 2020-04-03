import player from "./player.js";

function qs(s) { return document.querySelector(s) }

var scrollPromoEsq = qs('a.scroll-promo.esq');
var scrollPromoDir = qs('a.scroll-promo.dir');
var listaPromocoes = qs('.promocoes .carrossel-items');
var btnMenu = qs('.nav-toggle');
var btnClose = qs('.close');
var playerSection = qs('.section.player');
var btnMinMaxPlayer = qs('.btn-min-max');
var btnClosePlayer = qs('.operate-box .btn-close');
var menu = qs('.menu-topo');

btnMenu.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('active');
})

btnClose.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('active');
})
btnClosePlayer.addEventListener('click', (event) => {
    event.preventDefault();
    playerSection.style = 'display: none;';
})

btnMinMaxPlayer.addEventListener('click', (event) => {
    event.preventDefault();
    playerSection.classList.toggle('minimized');
    btnMinMaxPlayer.classList.toggle('mdi-chevron-down');
    btnMinMaxPlayer.classList.toggle('mdi-chevron-up');
})


document.addEventListener('DOMContentLoaded', docReady);

function docReady() {
    console.log("pronto")
    scrollPromoEsq.addEventListener('click', (event) => {
        event.preventDefault();
        scroolGrid(listaPromocoes, 360, false);
    })
    scrollPromoDir.addEventListener('click', (event) => {
        event.preventDefault();
        scroolGrid(listaPromocoes, 360, true);
    })
}

function scroolGrid(grid, tamanho, dir) {
    if (dir) {
        var pos = grid.scrollLeft + tamanho;
    } else {
        var pos = grid.scrollLeft - tamanho;
    }
    console.log(pos);
    grid.scroll({ left: pos, behavior: 'smooth' })
        //grid.scrollLeft = pos;
    console.log(document.getElementById('container'))
    console.log(grid);
}