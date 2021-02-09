const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");
canvas.heigth = window.innerHeight;
canvas.width = window.innerWidth;

let particle = [];
let ajustX = 0;
let ajustY = 0;
ctx.lineWidth = 3;

//handle mouse

const mouse = {
  x: null,
  y: null,
  radius: 150,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("A", 0, 30);
ctx.strokeStyle = "white";
ctx.strokeRect(0, 0, 100, 100);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
  constructor(x, y) {
    this.x = x + 100;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    // ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force - this.density;
    let directionY = forceDirectionY * force - this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

const init = (e) => {
  particleArray = [];
  particleArray.push(new Particle(50, 50));
  particleArray.push(new Particle(80, 50));
  //   for (let y = 0, y2 = textCoordinates.heigth; y < y2; y++) {
  //     for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
  //       if (
  //         textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
  //       ) {
  //         let positionX = x + ajustX;
  //         let positionY = y + ajustY;
  //         particleArray.push(new Particle(positionX * 20, positionY * 20));
  //       }
  //     }
  //   }
};
init();
console.log(particleArray);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  //   connect();
  requestAnimationFrame(animate);
}
animate();

// function connect() {
//   let opacityValue = 1;
//   for (let a = 0; a < particleArray.length; a++) {
//     for (let b = a; b < particleArray.length; b++) {
//       let dx = particleArray[a].x - particleArray[b].x;
//       let dy = particleArray[a].y - particleArray[b].y;
//       let distance = Math.sqrt(dx * dx + dy + dy);
//       opacityValue = 1 - distance / 50;
//       ctx.strokeStyle = "rgb(255,255,255)," + opacityValue + ")";
//       if (distance < 50) {
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.moveTo(particleArray[a].x, particleArray[a].y);
//         ctx.lineTo(particleArray[b].x, particleArray[b].y);
//         ctx.stroke();
//       }
//     }
//   }
// }
