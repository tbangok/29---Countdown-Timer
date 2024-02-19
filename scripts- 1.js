let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    display(seconds);
    displayEnd(then);

    console.log(seconds);
    countdown = setInterval(() => {
        const secLeft = Math.round((then - Date.now()) / 1000);
        if (secLeft < 0) {
            clearInterval(countdown);
            return;
        }
        display(secLeft);
    }, 1000)
}

function display(second) {
    const min = Math.floor(second / 60);
    const sec = second % 60;
    const display = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    timerDisplay.innerHTML = display;
    document.title = display;

}

function displayEnd(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const min = end.getMinutes();
    endTime.innerHTML = `Be back at 0${hour < 12 ? hour : hour - 12}:${min < 10 ? '0' : ''}${min}`;
}

function set() {
    const sec = parseInt(this.dataset.time);
    timer(sec);
}

buttons.forEach(button => button.addEventListener('click', set));

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const min = this.minutes.value;
    timer(min * 60);
    this.reset();
})

