var s;
var scl = 30;
var food;
var highScore = 0;
isDiagnosedWithDie = false;

function setup() {
    frameRate(9);
    createCanvas(600, 600, P2D);
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
    background(51);
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
    fill(255);
    text("Score: " + s.count, 20, 30);

    s.show();

    fill(255);

    if (isDiagnosedWithDie) {
        push();
        textSize(25);
        text("I have diagnosed you with a big case of die. \n\nYour final score was: " + s.count, 50, 250);
        pop();
        if (s.count > highScore) {
            highScore = s.count;
        }
    }


    text("Highscore: " + highScore, 20, 50);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}

