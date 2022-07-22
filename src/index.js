/** @type {HTMLCanvasElement} */
import "./style.css";

const Sprite = require("../src/sprites.png");
let downloadBtn = document.querySelector(".download");
let resetBtn = document.querySelector(".reset");
let content = document.querySelector(".content");
let canvas = document.querySelector(".can");
let drawing = false;

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

content.appendChild(canvas);

resetBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 7 + 5;
    this.size = Math.random() * 1 + 2;
    this.vs = Math.random() * 0.2 + 0.05;
    this.angleX = Math.random() * 6.2;
    this.vaX = Math.random() * 0.6 - 0.3;
    this.angleY = Math.random() * 6.2;
    this.vaY = Math.random() * 0.6 - 0.3;
    this.lightness = 14.51;
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vaX;
    this.angleY += this.vaY;
    if (this.lightness < 50) this.lightness += 0.25;
    if (this.size < this.maxSize) {
      ctx.beginPath();
      ctx.lineWidth = 0.2;

      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(210,10%,${this.lightness}%)`;
      ctx.fill();
      ctx.stroke();
      requestAnimationFrame(this.update.bind(this));
    } else {
      const face = new Faces(this.x, this.y, this.size);
      face.grow();
    }
  }
}

class Faces {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vs = Math.random() * 0.3 + 0.2;
    this.maxFaceSize = this.size + Math.random() * 70;
    this.image = new Image();
    this.image.src = Sprite;
    this.frameSize = 500;
    this.frameX = Math.floor(Math.random() * 4);
    this.frameY = Math.floor(Math.random() * 4);
    this.size > 9 ? (this.willFace = true) : (this.willFace = false);
    this.angle = 0;
    this.va = Math.random() * 0.05 - 0.025;
  }
  grow() {
    if (this.size < this.maxFaceSize && this.willFace) {
      this.size += this.vs;
      this.angle += this.va;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(
        this.image,
        this.frameSize * this.frameX,
        this.frameSize * this.frameY,
        this.frameSize,
        this.frameSize,
        0 - this.size / 2,
        0 - this.size / 2,
        this.size,
        this.size
      );
      ctx.restore();
      requestAnimationFrame(this.grow.bind(this));
    }
  }
}

canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    for (let i = 0; i < 3; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
});

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  for (let i = 0; i < 3; i++) {
    const root = new Root(e.x, e.y);
    root.update();
  }
});
window.addEventListener("mouseup", () => (drawing = false));

downloadBtn.addEventListener("click", () => {
  //Edge Support (PNG ONLY)
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(canvas.msToBlob(), "Artwork.png");
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = "Artwork.png";
    a.click();
    document.body.appendChild(a);
  }
});
