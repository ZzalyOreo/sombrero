function preload() {
  narizRoja = loadImage("https://i.postimg.cc/7ZBcjDqp/clownnose.png");
  sombrero = loadImage("https://i.postimg.cc/rFPSP6zw/sombrero.png");
}

function setup() {
  canvas = createCanvas(640, 450);
  video = createCapture(VIDEO);
  video.size(640, 450);
  video.hide();
  color = "";
  poseNet = ml5.poseNet(video, modeloListo);
  poseNet.on("pose", resultadoObtenido)
}

function modeloListo() {
  console.log("Modelo listo");
}

narizX = 0;
narizY = 0;

ojoY = 0;
distanciaOjoNariz = 0;

function resultadoObtenido(resultado) {
  if(resultado.length > 0){
    console.log(resultado)
    narizX = resultado[0].pose.nose.x;
    narizY = resultado[0].pose.nose.y;
    ojoY = resultado[0].pose.leftEye.y;
    distanciaOjoNariz = narizY -ojoY;
  }
}

function draw() {
  image(video, 0, 0, 640, 450);
  tint(color);
  textSize(38);
  fill(255, 255, 255);
  stroke(0, 0, 0);
  circle(narizX, narizY, 20);
  image(narizRoja,narizX - 30, narizY - 20, 60, 40);
  image(sombrero,narizX - 105, narizY - 3 * distanciaOjoNariz - 60, 210, 120);
}

function cambiarFiltro() {
  color = document.getElementById("color").value;
}

function tomarFoto() {
  save("foto.png");
}
