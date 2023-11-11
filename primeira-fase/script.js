console.log(localStorage.getItem("reproduzirMusica"));

window.onload = () => {
    if (localStorage.getItem("reproduzirMusica") == "true") {
        audio.currentTime = localStorage.getItem("musicaTempoAtual");
        audio.play();
        botaoReproduzir.src = "/img/ativado.png";
    }
}

window.onunload = () => {
    audio.currentTime = localStorage.setItem("musicaTempoAtual", audio.currentTime);
}

botaoReproduzir.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        botaoReproduzir.src = "/img/ativado.png";
        audio.currentTime = localStorage.getItem("musicaTempoAtual");
        localStorage.setItem("reproduzirMusica", "true")
        return;
    }

    audio.pause();
    botaoReproduzir.src = "/img/desativado.png";
    localStorage.setItem("reproduzirMusica", "false")
})