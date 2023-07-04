

let interval;
let pontos=0;
let palavras=['Amarelo','Azul','Vermelho','Verde','Preto','Cinza','Laranja','Rosa','Marrom'];
let cores=['rgb(0, 0, 0)','rgb(255, 0, 0)','rgb(0, 0, 255)', 'rgb(255, 165, 0)','rgb(255, 255, 0)','rgb(128, 128, 128)', 'rgb(0, 128, 0)','rgb(255, 192, 203)','rgb(165, 42, 42)'];
let buttons;
let contador = 3 * 1000; 
let contadorElemento = document.getElementById("timer");
let pontostext= document.getElementById("pontuacao")
let niveltext = document.getElementById("nivel");
let palavra;
let p=0;
let c;
document.addEventListener('DOMContentLoaded', function() {
  // Evento DOMContentLoaded é acionado quando o HTML termina de ser carregado. Aqui são atribuídas as cores aos botões e adicionados os eventos de clique
  atribuirCores();
  botaoclicado();
});

function atribuirCores() {
  // aqui atribui as cores dos botoes para aproveitar a lista de cores e fazer a comparações depois
  buttons = document.getElementsByClassName('bcolors'); 

  for (let i = 0; i < buttons.length; i++) {
    const botao = buttons[i];

    const cor = cores[i];

    botao.style.backgroundColor = cor;
  
  }
}


function embaralhar(){
    let grid = document.querySelector('.grid');
    // Seleciona o elemento HTML com a classe 'grid'
    for (let i = grid.children.length; i >= 0; i--) {
      grid.appendChild(grid.children[Math.floor(Math.random() * i)]); // Embaralha os filhos do elemento 'grid', alterando a ordem de exibição dos botões
      //Math.random() gera um número aleatório decimal no intervalo entre 0 (inclusive) e 1 (exclusivo)
      //Math.floor arredonda
      }

}


function sorteado(){
  // funçao para sortear palavra e cor aleatoriamente
  let sorteado= Math.floor(Math.random() * palavras.length);
    let cor=Math.floor(Math.random() * cores.length);
    palavra=document.getElementById('palavra');
    palavra.textContent= palavras[sorteado]
    palavra.style.color=cores[cor]
  
}



function sortear(){
  //função para iniciar o game
    reiniciar();
    sorteado();
    niveis(); 
    reiniciartempo();
    
    
 

}

function niveis(){
    //definir niveis 
  if(p<=10){
    niveltext.textContent = 1
    c=3000;
  } else if (p > 10 && p <= 20){
    niveltext.textContent = 2
    c=2000;
  }else if (p > 20 && p <= 30){
    niveltext.textContent = 3 
    c=2000;
    embaralhar();
  }else if (p > 30 && p <= 40){
    niveltext.textContent = 4 
    c=1700;
    embaralhar();
  }else if (p > 30 && p <= 40){
    niveltext.textContent = 5 
    c=1500;
    embaralhar();

  }else if (p > 40 && p <= 50){

    niveltext.textContent = 6;
    c=1000;
    embaralhar();
    
  }else {
    niveltext.textContent = 7;
    c = 1000;
    embaralhar();
  }

}



function botaoclicado(){
//detectar botao clicado

for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  button.addEventListener('click', function(event) {
    let buttonId = event.target.id;
    let butt =document.getElementById(buttonId)
   

    let corbutt= butt.style.backgroundColor;
    let corpalavra= palavra.style.color;
    
    clearInterval(interval);

    if(corbutt===corpalavra){
      p   = somarpontos();
      sorteado();
    
      niveis();
      reiniciartempo();
   
      
         
     
    }else{
      c=0;
      palavra.textContent=''
      pontostext.textContent= 'A sua pontuação acumulada é ' + p + ' pontos';
      contadorElemento.textContent ='tempo';

      

  }});
}}









function atualizarContador() {
  //dividindo o contador por 1000 para obter o valor antes do ponto com floor
  let segundos = Math.floor(contador / 1000);
  //utilizando porcentagem para obter o restante dos valores apos o ponto
  let milissegundos = contador % 1000;
  console.log(milissegundos,segundos)
 
  //O padStart()método preenche a string atual com outra string (várias vezes, se necessário)
//até que a string resultante atinja o comprimento especificado. O preenchimento é aplicado desde o início da string atual.
  let segundosFormatado = segundos.toString().padStart(2, "0");
  let milissegundosFormatado = milissegundos.toString();

  
  contadorElemento.textContent = `${segundosFormatado}:${milissegundosFormatado}`;

  if (contador === 0) {
     pontostext.textContent= 'A sua pontuação acumulada é ' + p + ' pontos';
     // interrompe a execução de um intervalo passando o argumento(interval) onde possui o setinterval com a função e valor a ser executado
    clearInterval(interval);
    contadorElemento.textContent = "Contador zerado";
  
    
  }
  contador -= 1; // subtrai 1 milissegundo do contador

  if (contador < 0) {
    contador = 0; //contador não se torne negativo
  }

}



function somarpontos(){

 pontos +=1;
return pontos;

}

function reiniciar(){
  pontos=0;
  p=0;
  niveltext.textContent ='';
  pontostext.textContent='';

}

  function reiniciartempo(){
    contador = c;
    clearInterval(interval);
    interval = setInterval(atualizarContador, 1);
  }