const botaoInstrucoes = document.getElementById("botaoInstrucoes");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const audio = document.getElementById("audio");
const botaoReproduzir = document.getElementById("botaoReproduzir");

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

botaoReproduzir.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        botaoReproduzir.src = "img/ativado.png";
        return;
    }

    audio.pause();
    botaoReproduzir.src = "img/desativado.png";
})