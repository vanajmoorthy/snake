function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.justAte = false;
    this.tail = [];
    this.count = 0;

    this.eat = function (pos) {
        var d = dist(this.x + 10, this.y + 10, pos.x + 10, pos.y + 10);
        return d < 10;
    }

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.die = function () {
        isDiagnosedWithDie = false;
        this.x = 0;
        this.y = 0;
        this.count = 0;
        this.tail = [];
        this.xspeed = 1;
        this.yspeed = 0;
    }

    this.checkIfDead = function () {
        if (this.x < 0 || this.x > width - scl || this.y < 0 || this.y > height - scl) {
            this.performDeath();
            return;
        }
        for (var i = 0; i < this.tail.length - 1; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.performDeath();
            }
        }
    }

    this.performDeath = function () {
        isDiagnosedWithDie = true;
        var snake = this;
        setTimeout(function () {
            snake.die();
        }, 3500);
    }

    this.update = function (shouldAdd) {

        this.x += this.xspeed * scl;
        this.y += this.yspeed * scl;

        // this.x = constrain(this.x, 0, width - scl);
        // this.y = constrain(this.y, 0, height - scl);

        var head = createVector(this.x, this.y);

        if (!shouldAdd) {
            this.tail.shift();
        }

        this.tail.push(head);
    }

    this.show = function () {
        fill(255, 0, 0);
        for (var i = 0; i < this.tail.length - 1; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(255, 0, 0);
        rect(this.x, this.y, scl, scl);
    }
}
