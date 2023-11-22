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

const imagemCenario = document.getElementById("imagem-cenario");

const coracoes = document.getElementsByClassName("coracao");

const localStorage = window.localStorage;

let vidas = !localStorage.getItem("vidas") ? 3 : localStorage.getItem("vidas");
let pontos = !localStorage.getItem("pontos") ? 0 : localStorage.getItem("pontos");

let clicouPneu = false;
let clicouLataDeLixo = false;

window.onload = () => {
    
    confereCoracoesPreenchidos();

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
    abrirModal(modalLataDeLixo, imagemLataDeLixo, "lata-de-lixo.png");
    clicouLataDeLixo = verificaJaClicouObjeto(clicouLataDeLixo);
});

pneu.addEventListener("click", () => {
    abrirModal(modalPneu, imagemPneu, "pneu.png")
    clicouPneu = verificaJaClicouObjeto(clicouPneu);
});

fecharModalPneu.addEventListener("click", () => {
    fecharModal(modalPneu);
});

fecharModalLataDeLixo.addEventListener("click", () => {
    fecharModal(modalLataDeLixo);
});

imagemCenario.addEventListener("click", () => {
    audioErro.play();
    localStorage.setItem("vidas", --vidas);
    verificaQtdVidas(0);
})

window.addEventListener("click", () => {
    confereCoracoesPreenchidos();
})

const confereCoracoesPreenchidos = () => {
    let erros = Math.max(0, 3 - vidas);

    for (let i = 0; i < erros; i++) {
        if(coracoes[i]) {
            coracoes[i].src = "/img/coracao.png";
        }
    }
}

const abrirModal = (modal, imagem, novaImagem) => {
    modal.style.display = "block";
    imagem.src = `/assets/primeira-fase/${novaImagem}`;
}

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

const verificaQtdPontos = (qtdMinDePontos) => {
    if (pontos >= qtdMinDePontos) {
        modalGanhou.style.display = "block"

        setTimeout(() => {
            modalGanhou.style.display = "none"
            localStorage.setItem("faseAtual", "segunda-fase")
            localStorage.setItem("vidas", 3)
            localStorage.setItem("pontos", 0)
            window.location.href = `/${localStorage.getItem("faseAtual")}/index.html`;
        }, 5000)

    }
}

const verificaQtdVidas = (qtdMinDeVidas) => {
    if (vidas <= qtdMinDeVidas) {
        modalPerdeu.style.display = "block"

        setTimeout(() => {
            modalGanhou.style.display = "none";
            localStorage.setItem("faseAtual", "primeira-fase");
            localStorage.setItem("vidas", 3)
            localStorage.setItem("pontos", 0)
            window.location.href = "/index.html";
        }, 5000)
    }
}

const verificaJaClicouObjeto = (clicou) => {
    if (!clicou) {
        localStorage.setItem("pontos", ++pontos);
        return true;
    }

    return clicou;
};

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