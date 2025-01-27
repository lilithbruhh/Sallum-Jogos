let posEl = document.querySelectorAll(".pos");
let textoVitoriaEl = document.querySelector("#texto-vitoria");
let btnVitoriaEL = document.querySelector("#btn-vitoria");
let botao = document.querySelector("#botao-jogar");
let criarconta = document.querySelector("#botao-criar");
let linkCredLog = document.querySelector("#botao-creditos");
let linkCredVit = document.querySelector("#btn-creditos");
let voltarLog = document.querySelector("#btn-retorno");
let btnRanking = document.querySelector("#botao-ranking");
let crpTabela = document.querySelector("#corpo-tabela");
let btnVoltarRank = document.querySelector("#btn-rank-voltar");
let selectskins = document.querySelector("#skin");

let count = 0;

let seqVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 4, 8],
    [6, 4, 2],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

let contas = [{
    nome: "teste1",
    senha: "qogbvoiadb",
    nVitorias: 0, 
    nPartidas: 0
},
{
    nome: "teste2",
    senha: "apsifnapvdkp",
    nVitorias: 0, 
    nPartidas: 0
}]

let contasLidas;
contasLidas = JSON.parse(localStorage.getItem("contas"));

if (contasLidas != null) {
    contas = contasLidas
}
else {
    contas = [{
        nome: "teste1",
        senha: "qogbvoiadb",
        nVitorias: 0, 
        nPartidas: 0
    },
    {
        nome: "teste2",
        senha: "apsifnapvdkp",
        nVitorias: 0, 
        nPartidas: 0
    }]
}
for (let item of posEl) {
    item.addEventListener("click", function() {
         if (getComputedStyle(item).cursor != "not-allowed") {
            if (count % 2 == 0)     item.classList.add("x");
            else                    item.classList.add("o");

            count++;

            (count % 2) ? checkVitoria("x") : checkVitoria("o");
         }
    });
}
function checkVitoria(jogador) {
    let vitoria = seqVitoria.some((sequencia) => {
        return sequencia.every((indice) => {
            return posEl[indice].classList.contains(jogador);
        })
    })

    if (vitoria) {
        count = 0;
        document.getElementById("vitoria").style.display = "flex";
        textoVitoriaEl.innerHTML = `${jogador.toUpperCase()} venceu!`;
        let contaLogada = localStorage.getItem("conta-logada");

        let tam = contas.length;

        for (let i=0; i<tam; i++) {
            if (contas[i].nome == contaLogada) {
                contas[i].nVitorias++;
                contas[i].nPartidas++;
                qs(contas);
            }
        };
        localStorage.setItem("contas", JSON.stringify(contas));
    }

    if (count == 9 && !vitoria) {
        count = 0;
        document.getElementById("vitoria").style.display = "flex";
        textoVitoriaEl.innerHTML = `Empate!`;
        let contaLogada = localStorage.getItem("conta-logada");

        let tam = contas.length;

        for (let i=0; i<tam; i++) {
            if (contas[i].nome == contaLogada) {
                contas[i].nPartidas++;
            }
        }
        localStorage.setItem("contas", JSON.stringify(contas));
    }

    return;
}

btnVitoriaEL.addEventListener("click", function() {
    clearBoard();
});

function clearBoard() {
    document.getElementById("vitoria").style.display = "none";

    for (let item of posEl) {
        item.classList.remove("x");
        item.classList.remove("o");
    }
}

criarconta.addEventListener("click", function(){
    let nomeinput = document.querySelector("#nome").value; 
    let senhainput = document.querySelector("#senha").value; 

    if(nomeinput.length < 1 || senhainput.length < 8) {
        alert("Nome/Senha Inválidos, Min de Caracteres 8");
        return;
    };

    let tam = contas.length;

    for (let i=0; i<tam; i++) {
        if(nomeinput == contas[i].nome) { 
            alert("Nome Já Reservselectskinsado");
            return;
        }
    }

    let contaNova = {nome: nomeinput, senha: senhainput, nVitorias: 0, nPartidas: 0};
    contas.push(contaNova);

    localStorage.setItem("contas", JSON.stringify(contas));

    alert("Conta registrada com sucesso!");
}); 

botao.addEventListener("click", function(){
    let nomeinput = document.querySelector("#nome").value; 
    let senhainput = document.querySelector("#senha").value; 

    let count = 0;
    let tam = contas.length;

    for (let i=0; i<tam; i++) {
        if(nomeinput == contas[i].nome) {
            count++;
            if (senhainput == contas[i].senha) {
                document.querySelector("#nome").value = "";
                document.querySelector("#senha").value = "";
                localStorage.setItem("conta-logada", `${nomeinput}`);
                document.getElementById("login-aparece").style.display = "none";
                AplicarSkin();
            }
            else {
                alert("Senha Incorreta");
                return;
            }
        }
    }

    if(count==0)    alert("Conta Não Registrada");
    
});

function AplicarSkin(){
    switch(selectskins.value){
        case "1":
            for(let item of posEl){
                item.classList.add("skin1");
            }
            break;
        case "2":
            for(let item of posEl){
                item.classList.add("skin2");
            }
            break;
        case "3":
            for(let item of posEl){
                item.classList.add("skin3");
            }
            break;
    }
}

linkCredVit.addEventListener("click", function() {
    location.href = "pagina_creditos/creditos.html"
});

voltarLog.addEventListener("click", function() {
    document.getElementById("login-aparece").style.display = "flex";
    localStorage.setItem("conta-logada", `none`);
    document.getElementById("vitoria").style.display = "none";
    clearBoard();
});




function qs(vet)
{
    quickSort(vet, 0, vet.length - 1);
}

function quickSort(vet, ini, fim)
{
    let i = ini;
    let f = fim;
    let m = Math.floor((i + f)/2);

    while(i < f)
    {
        while(vet[i].nVitorias > vet[m].nVitorias)
            i++;

        while(vet[f].nVitorias < vet[m].nVitorias)
            f--;

        if(i <= f)
        {
            var temp = vet[i];
            vet[i] = vet[f];
            vet[f] = temp;
            i++;
            f--;
        }
    }

    if(f > ini)
        quickSort(vet, ini, f);

    if(i < fim)
        quickSort(vet, i, fim);
}

btnRanking.addEventListener("click", function() {
    document.getElementById("ranking").style.display = "flex";

    crpTabela.innerHTML = "";

    for (let i=0; i<10; i++) {
        crpTabela.innerHTML += `<tr><td>${i+1}°</td><td>${contas[i].nome}</td><td>${contas[i].nVitorias}</td><td>${contas[i].nPartidas}</td></tr>`
    }

    document.getElementById("login-aparece").style.display = "none";
})

btnVoltarRank.addEventListener("click", function() {
    document.getElementById("ranking").style.display = "none";
    document.getElementById("login-aparece").style.display = "flex";
})
