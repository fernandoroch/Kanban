const conteudo = document.querySelector(".conteudo-principal");
/*  Abre e fecha modals  */
const modalFechar = document.querySelector(".modal-coluna");
const modalFecharTudo = document.querySelector(".modal-new-coluna");
const buttonFecharModal = document.querySelector(".fechar-modal");
const modalNovaColuna = document.querySelector(".modal-nova-coluna");
const buttonAddColuna = document.querySelector("#adicionar-coluna");

const inputDefinirName = document.querySelector("#input-name");
const modalNewDescrip = document.querySelector(".modal-descrip-new");
const modalDescri = document.querySelector(".fechar-modal-descri");
const fecharModalBody = document.querySelector(".coluna-descrip");
const buttonAddCard = document.querySelector('#card-descri')
/**/
const recebeCards = document.querySelectorAll(".conteudo-principal span");

let todasColunas = [
  {
    titulo: "To do",
    card: [{ name: "cozinhar", descr: "almoço" }],
  },
  {
    titulo: "In progress",
    card: [{ name: "lavar o carro", descr: "o pre e o branco" }],
  },
  {
    titulo: "Done",
    card: [{ name: "lipar a casa", descr: "apena a sala e a cazinha" }],
  },
];

let arrayCards
let definirColunaCard 
/*    Adicionar e remover colunas   */
function addConulas() {
  let element = "";
  for (let i = 0; i < 3; i++) {
     arrayCards = todasColunas[i].card.map((item) => {
      return {
        name: item.name,
        descr: item.descr,
      };
    });

    element += `
    <div class="card">
     <h2>${todasColunas[i].titulo}</h2>
     <span class="card-add ">
        <p>nenhun card adicionado</p>
        </span>
     <button onclick="abirModalCards(${i})">+ Adicionr um novo card</button>
    </div>
    `;
  }

  for (let i = 3; i < todasColunas.length; i++) {
    arrayCards = todasColunas[i].card.map((item) => {
      return {
        name: item.name,
        descr: item.descr,
      };
    });

    element += `
    <div class="card">
     <h2>${todasColunas[i].titulo}<span onclick="removerColuna(${i})">X</span></h2>
     <span class="card-add ">
        <p>nenhun card adicionado</p>
      </span>
     <button onclick="abirModalCards(${i})">+ Adicionr um novo card</button>
    </div>
    `;
  }
  
  conteudo.innerHTML = element;
}
addConulas();

function removerColuna(i) {
  todasColunas.splice(i, 1);
  addConulas();
}

function modalNewColuna() {
  modalFecharTudo.classList.remove("active-modal");
}

function fechaModal(e) {
  if (e.target === this) {
    modalFecharTudo.classList.add("active-modal");
  }
}

function fecharModaAddcolumn(e) {
  let valueInput = inputDefinirName.value;
  console.log();
  todasColunas.push({ titulo: valueInput, card: [] });

  modalFecharTudo.classList.add("active-modal");
  addConulas();
  inputDefinirName.value = "";
}

/*   adicionar cars nas colunas */

function fecharModalDescri(e) {
  if (e.target === this) {
    modalNewDescrip.classList.add("active-modal");
  }
}

function abirModalCards(i) {
  modalNewDescrip.classList.remove("active-modal");
  definirColunaCard = i
}

function addCads() {
  let inputTitle = document.querySelector('#input-title').value
  let inputDescri = document.querySelector('#descri').value

  todasColunas[definirColunaCard].card.push({ name: inputTitle, descr:inputDescri})

  modalNewDescrip.classList.add("active-modal");
  document.querySelector('#input-title').value = ''
  document.querySelector('#descri').value = ''
  addConulas()
}

/*   Eventos adicionar e remover colunas*/

modalFechar.addEventListener("click", fechaModal);
buttonFecharModal.addEventListener("click", fechaModal);
modalDescri.addEventListener("click", fecharModalDescri);
fecharModalBody.addEventListener("click", fecharModalDescri);
modalNovaColuna.addEventListener("click", modalNewColuna);
buttonAddColuna.addEventListener("click", fecharModaAddcolumn);
buttonAddCard.addEventListener('click', addCads)
