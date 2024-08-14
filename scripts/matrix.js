// Initialising the canvas
var canvas = document.getElementById("matrix"),
ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = '0101011010011101011001101011011011010010110101010111110100011011100';
letters = letters.split('');

// Setting up the columns
var fontSize = 8,
columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
drops[i] = 1;
}

// Setting up the draw function
function draw() {
var x = 0;
ctx.fillStyle = 'rgba(34, 32, 54, 0.2)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "48px";
for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#3E8FB0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .99) {
        drops[i] = 0;
    }
}
}

// Loop the animation
setInterval(draw, 60);