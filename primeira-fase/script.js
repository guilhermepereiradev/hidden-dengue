const lataDeLixo = document.getElementById("lataDeLixo");
const pneu = document.getElementById("pneu");
const modalLataDeLixo = document.getElementById("modalLataDeLixo");
const modalPneu = document.getElementById("modalPneu");
const fecharModalLataDeLixo = document.getElementById("fecharModalLataDeLixo");
const fecharModalPneu = document.getElementById("fecharModalPneu");

const imagemLataDeLixo = document.getElementById("imagemLataDeLixo");
const imagemPneu = document.getElementById("imagemPneu");


let vidas = 3;
let pontos = 0;

let coracoes = document.getElementsByClassName("coracao");


window.addEventListener("click", () => {
    let erros = Math.max(0, 3 - vidas);

    for (let i = 0; i < erros; i++) {
        if(coracoes[i]) {
            coracoes[i].src = "/img/coracao.png";
        }
    }
})


const imagemCenario = document.getElementById("imagem-cenario");

imagemCenario.addEventListener("click", () => {
    vidas--;
})

window.onload = () => {
    if (localStorage.getItem("reproduzirMusica") == "true") {
        audio.play();
        botaoReproduzir.src = "/img/ativado.png";
    }
    audio.currentTime = localStorage.getItem("musicaTempoAtual");
}

window.onunload = () => {
    audio.currentTime = localStorage.setItem("musicaTempoAtual", audio.currentTime);
}

lataDeLixo.addEventListener("click", () => {
    modalLataDeLixo.style.display = "block";
    imagemLataDeLixo.src = "/assets/primeira-fase/lata-de-lixo.png";
});

pneu.addEventListener("click", () => {
    modalPneu.style.display = "block";
    imagemPneu.src = "/assets/primeira-fase/pneu.png";
})

fecharModalPneu.addEventListener("click", () => {
    modalPneu.style.display = "none";
});

fecharModalLataDeLixo.addEventListener("click", () => {
    modalLataDeLixo.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target == modalLataDeLixo) {
        modalLataDeLixo.style.display = 'none';
    }

    if (event.target == modalPneu) {
        modalPneu.style.display = 'none';
    }
});

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