const timerDiv = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const datePicker = document.getElementById("date");
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

let startTime = 0;
let elapsedTime = 0;
let timerinterval;

async function startTimer() {
  return new Promise(() => {
    startTime = Date.now() - elapsedTime;
    
    timerinterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timer.textContent = formatTimer(elapsedTime);
    }, 10);

    startBtn.disabled = true;
    stopBtn.disabled = false;
  });
}

function stopTimer() {
  clearInterval(timerinterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerinterval);
  elapsedTime = 0;
  timer.textContent = "00:00:00";
  startBtn.disabled = false;
  stopBtn.disabled = false;
}

function formatTimer(elapsedTime) {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const mseconds = Math.floor((elapsedTime % 1000) / 10);
  return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
    "." +
    (mseconds > 9 ? mseconds : "0" + mseconds)
  );
}

startBtn.addEventListener("click", async () => {
  await startTimer();
});
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
datePicker.value = formattedDate;