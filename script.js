const botaoInstrucoes = document.getElementById("botaoInstrucoes");
const botaoJogar = document.getElementById("botaoJogar");
const modalPrincipal = document.getElementById("modalPrincipal");
const fecharModal = document.getElementById("fecharModal");
const audio = document.getElementById("audio");
const botaoReproduzir = document.getElementById("botaoReproduzir");

const localStorage = window.localStorage;

window.onload = () => {
    if (localStorage.getItem("reproduzirMusica") == "true") {
        audio.play();
        botaoReproduzir.src = "img/ativado.png";
    }
    audio.currentTime = localStorage.getItem("musicaTempoAtual");
}

window.onunload = () => {
    localStorage.setItem("musicaTempoAtual", audio.currentTime);
}

botaoJogar.addEventListener("click", () => {
    if (!localStorage.getItem("faseAtual")) {
        localStorage.setItem("faseAtual", "primeira-fase")
    }

    window.location.href = `/${localStorage.getItem("faseAtual")}/index.html`;
});

botaoInstrucoes.addEventListener("click", () => {
    modalPrincipal.style.display = "block";
});

fecharModal.addEventListener("click", () => {
    modalPrincipal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target == modalPrincipal) {
        modalPrincipal.style.display = 'none';
    }
});

botaoReproduzir.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        botaoReproduzir.src = "img/ativado.png";
        audio.currentTime = localStorage.getItem("musicaTempoAtual");
        localStorage.setItem("reproduzirMusica", "true")
        return;
    }

    audio.pause();
    botaoReproduzir.src = "img/desativado.png";
    localStorage.setItem("reproduzirMusica", "false")
})