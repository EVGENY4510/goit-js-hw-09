const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

btnStartEl.disabled = false;
btnStopEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let timerId = null;
btnStartEl.addEventListener('click', onBtnStart);

function onBtnStart() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStartEl.disabled = true;
  btnStopEl.disabled = false;
}

btnStopEl.addEventListener('click', onBtnStop);

function onBtnStop() {
  clearInterval(timerId);
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
}
