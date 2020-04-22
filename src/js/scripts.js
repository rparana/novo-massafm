import player from "./player.js"
import slider from "./slider.js"
window.addEventListener("load", player.start());
document.addEventListener("turbolinks:load", function() {
    player.loadPlayer();
    podcasts.updatePodcasts.call(this);
    document.querySelector('.topo-praca .btn-player').addEventListener('click', loadPlayer);
    docReady();
    slider.start();
})

function qs(s) { return document.querySelector(s) }

const playPodcast = (b) => {
    player.reload(b);
}

const pausePodcast = (b) => {
    player.pause();
}
var scrollPromoEsq = qs('a.scroll-promo.esq');
var scrollPromoDir = qs('a.scroll-promo.dir');
var listaPromocoes = qs('.promocoes .carrossel-items');
var btnMenu = qs('.nav-toggle');
var btnClose = qs('.close');
var menu = qs('.menu-topo');
var btnup = qs('.rodape .botao-up');

//document.addEventListener('DOMContentLoaded', docReady);

function docReady() {



    btnMenu.removeEventListener('click', toggleMenu)
    btnMenu.addEventListener('click', toggleMenu)

    btnClose.removeEventListener('click', closeMenu);
    btnClose.addEventListener('click', closeMenu);
    btnup.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("btnup")
        window.scroll({ top: 0, behavior: 'smooth' });
    })


    scrollPromoEsq.removeEventListener('click', scroolGridEsq)
    scrollPromoEsq.addEventListener('click', scroolGridEsq)
    scrollPromoDir.removeEventListener('click', scroolGridDir)
    scrollPromoDir.addEventListener('click', scroolGridDir)
    var d = new Date();
    var diaSemana = d.getDay();
    tabClick.call(qs(`#btn${diaSemana}`));
    podcasts.updatePodcasts.call(this);
    Turbolinks.start()

    document.querySelectorAll(".podcast-item-player .controls .btn-play").forEach(function(element) {
        const url = element.querySelector('.track').getAttribute("url");
        const title = element.querySelector('.track').getAttribute("title");
        const btnPod = element;
        element.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(btnPod)
            document.querySelector('#title').setAttribute("value", title);
            document.querySelector('#url').setAttribute("value", url);
            document.querySelector('#img').setAttribute("value", "images/logo_podcasts.png");
            document.querySelector('#live').setAttribute("value", "false");
            if (btnPod.classList.contains("first")) {
                resetPodcasts();
                btnPod.classList.remove('first')
                playPodcast(btnPod);
            }
        })
    });
    Array.from(document.getElementsByClassName("tab-btn")).forEach(function(element) {
        element.addEventListener('click', tabClick)
    });

    //Modal Selecione a Praça
    qs(".praca .select").addEventListener('click', () => { qs(".modal-pracas").classList.add('show') })
    window.onclick = function(event) {
        //console.log(event.target);
        if (event.target == qs(".modal-pracas") || event.target == qs(".modal-pracas .mdi-close")) {
            qs(".modal-pracas").classList.remove('show');
        }
    };
    qs("#filter").addEventListener('keyup', (e) => {
        var val = e.target.value.toUpperCase();
        console.log(val)
        var list = document.querySelectorAll(".list-group .list-group-item");

        list.forEach(function(element) {
            element.getAttribute("title").toUpperCase().indexOf(val) > -1 ?
                element.classList.remove('hide') : element.classList.add('hide')
        });
    })

    console.log("pronto")
}

function toggleMenu(event) {
    event.preventDefault();
    menu.classList.toggle('active');
}

function closeMenu(event) {
    event.preventDefault();
    menu.classList.toggle('active');
}

const resetPodcasts = () => {
    document.querySelectorAll(".podcast-item-player .controls .btn-play").forEach(function(element) {
        element.classList.add('first');
        element.classList.add('play');
        element.classList.remove('pause');
    })
}

function scroolGridDir(event) {
    event.preventDefault();
    scroolGrid(listaPromocoes, 360, true);
}

function scroolGridEsq(event) {
    event.preventDefault();
    scroolGrid(listaPromocoes, 360, false);
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


function loadPlayer() {
    console.log(this)
    document.querySelector('#title').setAttribute("value", this.getAttribute("data-title"));
    document.querySelector('#url').setAttribute("value", this.getAttribute("data-url"));
    document.querySelector('#img').setAttribute("value", this.getAttribute("data-img"));
    document.querySelector('#live').setAttribute("value", "true");
    resetPodcasts();
    player.pause();
    player.start();
    player.play();

}


function valoresBanner() {
    var banners = document.querySelectorAll('.banner-slide .banner-background');
    console.log(
        [].map.call(banners, function(item) {
            let banner = {
                id: item.getAttribute('id'),
                title: item.querySelector('.card-title').innerHTML,
                body: item.querySelector('.card-body').innerHTML,
                link: item.querySelector('.card-footer a').getAttribute('href')
            }
            return banner;
        })
    )
}