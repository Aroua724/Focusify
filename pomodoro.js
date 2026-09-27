let timer;
let totalSeconds = 25 * 60; // 25 دقيقة بالثواني
let isRunning = false;

const startbtn = document.querySelector('.start-btn');
const timerdisplay = document.querySelector('.timer-display');

startbtn.addEventListener('click', function () {
    if (!isRunning) {
        isRunning = true;
        startbtn.textContent = "PAUSE";

        timer = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;

                timerdisplay.textContent =
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                clearInterval(timer);
                // في مكان انتهاء الوقت لديكِ، قومي بإضافة هذا السطر:
                playAlarmSound();

                isRunning = false;
                startbtn.textContent = "START";
            }
        }, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        startbtn.textContent = "START";
    }
});
function playAlarmSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;

        // دالة مساعدة لتوليد النغمة
        function createBeep(freq, delay, duration) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + delay);

            gain.gain.setValueAtTime(0.3, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now + delay);
            osc.stop(now + delay + duration);
        }

        // تشغيل نغمات التنبيه بتسلسل زمني صحيح
        createBeep(587.33, 0, 0.2);
        createBeep(880, 0.25, 0.3);
        createBeep(587.33, 0.6, 0.2);
        createBeep(880, 0.85, 0.4);

    } catch (e) {
        console.log("Web Audio API not supported:", e);
    }
}