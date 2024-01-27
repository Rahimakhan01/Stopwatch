let timer;
let isRunning = false;
let startTime;
let lapCount = 1;

function startPause() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('startPause').textContent = 'Pause';
        startTime = new Date().getTime() - (lapCount > 1 ? lapCount - 1 : 0) * 1000 * 60;
        timer = setInterval(updateDisplay, 10);
    } else {
        isRunning = false;
        document.getElementById('startPause').textContent = 'Resume';
        clearInterval(timer);
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startPause').textContent = 'Start';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '000';
    document.getElementById('lapList').innerHTML = '';
    lapCount = 1;
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const formattedTime = formatTime(lapTime);

        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            Lap ${lapCount}: ${formattedTime}
            <button class="delete" onclick="deleteLap(${lapCount})">Delete</button>
        `;
        document.getElementById('lapList').appendChild(lapItem);
        lapCount++;
    }
}

function deleteLap(lapNumber) {
    const lapItem = document.querySelector(`#lapList li:nth-child(${lapNumber})`);
    if (lapItem) {
        lapItem.remove();
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    displayTime(formattedTime);
}

function displayTime(time) {
    const [minutes, seconds, milliseconds] = time.split(':');
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('milliseconds').textContent = milliseconds;
}

function formatTime(time) {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000));
    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        ':' +
        String(milliseconds).padStart(3, '0')
    );
}
