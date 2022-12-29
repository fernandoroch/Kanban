export default function modalcards() {
  
  const modalDescri = document.querySelector(".fechar-modal-descri");
  const fecharModalBody = document.querySelector(".coluna-descrip");
  const modalNewDescrip = document.querySelector(".modal-descrip-new");
  
  function fecharModalDescri(e) {
    if (e.target === this) {
      modalNewDescrip.classList.add("active-modal");
    }
  }

  modalDescri.addEventListener("click", fecharModalDescri);
  fecharModalBody.addEventListener("click", fecharModalDescri);
}
