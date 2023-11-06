const botaoInstrucoes = document.getElementById("botaoInstrucoes");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");

botaoInstrucoes.addEventListener("click", () => {
    modal.style.display = "block";
});

fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});