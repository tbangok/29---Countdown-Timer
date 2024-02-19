let countdown;
const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');



function timer(second) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + second * 1000;

    displayTimer(second);
    displayEnd(then);

    countdown = setInterval(() => {
        const secLeft = Math.round((then - Date.now()) / 1000);
        if (secLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimer(secLeft);
    }, 1000);
}

function displayTimer(second) {
    const min = Math.floor(second / 60);
    const sec = second % 60;

    const display = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    timeLeft.innerHTML = display;
}

function displayEnd(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const min = end.getMinutes();
    timeEnd.innerHTML = `Be back at ${hour > 12 ? hour - 12 : hour}:${min < 10 ? '0' : ''}${min}`;
}

function set() {
    const sec = this.dataset.time;
    timer(sec);
}

buttons.forEach(button => button.addEventListener('click', set));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    timer(this.minutes.value*60);
    this.reset();

})
