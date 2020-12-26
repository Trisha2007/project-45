

var canvas = null;
var pop_sound = null;
const colors = ['red', 'cyan', 'green', 'yellow', 'brown', 'purple', 'pink',
  'plum', 'orange', 'aqua', 'lime', 'crimson',
  
];


var balloons = [];
var burst_balloons = [];
var wind = 0;
var maxWindChange = 0.5;
var shoot = null;
var startTime = Date.now();
var lastSpawnTime = startTime;
var score = 0;
const gameTime = 60 * 1000;
const twoPi = Math.PI * 2;
const spawnTime = 2000;

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawBalloon(ctx, balloon) {
  
  ctx.fillStyle = balloon.color1;

  ctx.beginPath();
  ctx.ellipse(balloon.x, balloon.y, balloon.width, balloon.height, 0, 0, twoPi);
  ctx.fill();
  ctx.strokeStyle = balloon.color2;
  ctx.beginPath();
  ctx.moveTo(balloon.x, balloon.y + balloon.height);
  let s = balloon.string;
  ctx.bezierCurveTo(
    balloon.x + s[0][0], balloon.y + balloon.height + s[0][1],
    balloon.x + s[1][0], balloon.y + balloon.height + s[1][1],
    balloon.x + s[2][0], balloon.y + balloon.height + s[2][1],
  );
  ctx.stroke();

  ctx.fillStyle = 'blue';

  ctx.font = '' + (balloon.width + balloon.height) / 2 + '30px forte';
  ctx.fillText(balloon.text, balloon.x, balloon.y);
}

function spawnBalloon() {
  let x = Math.floor(Math.random() * canvas.width);
  let b = new Balloon(x);
  balloons.push(b);
}

function gameOver(ctx) {
  window.removeEventListener("keypress", shootListener);

  ctx.fillStyle = 'cyan';
 
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '80px forte';
  ctx.fillText("ミ★ game over ★彡", canvas.width / 2, canvas.height / 2 - 150);
  ctx.fillText("You popped: " + score, canvas.width / 2, canvas.height / 2 - 50);
  ctx.font = '60px forte';
  ctx.fillText("╰•★★ Press enter to play again ★★•╯", canvas.width / 2, canvas.height / 2 + 100);
  init();
}

function run() {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let newBalloons = [];
  let current = null;
  let currentIndex = 0;
  let currentTime = Date.now();
  if (currentTime - spawnTime > lastSpawnTime) {
    spawnBalloon();
    lastSpawnTime = currentTime;
  }

  if (shoot != null) {
    for (let i = 0; i < balloons.length; ++i) {
      let balloon = balloons[i];
      if (balloon.text == shoot) {
        if (current == null || (balloon.y + balloon.height > current.y + current.height)) {
          current = balloon;
          currentIndex = i;
        }
      }
    }
    shoot = null;
    if (current != null) {
      pop_sound.currentTime = 0;
      pop_sound.play();
      burst_balloons.push(new Explosion(current.x, current.y, current.color));
      balloons.splice(currentIndex, 1);
      score += 10;
    } else {
      score--;
    }
  }

  var now = Date.now();
  var timeLeft = (gameTime - (now - startTime)) / 1000;

  if (timeLeft <= 0) {
    gameOver(ctx);
    return;
  }

  ctx.fillStyle = 'lime';

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = '30px consolas';
  ctx.fillText("You popped: ", 0, 0);
  ctx.textAlign = 'right';
  ctx.fillText("" + score, 230, 0);

  ctx.fillText(timeLeft.toFixed(1), canvas.width - 10, 0);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < balloons.length; ++i) {
    let balloon = balloons[i];2727
    drawBalloon(ctx, balloon);
    let localWind = wind * (1.2 - 0.4 * Math.random());
    balloon.x= Math.min(Math.max(balloon.x+ localWind, balloon.width), canvas.width - balloon.width);
    balloon.y -= balloon.speed;
    
  
    if (balloon.y + balloon.height + balloon.string[2][1] > 0) {
      newBalloons.push(balloon);
    }
   
  }

  let new_burst_balloons = [];

  for (let i = 0; i < burst_balloons.length; ++i) {
    let burst = burst_balloons[i];
    for (let p of burst.particles) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 1, 2, 0,0, twoPi);
      ctx.fill();
    }

    if (burst.update()) {
      new_burst_balloons.push(burst);
    }
  }
  burst_balloons = new_burst_balloons;

  wind += (Math.random() - 0.5) * maxWindChange;
  const maxWind = 3;
  wind = Math.min(wind, maxWind);
  wind = Math.max(wind, -maxWind);
  balloons = newBalloons;
  window.requestAnimationFrame(run)
}

function init() {
  function enterListener(e) {
    if (e.code == 'Space') {
      gameInit();
      document.getElementById('start_prompt').style.display = "none";
      window.removeEventListener("keypress", enterListener);
    }
  }
  window.addEventListener("keypress", enterListener, false);
}

function shootListener(e) {
  let digit = +e.key;
  if (!isNaN(digit)) {
    shoot = digit;
  }
}

function gameInit() {
  balloons = [];
  wind = 0;
  maxWindChange = 1;
  shoot = null;
  startTime = Date.now();
  lastSpawnTime = startTime;
  score = 0;

  window.addEventListener("keydown", shootListener, false);

  canvas = document.getElementById('game');
  
  canvas.width = window.innerWidth-8
  canvas.height = window.innerHeight - 16;

  pop_sound = document.getElementById('pop_sound');
  pop_sound.volume = 0.5;

  run();
}
