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
var btnup = qs('.rodape .botao-up');

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
    playerSection.classList.add('minimized');
    playerSection.classList.toggle('hide');
    btnClosePlayer.classList.toggle('mdi-dock-window');
    btnClosePlayer.classList.toggle('mdi-close');
    btnMinMaxPlayer.classList.remove('mdi-chevron-down');
    btnMinMaxPlayer.classList.add('mdi-chevron-up');
})

btnMinMaxPlayer.addEventListener('click', (event) => {
    event.preventDefault();
    playerSection.classList.remove('hide');
    playerSection.classList.toggle('minimized');
    btnMinMaxPlayer.classList.toggle('mdi-chevron-down');
    btnMinMaxPlayer.classList.toggle('mdi-chevron-up');
    btnClosePlayer.classList.remove('mdi-dock-window');
    btnClosePlayer.classList.add('mdi-close');
})
btnup.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("btnup")
    window.scroll({ top: 0, behavior: 'smooth' });
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
    var d = new Date();
    var diaSemana = d.getDay();
    tabClick.call(qs(`#btn${diaSemana}`));
}

function scroolGrid(grid, tamanho, dir) {
    if (dir) {
        var pos = grid.scrollLeft + tamanho;
    } else {
        var pos = grid.scrollLeft - tamanho;
    }
    //console.log(pos);
    grid.scroll({ left: pos, behavior: 'smooth' })
        //grid.scrollLeft = pos;
        //console.log(document.getElementById('container'))
        //console.log(grid);
}

function resetTabs() {
    Array.from(document.getElementsByClassName("tab")).forEach(function(element) {
        element.classList.remove("active-tab");
    });
    Array.from(document.getElementsByClassName("tab-btn")).forEach(function(element) {
        element.classList.remove("active-btn");
    });

}
var tabClick = function() {
    resetTabs();
    var attribute = this.getAttribute("data-tab");
    document.getElementById(attribute).classList.add("active-tab");
    this.classList.add("active-btn");

};

Array.from(document.getElementsByClassName("tab-btn")).forEach(function(element) {
    element.addEventListener('click', tabClick)
});