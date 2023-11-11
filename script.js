const botaoInstrucoes = document.getElementById("botaoInstrucoes");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const audio = document.getElementById("audio");
const botaoReproduzir = document.getElementById("botaoReproduzir");

let localStorage = window.localStorage;

window.onload = () => {
    if (localStorage.getItem("reproduzirMusica") == "true") {
        audio.currentTime = localStorage.getItem("musicaTempoAtual") || 0;
        audio.play();
        botaoReproduzir.src = "img/ativado.png";
    }
}

window.onunload = () => {
    audio.currentTime = localStorage.setItem("musicaTempoAtual", audio.currentTime);
}

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
        localStorage.setItem("reproduzirMusica", "true")
        return;
    }

    audio.pause();
    botaoReproduzir.src = "img/desativado.png";
    localStorage.setItem("reproduzirMusica", "false")
})