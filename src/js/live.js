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

document.addEventListener("DOMContentLoaded", docReady);
function docReady() {
  listarProgramacao();
  setInterval(() => {
    console.log("update");
    listarProgramacao();
  }, 60000);
}

function listarProgramacao() {
  const listaProgramacao = document.querySelector("#programacaoList");
  if (null === listaProgramacao) return;
  const url = listaProgramacao.getAttribute("url").replace("http:", "https:") + "?limit=6";
  if (!url) return;
  listaProgramacao.innerHTML = "";
  doGet(url)
    .then((response) => {
      response.forEach((item) => {
        preencherProgramacao(item);
      });
    })
    .catch((reject) => {
      console.error(reject);
    });
}

function preencherProgramacao(programa) {
  /*
        <li class="liveon">
            <a class="program-link" href="https://www.redemassa.com.br/programas/salada-mista/">
                <div class="program-time">
                    14:00 
                    <div class="live" style="background-color: red;">
                        <span class="mdi mdi-access-point"></span>
                        Ao vivo
                    </div>
                </div>
                <div class="program-name">Salada Mista</div>
            </a>
        </li>
  */
  var live = "";

  const listaProgramacao = document.querySelector("#programacaoList");
  if (null === listaProgramacao) return;
  var node = document.createElement("LI"); // Create a <li> node
  var link = document.createElement("a");
  var hora = document.createElement("div");
  var nome = document.createElement("div");

  var conteudoDivHora = `<i>${programa.inicio}</i>`;

  if (programa.aovivo) {
    conteudoDivHora += '<div class="live" style="background-color: red;">';
    conteudoDivHora += '  <span class="mdi mdi-access-point"></span>Ao vivo';
    conteudoDivHora += "</div>";
  }

  //Inserir classes
  if (programa.aovivo) node.classList.add("liveon");
  link.classList.add("program-link");
  hora.classList.add("program-time");
  nome.classList.add("program-name");

  //Inserir atributos
  link.setAttribute("href", programa.link);

  //Montar Elementos
  hora.innerHTML = conteudoDivHora;
  nome.innerText = programa.nome;

  link.appendChild(hora);
  link.appendChild(nome);
  node.appendChild(link);
  listaProgramacao.appendChild(node);
}
