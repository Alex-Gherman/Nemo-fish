const canvas = document.getElementById("canvas1");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameFrame = 0;
ctx.font = "2rem Georgia";
let gameSpeed = 1;
//Mouse Interation
let camvasPosition = canvas.getBoundingClientRect();
const gameOver = false;
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener("mousedown", (event) => {
  mouse.click = true;
  mouse.x = event.x - camvasPosition.left;
  mouse.y = event.y - camvasPosition.top;
});
canvas.addEventListener("mouseup", (event) => {
  mouse.click = false;
});
//Player
const playerLeft = new Image();
playerLeft.src = "./img/fish_red_swim.png";
const playerRight = new Image();
playerRight.src = "./img/fish_red_swim_r.png";

class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.angle = 20;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    let theta = Math.atan2(dy, dx);
    this.angle = theta;
    if (mouse.x != this.x) {
      this.x -= dx / 20;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 20;
    }
    if (gameFrame % 5 == 0) {
      this.frame++;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frameY = 2;
      else this.frameY = 0;
    }
  }
  draw() {
    if (mouse.click) {
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.fillRect(this.x, this.y, this.radius, 10);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    if (this.x >= mouse.x) {
      ctx.drawImage(
        playerLeft,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 60,
        0 - 46,
        this.spriteWidth / 4,
        this.spriteHeight / 4
      );
    } else {
      ctx.drawImage(
        playerRight,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 60,
        0 - 46,
        this.spriteWidth / 4,
        this.spriteHeight / 4
      );
    }
    ctx.restore();
  }
}
const player = new Player();

// Bubbles

let bubblesAray = [];
const bubbleImg = new Image();
bubbleImg.src = "./img/bubble_pop_frame_01.png";

//sound
const bubblePop1 = document.createElement("audio");
bubblePop1.src = "./music/bubbles-single2.wav";
const bubblePop2 = document.createElement("audio");
bubblePop2.src = "./music/Plop.ogg";

class Buble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * canvas.height;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
    this.sound = Math.floor(Math.random() * 2) === 1 ? "sound1" : "sound2";
  }
  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.stroke();
    ctx.drawImage(
      bubbleImg,
      this.x - 70,
      this.y - 70,
      this.radius * 2.8,
      this.radius * 2.8
    );
  }
}

///img

///HandlerBublees\
function handleBublles() {
  if (gameFrame % 50 == 0) {
    bubblesAray.push(new Buble());
  }
  for (let i = 0; i < bubblesAray.length; i++) {
    bubblesAray[i].draw();
    bubblesAray[i].update();

    if (bubblesAray[i].y < 200 - bubblesAray[i].radius * 2) {
      bubblesAray.splice(i, 1);
      i--;
    } else if (
      bubblesAray[i].distance <
      bubblesAray[i].radius + player.radius
    ) {
      if (bubblesAray[i].sound == "sound1") {
        bubblePop1.play();
      } else {
        bubblePop2.play();
      }
      score++;
      bubblesAray[i].counted = true;
      bubblesAray.splice(i, 1);
      i--;
      // if (bubblesAray[i].counted) {
      //   ctx.drawImage(
      //     bubbleImg2,
      //     this.x - 70,
      //     this.y - 70,
      //     this.radius * 2.8,
      //     this.radius * 2.8
      //   );
      // }
    }
  }
}

//Enemy
const enemieImg = new Image();
enemieImg.src = "./img/blueFish.png";

class Enemy {
  constructor() {
    this.x = 200 + canvas.width;
    this.y = Math.random() * (canvas.height - 150) + 90;
    this.radius = 50;
    this.speed = Math.random() * 2 + 2;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 418;
    this.spriteHeight = 397;
    this.distance;

    // this.sound = Math.floor(Math.random() * 2) === 1 ? "sound1" : "sound2";
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.stroke();
    // ctx.drawImage(
    //   enemieImg,
    //   this.frameX * this.spriteWidth,
    //   this.frameY * this.spriteHeight,
    //   this.spriteWidth,
    //   this.spriteHeight,
    //   this.x - 50,
    //   this.y - 63,
    //   this.radius * 2.2,
    //   this.radius * 2.2
    // );
    ctx.drawImage(
      enemieImg,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 50,
      this.y - 63,
      this.spriteWidth / 3.6,
      this.spriteHeight / 3.6
    );
  }
  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.radius * 2) {
      this.x = canvas.width + 200;
      this.y = Math.random() * (canvas.height - 150) + 90;
      this.speed = Math.random() * 2 + 2;
    }
    if (gameFrame % 5 == 0) {
      this.frame++;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frameY = 2;
      else this.frameY = 0;
    }
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + player.radius) {
      hadlerGameOver();
    }
  }
}
//Colizion with player

function hadlerGameOver() {
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER, you reached score: " + score, 130, 250);
  gameOver = true;
}
const enemy1 = new Enemy();
function handlerEnemy() {
  enemy1.draw();
  enemy1.update();
}

const background = new Image();
background.src = "./img/background1.png";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  BG.x1 -= gameSpeed;
  if (BG.x1 < -BG.width) BG.x1 = BG.width;
  BG.x2 -= gameSpeed;
  if (BG.x2 < -BG.width) BG.x2 = BG.width;

  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}
///Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleBublles();
  player.update();
  player.draw();
  handlerEnemy();
  ctx.fillText("score: " + score, 10, 50);
  gameFrame++;
  if (!gameOver) requestAnimationFrame(animate);
  // requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize", function () {
  camvasPosition = canvas.getBoundingClientRect();
});
