let cursor = document.querySelector(".cursor");
let holes = document.querySelectorAll(".hole");
let scoreEl = document.getElementById("score");
let timeEl = document.getElementById("time");
let startBtn = document.getElementById("startBtn");

let score = 0;
let time = 30;
let gameInterval = null;
let moleInterval = null;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});
document.addEventListener("mousedown", () => cursor.classList.add("active"));
document.addEventListener("mouseup", () => cursor.classList.remove("active"));

function spawnMole() {
  let i = Math.floor(Math.random() * holes.length);
  let hole = holes[i];

  // Skip if hole already has a mole
  if (hole.querySelector("img")) return;

  let mole = document.createElement("img");
  mole.src = "mole.png";
  hole.appendChild(mole);

  mole.addEventListener("click", () => {
    mole.src = "whacked mole.png";
    score += 10;
    scoreEl.innerText = score;
    setTimeout(() => {
      hole.removeChild(mole);
    }, 300);
  });

  setTimeout(() => {
    if (hole.contains(mole)) {
      hole.removeChild(mole);
    }
  }, 1000);
}

function startGame() {
  score = 0;
  time = 30;
  scoreEl.innerText = score;
  timeEl.innerText = time;
  startBtn.disabled = true;

  moleInterval = setInterval(spawnMole, 700);
  gameInterval = setInterval(() => {
    time--;
    timeEl.innerText = time;
    if (time <= 0) {
      clearInterval(moleInterval);
      clearInterval(gameInterval);
      startBtn.disabled = false;
      alert("Game Over! Your score: " + score);
    }
  }, 1000);
}

startBtn.addEventListener("click", startGame);
