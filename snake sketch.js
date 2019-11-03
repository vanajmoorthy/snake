var s;
var scl = 30;
var food;
highScore = 0;
isDiagnosedWithDie = false;

function setup() {
    frameRate(9);
    createCanvas(691, 691, P2D);
    s = new Snake();
    pickLocation();
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {
    background(47);
    var justAte = s.eat(food);

    if (!isDiagnosedWithDie) {
        s.update(justAte);
        s.checkIfDead();
    }

    if (justAte) {
        pickLocation();
        s.count++;
    }

    fill(29, 167, 234);
    rect(food.x, food.y, scl, scl);
    console.log(s.count);
    noStroke();

    fill(255);
    text("Score: " + s.count, 20, 30);

    s.show();

    fill(255);

    if (isDiagnosedWithDie) {
        push();
        textSize(25);
        textAlign(CENTER, CENTER);
        translate(width/2, height/2);
        text("I have diagnosed you with a big case of die. \n\nYour final score was: " + s.count, 0, 0);
        pop();
        if (s.count > highScore) {
            highScore = s.count;
            localStorage.setItem("scoreList", highScore);
        }
    }


    text("Session Highscore: " + highScore, 20, 50);
}

var p = 0;
var q = 0;

function keyPressed() {
    if (keyCode === UP_ARROW && q != 1) {
        q = -1;
        p = 0;
        s.dir(0, q);
    } else if (keyCode === DOWN_ARROW && q != -1) {
        q = 1;
        p = 0;
        s.dir(0, q);
    } else if (keyCode === RIGHT_ARROW && p != -1) {
        p = 1;
        q = 0;
        s.dir(p, 0);
    } else if (keyCode === LEFT_ARROW && p != 1) {
        p = -1;
        q = 0;
        s.dir(p, 0);
    }
}

