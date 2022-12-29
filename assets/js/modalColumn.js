export default function modalColumns() {
  const modalFecharTudo = document.querySelector(".modal-new-coluna");
  const modalFechar = document.querySelector(".modal-coluna");
  const buttonFecharModal = document.querySelector(".fechar-modal");
  const modalNovaColuna = document.querySelector(".modal-nova-coluna");

  function modalNewColuna() {
    modalFecharTudo.classList.remove("active-modal");
  }

  function fechaModal(e) {
    if (e.target === this) {
      modalFecharTudo.classList.add("active-modal");
      
    }
  }

  buttonFecharModal.addEventListener("click", fechaModal);
  modalFechar.addEventListener("click", fechaModal);
  modalNovaColuna.addEventListener("click", modalNewColuna);
}
