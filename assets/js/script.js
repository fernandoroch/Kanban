const conteudo = document.querySelector("#conteudo-adicionado");
const novaColuna = document.querySelector('.add-coluna')
const elementFecharM = document.querySelector('.fechar-modal')
const modalFechar = document.querySelector('.modal-coluna')
const modalFecharTudo = document.querySelector('.modal-new-coluna')
const buttonFecharModal = document.querySelector('.fechar-modal')

let todasColunas = [];

function addConulas() {
  let element = "";
  for (let i = 0; i < todasColunas.length; i++) {
    element += `
    <div class="tarefas-feitas">
     <h2>${todasColunas[i].name}</h2>
     <p>nenhun card</p>
     <button>+ Adicionr um novo card</button>
    </div>
    `;
  }
  conteudo.innerHTML = element
}

function modalNewColuna(){
  modalFecharTudo.classList.remove('active-modal')
}

function fechaModal(e) {
  if (e.target === this) {
    modalFecharTudo.classList.add('active-modal')
  }
}

novaColuna.addEventListener('click', modalNewColuna)
modalFechar.addEventListener('click', fechaModal )
buttonFecharModal.addEventListener('click', fechaModal)
