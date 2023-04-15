
const bgdColor = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let interval = null;
btnStop.setAttribute('disabled', true);

btnStart.addEventListener('click', intervalOn);
btnStop.addEventListener('click', intervalOff);

function intervalOn(e) {
    btnStart.setAttribute('disabled', true);
    btnStop.removeAttribute('disabled', true);
    interval = setInterval(() => {
    bgdColor.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function intervalOff() {
    btnStop.setAttribute('disabled', true);
    btnStart.removeAttribute('disabled', true);
    clearInterval(interval)
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
