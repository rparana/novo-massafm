import player from "./player.js";
import slider from "./slider.js";
import geoLocation from "./geolocation.js";
window.addEventListener("load", player.start());
document.addEventListener("turbolinks:load", function () {
  player.loadPlayer();
  podcasts.updatePodcasts.call(this);
  //document.querySelector('.topo-praca .btn-player').addEventListener('click', loadPlayer);
  docReady();
});

function log(object) {
  var dev = false;
  if (dev) console.log(object);
}

function qs(s) {
  return document.querySelector(s);
}

const playPodcast = (b) => {
  player.reload(b);
};

const pausePodcast = (b) => {
  player.pause();
};

//document.addEventListener('DOMContentLoaded', docReady);

function docReady() {
  var scrollPromoEsq = qs("a.scroll-promo.esq");
  var scrollPromoDir = qs("a.scroll-promo.dir");
  var btnMenu = qs(".nav-toggle");
  var btnClose = qs(".close");
  var btnup = qs(".rodape .botao-up");

  addEvent(btnMenu, "click", toggleMenu);
  // btnMenu.removeEventListener('click', toggleMenu)
  // btnMenu.addEventListener('click', toggleMenu)

  addEvent(btnClose, "click", closeMenu);
  // btnClose.removeEventListener('click', closeMenu);
  // btnClose.addEventListener('click', closeMenu);

  addEvent(btnup, "click", (event) => {
    event.preventDefault();
    log("btnup");
    window.scroll({ top: 0, behavior: "smooth" });
  });

  addEvent(document.querySelector(".topo-praca .btn-player"), "click", loadPlayer);

  addEvent(scrollPromoEsq, "click", scroolGridEsq);
  addEvent(scrollPromoDir, "click", scroolGridDir);
  // scrollPromoEsq.removeEventListener('click', scroolGridEsq)
  // scrollPromoEsq.addEventListener('click', scroolGridEsq)
  // scrollPromoDir.removeEventListener('click', scroolGridDir)
  // scrollPromoDir.addEventListener('click', scroolGridDir)
  var d = new Date();
  var diaSemana = d.getDay();
  var tabSemana = qs(`#btn${diaSemana}`);
  tabSemana !== null ? tabClick.call(tabSemana) : "";
  podcasts.updatePodcasts.call(this);
  Turbolinks.start();

  document.querySelectorAll(".podcast-item-player .controls .btn-play").forEach(function (element) {
    const url = element.querySelector(".track").getAttribute("url");
    const img = element.querySelector(".track").getAttribute("img");
    const title = element.querySelector(".track").getAttribute("title");
    const btnPod = element;
    element.addEventListener("click", (e) => {
      e.preventDefault();
      log(btnPod);
      document.querySelector("#title").setAttribute("value", title);
      document.querySelector("#url").setAttribute("value", url);
      document.querySelector("#img").setAttribute("value", img);
      document.querySelector("#live").setAttribute("value", "false");
      if (btnPod.classList.contains("first")) {
        resetPodcasts();
        btnPod.classList.remove("first");
        playPodcast(btnPod);
      }
    });
  });
  Array.from(document.getElementsByClassName("tab-btn")).forEach(function (element) {
    element.addEventListener("click", tabClick);
  });

  document.querySelectorAll("#list_pracas .list-group-item.list-group-item-action").forEach(function (element) {
    element.addEventListener("click", selectPraca);
  });

  //Modal Selecione a Praça
  document.querySelectorAll(".praca .select").forEach(function (element) {
    element.addEventListener("click", () => {
      qs(".modal-pracas").classList.add("show");
    });
  });
  // qs(".praca .select").addEventListener("click", () => {
  //   qs(".modal-pracas").classList.add("show");
  // });
  window.onclick = function (event) {
    //log(event.target);
    if (event.target == qs(".modal-pracas") || event.target == qs(".modal-pracas .mdi-close")) {
      qs(".modal-pracas").classList.remove("show");
    }
  };
  qs("#filter").addEventListener("keyup", (e) => {
    var val = e.target.value.toUpperCase();
    log(val);
    var list = document.querySelectorAll(".list-group .list-group-item");

    list.forEach(function (element) {
      element.getAttribute("title").toUpperCase().indexOf(val) > -1 ? element.classList.remove("hide") : element.classList.add("hide");
    });
  });

  window.addEventListener("scroll", function (e) {
    var rightsidebar = qs(".right-sidebar .widgets");

    if (!rightsidebar) return;

    // if (window.scrollY > 539) {
    //   rightsidebar.classList.add("fixed");
    // } else {
    //   rightsidebar.classList.remove("fixed");
    // }
  });
  log("pronto");
  checkCookie();
  slider.start();
  getPromotions();

  contact();
} //FIM doReady

function addEvent(obj, event, func) {
  if (obj === null) return;
  obj.removeEventListener(event, func);
  obj.addEventListener(event, func);
}

function toggleMenu(event) {
  event.preventDefault();
  var menu = qs(".menu-topo");
  menu.classList.toggle("active");
}

function closeMenu(event) {
  event.preventDefault();
  var menu = qs(".menu-topo");
  menu.classList.toggle("active");
}

const resetPodcasts = () => {
  document.querySelectorAll(".podcast-item-player .controls .btn-play").forEach(function (element) {
    element.classList.add("first");
    element.classList.add("play");
    element.classList.remove("pause");
  });
};

function scroolGridDir(event) {
  event.preventDefault();
  var listaPromocoes = qs(".promocoes .carrossel-items");
  scroolGrid(listaPromocoes, 360, true);
}

function scroolGridEsq(event) {
  event.preventDefault();
  var listaPromocoes = qs(".promocoes .carrossel-items");
  scroolGrid(listaPromocoes, 360, false);
}

function scroolGrid(grid, tamanho, dir) {
  if (dir) {
    var pos = grid.scrollLeft + tamanho;
  } else {
    var pos = grid.scrollLeft - tamanho;
  }
  //log(pos);
  grid.scroll({ left: pos, behavior: "smooth" });
  //grid.scrollLeft = pos;
  //log(document.getElementById('container'))
  //log(grid);
}

function resetTabs() {
  Array.from(document.getElementsByClassName("tab")).forEach(function (element) {
    element.classList.remove("active-tab");
  });
  Array.from(document.getElementsByClassName("tab-btn")).forEach(function (element) {
    element.classList.remove("active-btn");
  });
}
var tabClick = function () {
  resetTabs();
  var attribute = this.getAttribute("data-tab");
  document.getElementById(attribute).classList.add("active-tab");
  this.classList.add("active-btn");
};

var selectPraca = function (event) {
  event.preventDefault();
  setPraca(this);
  // var pracaID = this.getAttribute("id");
  // var pracaNome = this.getAttribute("title");
  // setCookie("regiao", pracaID, 365);
  // setSession("regiao", pracaID);
  // setCookie("regiao-nome", pracaNome, 365);
  // setSession("regiao-nome", pracaNome);
  // location.reload();
};
var setPraca = function (praca) {
  var pracaID = praca.getAttribute("id");
  var pracaNome = praca.getAttribute("title");
  setCookie("regiao", pracaID, 365);
  setSession("regiao", pracaID);
  setCookie("regiao-nome", pracaNome, 365);
  setSession("regiao-nome", pracaNome);
  location.reload();
};

function loadPlayer() {
  log(this);
  document.querySelector("#title").setAttribute("value", this.getAttribute("data-title"));
  document.querySelector("#url").setAttribute("value", this.getAttribute("data-url"));
  document.querySelector("#img").setAttribute("value", this.getAttribute("data-img"));
  document.querySelector("#live").setAttribute("value", "true");
  resetPodcasts();
  player.pause();
  player.start();
  player.play();
}

function valoresBanner() {
  var banners = document.querySelectorAll(".banner-slide .banner-background");
  log(
    [].map.call(banners, function (item) {
      let banner = {
        id: item.getAttribute("id"),
        title: item.querySelector(".card-title").innerHTML,
        body: item.querySelector(".card-body").innerHTML,
        link: item.querySelector(".card-footer a").getAttribute("href"),
      };
      return banner;
    })
  );
}

function checkCookie() {
  var cookieEnabled = navigator.cookieEnabled;
  log(cookieEnabled);
  if (cookieEnabled) {
    var regiao = getCookie("regiao");
    if (!regiao) {
      geoLocation
        .start()
        .then((response) => {
          setCidade(response);
          //setCidade("CuRitiBa");
        })
        .catch(console.error);
    }
    //document.cookie = "testcookie";
    //cookieEnabled = document.cookie.indexOf("testcookie") != -1;
  }
}

function setCidade(cidade) {
  //var val = e.target.value.toUpperCase();
  log(cidade);
  var list = document.querySelectorAll(".list-group .list-group-item");
  var val = cidade.toUpperCase();
  var filtro = (p) => p.getAttribute("title").toUpperCase().indexOf(val) >= 0;
  var praca = Array.from(list).find(filtro);
  if (praca) {
    setPraca(praca);
  }
}

function setCookie(key, value, expiry) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
  var string = key + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
  document.cookie = string;
}

function getCookie(key) {
  var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}

function setSession(key, value) {
  sessionStorage.setItem(key, value);
}

function getSession(key) {
  return sessionStorage.getItem(key);
}

function eraseCookie(key) {
  var keyValue = getCookie(key);
  setCookie(key, keyValue, "-1");
}

function getPromotions() {
  var size = 0;
  let promoList = qs(".lista-promocoes");
  // let apiGeral = qs("#urlPromoGeral");
  let apiCidade = qs("#urlPromoCidade");
  if (typeof promoList === undefined || !promoList) return;
  // var urlGeral = typeof apiGeral === undefined ? "" : apiGeral.getAttribute("url");
  var urlCidade = typeof apiCidade === undefined ? "" : apiCidade.getAttribute("url");
  // log(urlGeral);
  log(urlCidade);
  // if (urlGeral != "") {
  //   doGet(urlGeral)
  //     .then((response) => {
  //       var items = size > 0 ? response.slice(0, size) : response;
  //       log(response);
  //       log(items);
  //       items.forEach((item) => {
  //         populatePromotionList(item);
  //       });
  //     })
  //     .catch((reject) => {
  //       console.error(reject);
  //     });
  // }
  if (urlCidade != "") {
    doGet(urlCidade)
      .then((response) => {
        var items = size > 0 ? response.slice(0, size) : response;
        log(response);
        log(items);
        response.list.hotsites.forEach((item) => {
          populatePromotionList(item);
        });
      })
      .catch((reject) => {
        console.error(reject);
      });
  }
}

function doGet(url) {
  const promiseCallback = (resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao executar requisição, Status: $(response.status)");
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  };
  return new Promise(promiseCallback);
}

function populatePromotionList(item) {
  /* Estrutura para ser montada
  <li class="promocao-item">
    <div class="box">
      <div class="box-cover">
        <img class="box-shadow radius-10" src="images/01_promocao.png" alt="" />
      </div>
      <div class="box-details">
        <div class="box-details-info">
          <a href="#" class="btn-card">PARTICIPE</a>
        </div>
      </div>
    </div>
  </li>
*/
  let promoList = qs(".lista-promocoes");
  if (typeof promoList === undefined) return;
  var node = document.createElement("LI"); // Create a <li> node
  var box = document.createElement("div"); // Create a <div> node
  var box_cover = document.createElement("div"); // Create a <div> node
  var img_box_cover = document.createElement("img"); // Create a <img> node
  var box_detail = document.createElement("div"); // Create a <div> node
  var box_detail_info = document.createElement("div"); // Create a <div> node
  var link = document.createElement("a"); // Create a <a> node

  //Inserir classes
  node.classList.add("promocao-item");
  box.classList.add("box");
  box_cover.classList.add("box-cover");
  img_box_cover.classList.add("box-shadow", "radius-10");
  box_detail.classList.add("box-details");
  box_detail_info.classList.add("box-details-info");
  link.classList.add("btn-card");

  //preencher itens (imagen e link)
  img_box_cover.setAttribute("src", item.image_url);
  // link.setAttribute("href", item.url);
  link.setAttribute("onclick", `openHotsite('${item.uuid}', '${item.company_uuid}')`);
  link.innerText = "PARTICIPE";

  //montar o item
  box_cover.appendChild(img_box_cover);
  box_detail_info.appendChild(link);
  box_detail.appendChild(box_detail_info);
  box.appendChild(box_cover);
  box.appendChild(box_detail);
  node.appendChild(box); // Append the box to <li>
  promoList.appendChild(node); // Append <li> to <ul>
}
function contact() {
  console.log("Desenvolvido por: Rafael Paraná \n Whatsapp/Telegram: (41) 99879-6809 \n E-mail/Skype: paranafael@yahoo.com.br");
}
