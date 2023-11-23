const pneu = document.getElementById("pneu");
const garrafas = document.getElementById("garrafas");
const vaso = document.getElementById("vaso");

const modalPneu = document.getElementById("modalPneu");
const modalGarrafas = document.getElementById("modalGarrafas");
const modalVaso = document.getElementById("modalVaso");

const fecharModalPneu = document.getElementById("fecharModalPneu");
const fecharModalGarrafas = document.getElementById("fecharModalGarrafas");
const fecharModalVaso = document.getElementById("fecharModalVaso");

const modalGanhou = document.getElementById("modalGanhou");
const modalPerdeu = document.getElementById("modalPerdeu");

const fecharModalGanhou = document.getElementById("fecharModalGanhou");
const fecharModalPerdeu = document.getElementById("fecharModalPerdeu");

const imagemPneu = document.getElementById("imagemPneu");
const imagemGarrafas = document.getElementById("imagemGarrafas");
const imagemVaso = document.getElementById("imagemVaso");

const imagemCenario = document.getElementById("imagem-cenario");

const coracoes = document.getElementsByClassName("coracao");

const localStorage = window.localStorage;

let vidas = !localStorage.getItem("vidas") ? 3 : localStorage.getItem("vidas");
let pontos = 0;

let clicouPneu = false;
let clicouGarrafas = false;
let clicouVaso = false;

window.onload = () => {

    if (localStorage.getItem("faseAtual") != "segunda-fase") {
        window.location.href = `/${localStorage.getItem("faseAtual")}/index.html`;
    }    
    
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

pneu.addEventListener("click", () => {
    abrirModal(modalPneu, imagemPneu, "pneu.png");
    clicouPneu = verificaJaClicouObjeto(clicouPneu);
});

garrafas.addEventListener("click", () => {
    abrirModal(modalGarrafas, imagemGarrafas, "garrafas.png")
    clicouGarrafas = verificaJaClicouObjeto(clicouGarrafas);
});

vaso.addEventListener("click", () => {
    abrirModal(modalVaso, imagemVaso, "vaso.png")
    clicouVaso = verificaJaClicouObjeto(clicouVaso);
});

fecharModalPneu.addEventListener("click", () => {
    fecharModal(modalPneu);
});

fecharModalGarrafas.addEventListener("click", () => {
    fecharModal(modalGarrafas);
});

fecharModalVaso.addEventListener("click", () => {
    fecharModal(modalVaso);
});

fecharModalGanhou.addEventListener("click", () => {
    fecharModal(modalGanhou);
    encaminharProximaFase("segunda-fase");
});

fecharModalPerdeu.addEventListener("click", () => {
    fecharModal(fecharModalPerdeu);
    encaminharParaInicio();
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
    verificaQtdPontos(3);
}

window.addEventListener('click', (event) => {
    if (event.target == modalPneu) {
        fecharModal(modalPneu);
    }

    if (event.target == modalGarrafas) {
        fecharModal(modalGarrafas);
    }

    if (event.target == modalVaso) {
        fecharModal(modalVaso);
    }
});

const verificaQtdPontos = (qtdMinDePontos) => {
    console.log(pontos);
    if (pontos >= qtdMinDePontos) {
        modalGanhou.style.display = "block"

        console.log("teste1");

        setTimeout(() => {
            modalGanhou.style.display = "none"
            encaminharProximaFase("terceira-fase");
        }, 5000)

    }
}

const verificaQtdVidas = (qtdMinDeVidas) => {
    if (vidas <= qtdMinDeVidas) {
        modalPerdeu.style.display = "block"

        setTimeout(() => {
            modalGanhou.style.display = "none";
            encaminharParaInicio();
        }, 5000)
    }
}

const verificaJaClicouObjeto = (clicou) => {
    if (!clicou) {
        pontos++;
        return true;
    }

    return clicou;
};

const encaminharProximaFase = (proximaFase) => {
    localStorage.setItem("faseAtual", proximaFase);
    localStorage.setItem("vidas", 3);
    window.location.href = `/${localStorage.getItem("faseAtual")}/index.html`;
}

const encaminharParaInicio = () => {
    localStorage.setItem("faseAtual", "primeira-fase");
    localStorage.setItem("vidas", 3);
    window.location.href = "/index.html";
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
});