const objeto1 = document.getElementById("objeto1"); //Objeto1: pneu
const objeto2 = document.getElementById("objeto2"); //Objeto2: lata de lixo

const modalObjeto1 = document.getElementById("modalObjeto1");
const modalObjeto2 = document.getElementById("modalObjeto2");

const fecharModalObjeto1 = document.getElementById("fecharModalObjeto1");
const fecharModalObjeto2 = document.getElementById("fecharModalObjeto2");

const fecharModalGanhou = document.getElementById("fecharModalGanhou");
const fecharModalPerdeu = document.getElementById("fecharModalPerdeu");

const imagemObjeto1 = document.getElementById("imagemObjeto1");
const imagemObjeto2 = document.getElementById("imagemObjeto2");

const modalGanhou = document.getElementById("modalGanhou");
const modalPerdeu = document.getElementById("modalPerdeu");

const imagemCenario = document.getElementById("imagem-cenario");

const coracoes = document.getElementsByClassName("coracao");

const localStorage = window.localStorage;

let vidas = !localStorage.getItem("vidas") ? 3 : localStorage.getItem("vidas");
let pontos = 0;

let clicouObjeto1 = false;
let clicouObjeto2 = false;

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

objeto1.addEventListener("click", () => {
    abrirModal(modalObjeto1, imagemObjeto1, "pneu-f1.png");
    clicouObjeto1 = verificaJaClicouObjeto(clicouObjeto1);
});

objeto2.addEventListener("click", () => {
    abrirModal(modalObjeto2, imagemObjeto2, "lata-de-lixo-f1.png")
    verificaJaClicouObjeto(clicouObjeto2);
});

fecharModalObjeto1.addEventListener("click", () => {
    fecharModal(modalObjeto1);
});

fecharModalObjeto2.addEventListener("click", () => {
    fecharModal(modalObjeto2);
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
    verificaQtdPontos(2);
}

window.addEventListener('click', (event) => {
    if (event.target == modalObjeto1) {
        fecharModal(modalObjeto1);
    }

    if (event.target == modalObjeto2) {
        fecharModal(modalObjeto2);
    }
});

const verificaQtdPontos = (qtdMinDePontos) => {
    if (pontos >= qtdMinDePontos) {
        modalGanhou.style.display = "block";

        setTimeout(() => {
            modalGanhou.style.display = "none";
            encaminharProximaFase("segunda-fase");
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
    localStorage.setItem("vidas", 3)
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