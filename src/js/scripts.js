var scrollPromoEsq = document.querySelector('a.scroll-promo.esq');
var scrollPromoDir = document.querySelector('a.scroll-promo.dir');
var listaPromocoes = document.querySelector('.promocoes .carrossel-items');
var btnMenu = document.querySelector('.nav-toggle');
var btnClose = document.querySelector('.close');
var header = document.querySelector('.header');
var menu = document.querySelector('.menu-topo');

btnMenu.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('active');
})

btnClose.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('active');
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