// Get the canvas context
var ctx = document.getElementById('circularLoader').getContext('2d');
var al = 0;
var start = 4.72;
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;
var sim;

// Function to simulate progress
function progressSim() {
    diff = ((al / 100) * Math.PI * 2 * 10).toFixed(2);
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = 17;
    ctx.fillStyle = '#4285f4';
    ctx.strokeStyle = "#4285f4";
    ctx.textAlign = "center";
    ctx.font = "28px monospace";
    ctx.fillText(al + '%', cw * .52, ch * .5 + 5, cw + 12);
    ctx.beginPath();
    ctx.arc(100, 100, 75, start, diff / 10 + start, false);
    ctx.stroke();
    if (al >= 100) {
        clearTimeout(sim);
        // Show confetti when progress completes
        showConfetti();
        // Show modal and hide loader
        myModal.show();
        loader.style.display = 'none';
    }
    al++;
}

// Function to show confetti
function showConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(confetti);

        confetti.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(100vh)' }
        ], {
            duration: 1000,
            iterations: 1
        });

        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Modal initialization
var myModal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
});

// Event listener for the "winner" button
const win = document.querySelector("#winner");
const loader = document.querySelector(".loader-con");

win.addEventListener('click', function() {
    loader.style.display = 'block';
    sim = setInterval(progressSim, 20);
});
