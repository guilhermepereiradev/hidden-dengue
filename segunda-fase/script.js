const lataDeLixo = document.getElementById("lataDeLixo");
const pneu = document.getElementById("pneu");
const modalLataDeLixo = document.getElementById("modalLataDeLixo");
const modalPneu = document.getElementById("modalPneu");
const fecharModalLataDeLixo = document.getElementById("fecharModalLataDeLixo");
const fecharModalPneu = document.getElementById("fecharModalPneu");

const imagemLataDeLixo = document.getElementById("imagemLataDeLixo");
const imagemPneu = document.getElementById("imagemPneu");

const modalGanhou = document.getElementById("modalGanhou");
const modalPerdeu = document.getElementById("modalPerdeu");


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

    verificaQtdVidas(0);
})

window.onload = () => {
    if (localStorage.getItem("reproduzirMusica") == "true") {
        audio.play();
        botaoReproduzir.src = "/img/ativado.png";
    }
    audio.currentTime = localStorage.getItem("musicaTempoAtual");

    if (localStorage.getItem("passouPrimeiraFase") != "true") {
        window.location.href = '/primeira-fase/index.html';
    }
}

window.onunload = () => {
    audio.currentTime = localStorage.setItem("musicaTempoAtual", audio.currentTime);
}

lataDeLixo.addEventListener("click", () => {
    abrirModal(modalLataDeLixo, imagemLataDeLixo, "lata-de-lixo.png")
});

pneu.addEventListener("click", () => {
    abrirModal(modalPneu, imagemPneu, "pneu.png")
})

const abrirModal = (modal, imagem, novaImagem) => {
    modal.style.display = "block";
    imagem.src = `/assets/primeira-fase/${novaImagem}`;
    pontos++;
}

const verificaQtdPontos = (qtdMaxDePontos) => {
    if (pontos >= qtdMaxDePontos) {
        modalGanhou.style.display = "block"

        setTimeout(() => {
            modalGanhou.style.display = "none"
            window.location.href = '/segunda-fase/index.html';
        }, 5000)

    }
}

const verificaQtdVidas = (qtdMinDePontos) => {
    if (vidas <= qtdMinDePontos) {
        modalPerdeu.style.display = "block"

        setTimeout(() => {
            modalGanhou.style.display = "none"
            window.location.reload();
        }, 5000)
    }
}

fecharModalPneu.addEventListener("click", () => {
    fecharModal(modalPneu);
});

fecharModalLataDeLixo.addEventListener("click", () => {
    fecharModal(modalLataDeLixo);
});

const fecharModal = (modal) => {
    modal.style.display = "none";

    verificaQtdPontos(2);
}

window.addEventListener('click', (event) => {
    if (event.target == modalLataDeLixo) {
        fecharModal(modalLataDeLixo);
    }

    if (event.target == modalPneu) {
        fecharModal(modalPneu);
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
});