const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');
let myInterval;
let state = 'stopped'; // Changed to a string for more states
let totalSeconds;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state === 'stopped') {
        state = 'running';
        startBtn.textContent = 'running';
        totalSeconds = sessionAmount * 60;
        runTimer();
    } else {
        alert('Session has already started.');
    }
}

const runTimer = () => {
    myInterval = setInterval(updateSeconds, 1000);
}

const updateSeconds = () => {
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');

    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
    minuteDiv.textContent = `${minutesLeft}`;

    if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
        state = 'stopped';
        startBtn.textContent = 'start';
    }
}

const pauseTimer = () => {
    if (state === 'running') {
        clearInterval(myInterval);
        state = 'paused';
        startBtn.textContent = 'resume';
    } else if (state === 'paused') {
        runTimer();
        state = 'running';
        startBtn.textContent = 'running';
    }
}

const resetTimer = () => {
    clearInterval(myInterval);
    state = 'stopped';
    startBtn.textContent = 'start';
    session.textContent = '25';
    document.querySelector('.seconds').textContent = '00';
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);