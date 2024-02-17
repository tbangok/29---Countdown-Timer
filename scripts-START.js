let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear existing timer

    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    dislay(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secLeft = Math.round((then - Date.now()) / 1000);
        //check to stop
        if (secLeft < 0) {
            clearInterval(countdown);
            return;
        }
        dislay(secLeft)
    }, 1000)
}

function dislay(sec) {
    const min = Math.floor(sec / 60);
    const remainSec = sec % 60;
    const dislay = `${min < 10 ? '0' : ''}${min}:${remainSec < 10 ? '0' : ''}${remainSec}`;
    timerDisplay.innerHTML = dislay;
    document.title = dislay;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const min = end.getMinutes();
    endTime.textContent = `Be back at 0${hour > 12 ? hour - 12 : hour}:${min < 10 ? '0' : ''}${min}`;
}

function startTimer() {
    const sec = parseInt(this.dataset.time);
    timer(sec);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const min = this.minutes.value;
    timer(min * 60);
    this.reset();
})