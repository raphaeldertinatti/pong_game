//Sons do Jogo
let raquetada;
let ponto;
let trilha;
let chanceDeErrar = 0;

function preload()
{
trilha = loadSound("SONS/trilha.mp3");
ponto = loadSound("SONS/ponto.mp3");
raquetada = loadSound("SONS/raquetada.mp3");
}

//Placar do Jogo
let meusPontos = 0;
let pontosOp = 0;

//Variáveis da Bolinha
let xBall = 300;
let yBall = 200;
let diam = 15;
let raio = (diam/2);

//Variáveis da RaqueteJogador
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 8;
let alturaRaquete = 80;
let colisao = false;

//Variáveis Oponente
let xRaqueteOp = 585;
let yRaqueteOp = 150;
let yVelocidadeOp;

//Velocidade da Bolinha
let xSpeedBall = 6;
let ySpeedBall = 6;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0); 
  mostraBolinha();  
  movimentaBolinha();
  colideBolinha();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOp,yRaqueteOp);
  movimentaRaqueteJogador();
  verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete,yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOp,yRaqueteOp);
  movimentaRaqueteOp();
  incluiPlacar(); 
  marcaPontos();
  bolinhaNaoFicaPresa();
}


function mostraBolinha()
{
  circle(xBall,yBall,diam);
}

function mostraRaquete(x,y)
{  
  rect(x,y,comprimentoRaquete,alturaRaquete);
}

function movimentaBolinha()
{
  xBall += xSpeedBall;
  yBall += ySpeedBall;  
}

function colideBolinha()
{
  if(xBall + raio > width || xBall - raio < 0)
  {
    xSpeedBall *= -1
  }
  
  if(yBall + raio > height || yBall - raio < 0)
    {
      ySpeedBall *= -1
    }  
}

function movimentaRaqueteJogador()
{
  if(keyIsDown(UP_ARROW))
  {
    yRaquete -= 10; 
  }  
  
  if(keyIsDown(DOWN_ARROW))
  {
    yRaquete += 10; 
  }
}

function verificaColisaoRaquete()
{
   if(xBall - raio < xRaquete + comprimentoRaquete &&
      yBall - raio < yRaquete + alturaRaquete &&
      yBall + raio > yRaquete)
     {
       xSpeedBall *= -1
       raquetada.play();
     }
}

function colisaoRaqueteBiblioteca(x,y)
{
    colisao = collideRectCircle(x, y, comprimentoRaquete,     alturaRaquete, xBall, yBall, raio);
  if(colisao)
    {
      xSpeedBall *= -1
      raquetada.play();
      chanceDeErrar +=10; 
    }
}

function movimentaRaqueteOp()
{
  yVelocidadeOp = yBall - yRaqueteOp - comprimentoRaquete /2 - 60; 
  yRaqueteOp += yVelocidadeOp + chanceDeErrar;
  calculaChanceDeErrar();
}

function incluiPlacar()
{ 
  stroke(255)
  textSize(16);
  textAlign(CENTER);   
  fill(color(255,165,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos,170,26);
  fill(color(255,165,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosOp,470,26);
  
}

function marcaPontos()
{
  if (xBall < 10)
    {
      pontosOp += 1;
      ponto.play();
      chanceDeErrar +=15; 
    }
  
  if (xBall > 590)
    {
      meusPontos += 1;   
      ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosOp >= meusPontos) {
    chanceDeErrar += 10
    if (chanceDeErrar >= 70){
    chanceDeErrar = 75
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 50){
    chanceDeErrar = 55
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBall - raio < 0){
    xBall = 23
    }
}


