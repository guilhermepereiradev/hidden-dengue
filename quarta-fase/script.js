const objeto1 = document.getElementById("objeto1"); //Objeto1: bacia
const objeto2 = document.getElementById("objeto2"); //Objeto2: barril
const objeto3 = document.getElementById("objeto3"); //Objeto3: garrafa
const objeto4 = document.getElementById("objeto4"); //Objeto4: pneu
const objeto5 = document.getElementById("objeto5"); //Objeto5: vaso

const modalObjeto1 = document.getElementById("modalObjeto1");
const modalObjeto2 = document.getElementById("modalObjeto2");
const modalObjeto3 = document.getElementById("modalObjeto3");
const modalObjeto4 = document.getElementById("modalObjeto4");
const modalObjeto5 = document.getElementById("modalObjeto5");

const fecharModalObjeto1 = document.getElementById("fecharModalObjeto1");
const fecharModalObjeto2 = document.getElementById("fecharModalObjeto2");
const fecharModalObjeto3 = document.getElementById("fecharModalObjeto3");
const fecharModalObjeto4 = document.getElementById("fecharModalObjeto4");
const fecharModalObjeto5 = document.getElementById("fecharModalObjeto5");

const fecharModalGanhou = document.getElementById("fecharModalGanhou");
const fecharModalPerdeu = document.getElementById("fecharModalPerdeu");

const imagemObjeto1 = document.getElementById("imagemObjeto1");
const imagemObjeto2 = document.getElementById("imagemObjeto2");
const imagemObjeto3 = document.getElementById("imagemObjeto3");
const imagemObjeto4 = document.getElementById("imagemObjeto4");
const imagemObjeto5 = document.getElementById("imagemObjeto5");

const modalGanhou = document.getElementById("modalGanhou");
const modalPerdeu = document.getElementById("modalPerdeu");

const imagemCenario = document.getElementById("imagem-cenario");

const coracoes = document.getElementsByClassName("coracao");

const localStorage = window.localStorage;

let vidas = !localStorage.getItem("vidas") ? 3 : localStorage.getItem("vidas");
let pontos = 0;

let clicouObjeto1 = false;
let clicouObjeto2 = false;
let clicouObjeto3 = false;
let clicouObjeto4 = false;
let clicouObjeto5 = false;

window.onload = () => {

    if (localStorage.getItem("faseAtual") != "quarta-fase") {
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

objeto1.addEventListener("click", () => {
    abrirModal(modalObjeto1, imagemObjeto1, "bacia-f4.png");
    clicouObjeto1 = verificaJaClicouObjeto(clicouObjeto1);
});

objeto2.addEventListener("click", () => {
    abrirModal(modalObjeto2, imagemObjeto2, "barril-f4.png")
    clicouObjeto2 = verificaJaClicouObjeto(clicouObjeto2);
});

objeto3.addEventListener("click", () => {
    abrirModal(modalObjeto3, imagemObjeto3, "garrafa-f4.png")
    clicouObjeto3 = verificaJaClicouObjeto(clicouObjeto3);
});

objeto4.addEventListener("click", () => {
    abrirModal(modalObjeto4, imagemObjeto4, "pneu-f4.png")
    clicouObjeto4 = verificaJaClicouObjeto(clicouObjeto4);
});

objeto5.addEventListener("click", () => {
    abrirModal(modalObjeto5, imagemObjeto5, "vaso-f4.png")
    clicouObjeto5 = verificaJaClicouObjeto(clicouObjeto5);
});

fecharModalObjeto1.addEventListener("click", () => {
    fecharModal(modalObjeto1);
});

fecharModalObjeto2.addEventListener("click", () => {
    fecharModal(modalObjeto2);
});

fecharModalObjeto3.addEventListener("click", () => {
    fecharModal(modalObjeto3);
});

fecharModalObjeto4.addEventListener("click", () => {
    fecharModal(modalObjeto4);
});

fecharModalObjeto5.addEventListener("click", () => {
    fecharModal(modalObjeto5);
});

fecharModalGanhou.addEventListener("click", () => {
    fecharModal(modalGanhou);
    encaminharParaInicio();
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
    imagem.src = `/assets/quarta-fase/${novaImagem}`;
}

const fecharModal = (modal) => {
    modal.style.display = "none";
    verificaQtdPontos(5);
}

window.addEventListener('click', (event) => {
    if (event.target == modalObjeto1) {
        fecharModal(modalObjeto1);
    }

    if (event.target == modalObjeto2) {
        fecharModal(modalObjeto2);
    }

    if (event.target == modalObjeto3) {
        fecharModal(modalObjeto3);
    }

    if (event.target == modalObjeto4) {
        fecharModal(modalObjeto4);
    }

    if (event.target == modalObjeto5) {
        fecharModal(modalObjeto5);
    }
});

const verificaQtdPontos = (qtdMinDePontos) => {
    if (pontos >= qtdMinDePontos) {
        modalGanhou.style.display = "block";
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