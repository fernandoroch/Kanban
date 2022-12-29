export default function geral() {
  const conteudo = document.querySelector(".conteudo-principal");
  /*  modal que adiciona as comulas*/
  const modalFecharTudo = document.querySelector(".modal-new-coluna");
  const buttonAddColuna = document.querySelector("#adicionar-coluna");
  const inputDefinirName = document.querySelector("#input-name");
  /*    modal descriçaõ dos cards*/
  const modalNewDescrip = document.querySelector(".modal-descrip-new");
  const buttonAddCard = document.querySelector("#card-descri");
  const recebeCards = document.querySelectorAll(".conteudo-principal span");
  /*   modal que edita os cards adcionados*/
  const modalBody = document.querySelector(".modal-edicao");
  const buttonEditarCard = document.querySelector(".editar-card");

  let todasColunas = [
    {
      titulo: "To do",
      card: [],
    },
    {
      titulo: "In progress",
      card: [],
    },
    {
      titulo: "Done",
      card: [],
    },
  ];

  let arrayCards;
  let definirColunaCard;
  let atualizarDomArray = [0, 0, 0];
  let allCards;

  let columnEditar;
  let linhaEditar;

  let columnMove;
  let linhaMove;
  let valueCardMove;

  /*    estruturas das colunas e adicionando colunas  */
  function addConulas() {
    let element = "";
    for (let i = 0; i < 3; i++) {
      arrayCards = todasColunas[i].card.map((item) => {
        return {
          name: item.name,
        };
      });

      element += `
    <div class="card">
     <h2>${todasColunas[i].titulo}</h2>
     <span class="card-add" data-column-soltou='${i}'>
        <p>nenhun card adicionado</p>
        </span>
     <button class="modal-card">+ Adicionr um novo card</button>
    </div>
    `;
    }

    for (let i = 3; i < todasColunas.length; i++) {
      arrayCards = todasColunas[i].card.map((item) => {
        return {
          name: item.name,
        };
      });

      element += `
    <div class="card">
     <h2>${todasColunas[i].titulo}<span class="${i}">X</span></h2>
     <span class="card-add" data-column-soltou='${i}'>
        <p>nenhun card adicionado</p>
      </span>
     <button class="modal-card" >+ Adicionr um novo card</button>
    </div>
    `;
    }

    conteudo.innerHTML = element;
    selecionarColunas();
  }
  addConulas();

  /*   adicionando nova coluna no array de objetos e atualizando a tela*/
  function addColumn(e) {
    let valueInput = inputDefinirName.value;

    if (valueInput) {
      todasColunas.push({ titulo: valueInput, card: [] });
      addConulas();
      modalFecharTudo.classList.add("active-modal");
      inputDefinirName.value = "";
      atualizarDomArray.push(0);
      removendocoluna();
      selecionarColunas();
    } else {
      alert("Defina o nome da nova coluna");
    }
    atualizarDom();
  }

  /*    funções que remove colunas senelionadas*/
  function removendocoluna() {
    let dataColuna = document.querySelectorAll(".card h2 span");
    dataColuna.forEach((e, index) => {
      e.addEventListener("click", (e) => {
        removerColuna(index + 3);
      });
    });
  }

  function removerColuna(e) {
    todasColunas.splice(e, 1);
    addConulas();
    atualizarDomArray.pop();
    atualizarDom();
    removendocoluna();
  }

  /*   adicionar cars nas colunas */
  function selecionarColunas() {
    const modalAddCard = document.querySelectorAll(".card .modal-card");
    modalAddCard.forEach((item, index) => {
      item.addEventListener("click", () => {
        abirModalCards(index);
      });
    });
  }

  function abirModalCards(i) {
    modalNewDescrip.classList.remove("active-modal");
    definirColunaCard = i;
  }

  function addCads() {
    let inputTitle = document.querySelector("#descri").value;

    if (inputTitle) {
      todasColunas[definirColunaCard].card.push({
        name: inputTitle,
      });

      modalNewDescrip.classList.add("active-modal");
      document.querySelector("#descri").value = "";
    } else {
      alert("Defina a descrição de sua tarefa.");
    }
    atualizarDom();
  }

  /*   cria a estrutura de cada card e adiciona eles no DOM*/
  function adicionarCardDom(definirColunaCard) {
    let todosSpan = document.querySelectorAll("span.card-add ");
    let cardArray = todasColunas[definirColunaCard].card;
    let elementCard = "";
    for (let i = 0; i < cardArray.length; i++) {
      elementCard += `
    <div class="all-card" draggable="true" data-column-move="${definirColunaCard}" data-linha-move="${i}" data-value="${cardArray[i].name}">
     <h3>${cardArray[i].name}</h3>
     <span class='editar-card'  data-editar-c="${definirColunaCard}" data-editar-l="${i}" ><img width="17" src="assets/img/editar.png"></span>
     <span class='excluir-card' data-column="${definirColunaCard}" data-linha="${i}" ><img width="17" src="assets/img/excluir.png"></span>
    </div>`;
    }
    todosSpan[definirColunaCard].innerHTML = elementCard;
    verificaElementVazio();
  }

  function verificaElementVazio() {
    let allColumns = document.querySelectorAll(".card-add");
    if (allColumns[definirColunaCard].innerHTML === "") {
      allColumns[definirColunaCard].innerHTML =
        " <p>nenhun card adicionado</p>";
    }
  }

  /*   atualiza os cars de coluna toda vez que a função principal é executada*/
  function atualizarDom() {
    for (let i = 0; i < atualizarDomArray.length; i++) {
      definirColunaCard = i;
      adicionarCardDom(i);
    }
    selecionarCards();
    secionarEdicao();
    adicionaEventoMove();
    selecionarAreaMove();
  }

  /*   excluir os cards adicionados  */
  function selecionarCards() {
    allCards = document.querySelectorAll(".excluir-card");
    allCards.forEach((item) => {
      item.addEventListener("click", () => {
        excluirCards(item);
      });
    });
  }

  function excluirCards(item) {
    let column = item.getAttribute("data-column");
    let linha = item.getAttribute("data-linha");

    todasColunas[column].card.splice(linha, 1);
    atualizarDom();
  }

  /*   editar os cards que ja foi adicionado   */

  function secionarEdicao() {
    let editarCards = document.querySelectorAll(".all-card .editar-card");

    editarCards.forEach((item) =>
      item.addEventListener("click", () => {
        abrirModalEdicao(item);
      })
    );
  }

  function abrirModalEdicao(item) {
    modalBody.classList.remove("active-modal");
    columnEditar = item.getAttribute("data-editar-c");
    linhaEditar = item.getAttribute("data-editar-l");
  }

  function atualizarCards() {
    let valorinput = document.querySelector("#descriEditar").value;
    modalBody.classList.add("active-modal");
    document.querySelector("#descriEditar").value = "";

    todasColunas[columnEditar].card[linhaEditar].name = valorinput;
    atualizarDom();
  }

  /*   movimentando cards entre as colunas   */

  function adicionaEventoMove() {
    document.querySelectorAll(".all-card").forEach((e) => {
      e.addEventListener("dragstart", () => {
        dragStart(e);
      });
      e.addEventListener("dragend", () => {
        dragEnd(e);
      });
    });
  }

  function dragStart(e) {
    columnMove = e.getAttribute("data-column-move");
    linhaMove = e.getAttribute("data-linha-move");
    valueCardMove = e.getAttribute("data-value");
    e.classList.add("dragging");
  }

  function dragEnd(e) {
    verificaElementVazio();
    atualizarDom();
    e.classList.remove("dragging");
  }

  function selecionarAreaMove() {
    document.querySelectorAll(".card-add").forEach((area) => {
      area.addEventListener("drop", drop);
      area.addEventListener("dragleave", dragLeave);
      area.addEventListener("dragover", dragOver);
    });
  }

  function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("hover");
  }

  function dragLeave(e) {
    e.currentTarget.classList.remove("hover");
  }

  function drop(e) {
    let dragArea = document.querySelector(".all-card.dragging");
    e.currentTarget.appendChild(dragArea);
    e.currentTarget.classList.remove("hover");
    todasColunas[columnMove].card.splice(linhaMove, 1);

    let columnSoltou = e.currentTarget.getAttribute("data-column-soltou");
    let todalAsColunas = document.querySelectorAll(".card");
    let columnDefinida = todalAsColunas[columnSoltou].querySelectorAll("h3");
    todasColunas[columnSoltou].card = [];

    for (let i = 0; i < columnDefinida.length; i++) {
      todasColunas[columnSoltou].card.push({
        name: columnDefinida[i].innerHTML,
      });
    }
    atualizarDom();
  }

  buttonAddCard.addEventListener("click", addCads);
  buttonAddColuna.addEventListener("click", addColumn);
  buttonEditarCard.addEventListener("click", atualizarCards);
}
