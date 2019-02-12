let bg;
let mascara;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    bg = loadImage('img/JARRAFONDO.png');
    mascara = loadImage('img/FONDO.png');
}

function draw() {
    const t = map(mouseY, 0, height, 0, 1);
    background(bg);
    blendMode(BURN);
    chorro(t);
    vino(t);
    blendMode(BLEND);
    image(mascara, 0, 0, width, height);
}


function chorro(t) {
    const detail = 100;
    const gruesoRad = 20;
    const finoRad = 5;
    const amp = 20;

    fill(119, 7, 50);
    noStroke();

    beginShape();
    for(let i = 0; i < detail; i++) {
        const baseX = map(i, 0, detail, width/2 + gruesoRad, width/2 + finoRad);
        const offsetX = noise(i * 0.1, frameCount * 0.05, 0) * amp;
        const py = map(i, 0, detail, 0, height);
        vertex(baseX + offsetX, py);
    }
    for(let i = 0; i < detail; i++) {
        const baseX = map(i, 0, detail, width/2 - finoRad, width/2 - gruesoRad);
        const offsetX = noise(i * 0.1, frameCount * 0.05, 1) * amp;
        const py = map(i, 0, detail, height, 0);
        vertex(baseX - offsetX, py);
    }
    endShape(CLOSE);
}

function vino(t) {
    const top = map(t, 0, 1, 200, height - 100);
    fill(119, 7, 50);
    noStroke();

    const amp = 50;
    const detail = 100;
    beginShape();
    for(let i = 0; i < detail; i++) {
        const offsetY = noise(i * 0.1, frameCount * 0.05) * amp;
        const px = map(i, 0, detail - 1, 0, width);
        vertex(px, top + offsetY);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


