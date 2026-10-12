/*
 * TARGET LAB - edit this file first.
 * Uses the real CodeHS graphics API: Circle, Text, add, setTimer,
 * mouseClickMethod, keyDownMethod and Randomizer.
 * browser.js calls main() once. Do not also call it at the bottom here.
 */

// ===== CHANGE THESE FIRST =====
const ROUND_SECONDS = 30;       // Try 15 or 45 (whole seconds from 1 to 120).
const TARGET_RADIUS = 28;       // Try 18 or 40 (10 to 60 pixels).
const POINTS_PER_HIT = 1;       // Try 5 (a positive whole number).
const TARGET_SPEED = 0;         // Try 1 or 2 for a moving target (0 to 6).
const TARGET_COLOURS = ["#f6b55b", "#8ed8c3", "#aebffc"];

// ===== GAME STATE =====
let target;
let message;
let score = 0;
let secondsLeft = ROUND_SECONDS;
let playing = false;
let roundEndsAt = 0;
let direction = 1;
let colourIndex = 0;
let roundScores = [];          // An array: one entry per completed round.

function main() {
    checkSettings();
    removeAll();
    setBackgroundColor("#142e43");
    makeTarget();
    message = new Text("Click Start round or press R", "16pt Arial");
    message.setColor("#ffffff");
    message.setPosition(24, 40);
    add(message);
    mouseClickMethod(handleClick);
    keyDownMethod(handleKey);
}

// A parameter makes this helper reusable with different target colours.
function setTargetColour(colour) {
    target.setColor(colour);
}

function makeTarget() {
    target = new Circle(TARGET_RADIUS);
    target.setPosition(getWidth() / 2, getHeight() / 2);
    setTargetColour(TARGET_COLOURS[0]);
    add(target);
}

function startRound() {
    // Stop the previous timer so restarting cannot make the game speed up.
    stopTimer(tick);
    score = 0;
    secondsLeft = ROUND_SECONDS;
    playing = true;
    direction = 1;
    colourIndex = 0;
    target.setPosition(getWidth() / 2, getHeight() / 2);
    setTargetColour(TARGET_COLOURS[0]);
    roundEndsAt = Date.now() + ROUND_SECONDS * 1000;
    message.setText("Click the target!");
    setTimer(tick, 20);
}

function tick() {
    // Elapsed time keeps the deadline correct even if the tab is inactive.
    secondsLeft = Math.max(0, Math.ceil((roundEndsAt - Date.now()) / 1000));
    if (secondsLeft === 0) {
        finishRound();
        return;
    }
    moveTarget();
}

function moveTarget() {
    target.move(TARGET_SPEED * direction, 0);
    if (target.getX() >= getWidth() - TARGET_RADIUS) {
        target.setPosition(getWidth() - TARGET_RADIUS, target.getY());
        direction = -1;
    } else if (target.getX() <= TARGET_RADIUS) {
        target.setPosition(TARGET_RADIUS, target.getY());
        direction = 1;
    }
}

function handleClick(event) {
    if (!playing) {
        return;
    }
    // A late click cannot earn points after the deadline.
    if (Date.now() >= roundEndsAt) {
        secondsLeft = 0;
        finishRound();
        return;
    }
    if (isTargetHit(event.getX(), event.getY())) {
        score = score + POINTS_PER_HIT;
        colourIndex = (colourIndex + 1) % TARGET_COLOURS.length;
        setTargetColour(TARGET_COLOURS[colourIndex]);
        relocateTarget();
    }
}

// Return a Boolean: the squared distance avoids needing a square root.
function isTargetHit(x, y) {
    let dx = x - target.getX();
    let dy = y - target.getY();
    return dx * dx + dy * dy <= TARGET_RADIUS * TARGET_RADIUS;
}

function relocateTarget() {
    let x = Randomizer.nextInt(TARGET_RADIUS, getWidth() - TARGET_RADIUS);
    let y = Randomizer.nextInt(90 + TARGET_RADIUS, getHeight() - TARGET_RADIUS);
    target.setPosition(x, y);
}

function finishRound() {
    if (!playing) {
        return;                 // Record each completed round only once.
    }
    playing = false;
    stopTimer(tick);
    roundScores.push(score);
    message.setText("Round over! Score: " + score);
}

function handleKey(event) {
    if (event.keyCode === 82 && !event.repeat) {  // R
        startRound();
    }
}

function getBestScore() {
    let best = 0;
    for (let i = 0; i < roundScores.length; i++) {
        if (roundScores[i] > best) {
            best = roundScores[i];
        }
    }
    return best;
}

// Keep edits inside a useful range; errors appear below the game.
function checkSettings() {
    if (!Number.isInteger(ROUND_SECONDS) || ROUND_SECONDS < 1 || ROUND_SECONDS > 120) {
        throw new Error("ROUND_SECONDS must be a whole number from 1 to 120.");
    }
    if (!Number.isFinite(TARGET_RADIUS) || TARGET_RADIUS < 10 || TARGET_RADIUS > 60) {
        throw new Error("TARGET_RADIUS must be between 10 and 60.");
    }
    if (!Number.isInteger(POINTS_PER_HIT) || POINTS_PER_HIT < 1) {
        throw new Error("POINTS_PER_HIT must be a positive whole number.");
    }
    if (!Number.isFinite(TARGET_SPEED) || TARGET_SPEED < 0 || TARGET_SPEED > 6) {
        throw new Error("TARGET_SPEED must be between 0 and 6.");
    }
    if (!Array.isArray(TARGET_COLOURS) || TARGET_COLOURS.length === 0) {
        throw new Error("Add at least one colour to TARGET_COLOURS.");
    }
}
