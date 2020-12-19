"use strict";
// Getting the HTML elements!
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const ctx = canvas.getContext('2d');

// Setting default variables.
let size = 10;
let isPressed = false;
let color = 'black';
let x = undefined;
let y = undefined;

// Mousedown event listener.
canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    
    x= e.offsetX;
    y= e.offsetY;
})

// Mouseup event listener.
canvas.addEventListener('mouseup', (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
})

// Mousemove event listener.
canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x, y);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
})

/**
 * Draws a circle.
 * @param {number} x 
 * @param {number} y 
 */
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    //console.log(typeof x);
}

/**
 * Draws a line.
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 */
function drawLine(x1,y1, x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

/**
 * Increases the pen size on click.
 */
increaseBtn.addEventListener('click', () => {
    size += 5;
    if(size > 50) {
        size = 50;
    }
    updateSizeOnScreen()
});

/**
 * Decreases the pen size on click.
 */
decreaseBtn.addEventListener('click', () => {
    size -= 5;
    if(size < 5) {
        size = 5;
    }
    updateSizeOnScreen()
});

/**
 * Changes the color of the pen.
 */
colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

/**
 * Updates the size on screen.
 */
function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

/**
 * Clears the canvas.
 */
clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
})

// drawCircle(50, 50);