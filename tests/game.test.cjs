const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const original = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');

// Simulate the graphics API for logic tests; the real library is tested in a browser.
function game(overrides = {}) {
    let time = 1000;
    const timers = new Set();
    class Shape {
        constructor(value) { this.value = value; }
        setPosition(x, y) { this.x = x; this.y = y; }
        setColor(colour) { this.colour = colour; }
        setText(text) { this.text = text; }
        getX() { return this.x; }
        getY() { return this.y; }
        move(dx, dy) { this.x += dx; this.y += dy; }
    }
    const sandbox = {
        Circle: Shape, Text: Shape, Date: { now: () => time },
        add() {}, removeAll() {}, setBackgroundColor() {},
        getWidth: () => 480, getHeight: () => 360,
        mouseClickMethod() {}, keyDownMethod() {},
        setTimer: fn => timers.add(fn), stopTimer: fn => timers.delete(fn),
        Randomizer: { nextInt: (min, max) => Math.floor((min + max) / 2) }
    };
    vm.createContext(sandbox);
    let source = original;
    for (const [key, value] of Object.entries(overrides)) {
        source = source.replace(new RegExp('const ' + key + ' = [^;]+;'), 'const ' + key + ' = ' + JSON.stringify(value) + ';');
    }
    vm.runInContext(source, sandbox);
    const run = code => vm.runInContext(code, sandbox);
    run('main()');
    return { run, advance: ms => { time += ms; }, timers };
}

test('idle clicks cannot score; a hit scores and a miss does not', () => {
    const g = game();
    const hit = 'handleClick({getX:()=>target.getX(),getY:()=>target.getY()})';
    g.run(hit); assert.equal(g.run('score'), 0);
    g.run('startRound()'); g.run(hit); assert.equal(g.run('score'), 1);
    g.run('handleClick({getX:()=>0,getY:()=>0})'); assert.equal(g.run('score'), 1);
    assert.equal(g.run('target.colour'), '#8ed8c3');
});
test('hit test includes the circle boundary and rejects an outside point', () => {
    const g = game();
    assert.equal(g.run('isTargetHit(240 + TARGET_RADIUS,180)'), true);
    assert.equal(g.run('isTargetHit(241 + TARGET_RADIUS,180)'), false);
});
test('restarting discards unfinished score and leaves exactly one timer', () => {
    const g = game();
    g.run('startRound(); score=4; startRound(); startRound()');
    assert.equal(g.run('score'),0); assert.equal(g.run('roundScores.length'),0);
    assert.equal(g.timers.size,1); assert.equal(g.run('secondsLeft'),30);
});
test('deadline blocks a late hit and records the result only once', () => {
    const g = game(); g.run('startRound(); score=3'); g.advance(30000);
    g.run('handleClick({getX:()=>target.getX(),getY:()=>target.getY()}); finishRound()');
    assert.equal(g.run('score'),3); assert.equal(g.run('playing'),false);
    assert.equal(g.run('roundScores.length'),1); assert.equal(g.run('secondsLeft'),0);
    assert.equal(g.timers.size,0);
});
test('timer expires and best score is computed from completed rounds', () => {
    const g = game(); g.run('startRound(); score=7'); g.advance(30001); g.run('tick()');
    g.run('startRound(); score=2'); g.advance(30001); g.run('tick()');
    assert.equal(g.run('roundScores.length'),2); assert.equal(g.run('getBestScore()'),7);
});
test('moving target stays within horizontal bounds and reverses', () => {
    const g = game({ TARGET_SPEED: 6 });
    g.run('target.setPosition(479,180); direction=1; moveTarget()');
    assert.equal(g.run('target.getX()'),452); assert.equal(g.run('direction'),-1);
    g.run('target.setPosition(1,180); moveTarget()');
    assert.equal(g.run('target.getX()'),28); assert.equal(g.run('direction'),1);
});
test('student settings change duration, points, size and colours', () => {
    const g = game({ ROUND_SECONDS:15, POINTS_PER_HIT:5, TARGET_RADIUS:18, TARGET_COLOURS:['red'] });
    g.run('startRound(); handleClick({getX:()=>240,getY:()=>180})');
    assert.equal(g.run('score'),5); assert.equal(g.run('secondsLeft'),15);
    assert.equal(g.run('target.colour'),'red'); assert.equal(g.run('target.value'),18);
});
test('invalid editable settings produce useful errors', () => {
    for (const config of [{ROUND_SECONDS:0},{TARGET_RADIUS:200},{POINTS_PER_HIT:-1},{TARGET_SPEED:20},{TARGET_COLOURS:[]}]) {
        assert.throws(() => game(config), new RegExp(Object.keys(config)[0]));
    }
});
