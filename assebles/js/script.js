let seuvotopara = document.querySelector(".d1_esquerda_1 span")
let cargo = document.querySelector(".d1_esquerda_2 span")
let descricao = document.querySelector(".d1_esquerda_4")
let aviso = document.querySelector(".d2")
let lateral = document.querySelector(".d1_direita")
let numeros = document.querySelector(".d1_esquerda_3")

let etapaatual = 0;
let numerocandidato = ''
 let votobranco = false

function comecarEtapa(){
    let etapa = etapas[etapaatual]
    let numeroHTML = "";
    numerocandidato = ''
    votobranco = false
    votos =[];

    for( let i=0; i< etapa.numeros; i++){
        if( i===0){
            numeroHTML += '<div class="numero pisca"></div>'
        }
        else{numeroHTML += '<div class="numero"></div>'}
    }
    seuvotopara.style.display = "none"
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ""
    aviso.style.display = "none"
    lateral.innerHTML = ""
    numeros.innerHTML = numeroHTML;
}


function atualizarInterface(){
    let etapa = etapas[etapaatual]
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.codico === numerocandidato ){
            return true 
        }
        else {
             return false

        }
    })
    if(candidato.length > 0){
        candidato = candidato[0];
        seuvotopara.style.display = "block"
        if(candidato.Vice !== undefined){
            descricao.innerHTML = `Nome:${candidato.nome} </br> Vice: ${candidato.Vice} </br> Partido: ${candidato.Partido} </br> Código: ${candidato.codico}`
        }
        else{
            descricao.innerHTML = `Nome:${candidato.nome} </br> Partido: ${candidato.Partido} </br> Código: ${candidato.codico}`
        }

        let fotoshtml =''
        
        for(let i in candidato.foto){
            fotoshtml +=`<div class="d1_direita"> <div class="d1_direita_img"><img src=${candidato.foto[i].URL} alt=""> ${candidato.foto[i].legenda}</div>`
        }
        lateral.innerHTML = fotoshtml;
    } else{
        seuvotopara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = '<div class ="aviso_grande pisca">VOTO NULO</div> '



    }

}
function audios(){
    let audio = new Audio ("./assebles/sons/click.mp3")
    audio.volume =0.2;
    audio.play();
}
function correto(){
    let audio = new Audio ("./assebles/sons/correto.mp3")
    audio.volume =0.2;
    audio.play();
}
function clicou(n){
    let codigos = document.querySelector(".numero.pisca")
    if( codigos !== null){ 
        audios()
        codigos.innerHTML = n;
        numerocandidato += n
        codigos.classList.remove("pisca")
        if(codigos.nextElementSibling !==null){
            codigos.nextElementSibling.classList.add("pisca")
        }
        else{
            atualizarInterface()
        }
    }

}
function branco(){
    if(numerocandidato === ''){
    votobranco = true;
    seuvotopara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class ="aviso_grande pisca">VOTO EM BRANCO</div> '

    }

}
function corrige(){
    comecarEtapa()
}

function confirmar(){
    let etapa = etapas[etapaatual]
    let confirmandovoto = false
    if(votobranco === true){
        correto()
    confirmandovoto = true
         votos.push({ 
           etapa: etapas[etapaatual].titulo,
            voto:'branco'
        })
    }
    else if (numerocandidato.length === etapa.numeros ){
        confirmandovoto = true
        correto()
        votos.push({ 
            etapa: etapas[etapaatual].titulo,
             voto:numerocandidato
         })
    }
    if (confirmandovoto) {
        etapaatual++
        if(etapas[etapaatual] !==undefined){
            comecarEtapa()
        }
        else{
            document.querySelector(".tela").innerHTML = '<div class ="aviso_gigante pisca">FIM</div>'
        }
    }
}
comecarEtapa();