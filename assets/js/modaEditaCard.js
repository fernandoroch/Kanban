export default function fecharModalEdicao() {
const modalBody = document.querySelector('.modal-edicao')
const buttonFechar = document.querySelector('.fechar-modal-edicao')

function fecharModalBody(e){
  if (e.target === this){
    modalBody.classList.add('active-modal')
  }
}
modalBody.addEventListener('click', fecharModalBody)
buttonFechar.addEventListener('click',fecharModalBody)
}