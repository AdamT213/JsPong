var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60)
};
var canvas = document.createElement("canvas");
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 300);

var keysDown = {};

var render = function () {
<<<<<<< HEAD
  context.fillStyle = "#000000";
=======
  context.fillStyle = "#FF00FF";
>>>>>>> 7ac3a0fbd4750102ea6ed850fb083809592d2906
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

var update = function () {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};

var step = function () {
  update();
  render();
  animate(step);
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function () {
  context.fillStyle = "#00ffff";
  context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if (this.x < 0) {
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 800) {
    this.x = 800 - this.width;
    this.x_speed = 0;
  }
};

function Computer() {
  this.paddle = new Paddle(400, 10, 50, 10);
  this.goalzone = new Goalzone(300, 10, 200, 30);
}

Computer.prototype.render = function () {
  this.paddle.render();
  this.goalzone.render();
};

Computer.prototype.update = function (ball) {
  var x_pos = ball.x;
  var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
  if (diff < 0 && diff < -8) {
    diff = -30;
  } else if (diff > 0 && diff > 8) {
    diff = 30;
  }
  this.paddle.move(diff, 0);
  if (this.paddle.x < 0) {
    this.paddle.x = 0;
  } else if (this.paddle.x + this.paddle.width > 800) {
    this.paddle.x = 800 - this.paddle.width;
  }
};

function Player() {
  this.paddle = new Paddle(400, 590, 50, 10);
  this.goalzone = new Goalzone(300, 590, 200, 30);
}

Player.prototype.render = function () {
  this.paddle.render();
  this.goalzone.render();
};

Player.prototype.update = function () {
  for (var key in keysDown) {
    var value = Number(key);
    if (value == 37) {
      this.paddle.move(-16, 0);
    } else if (value == 39) {
      this.paddle.move(16, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 12;
}

Ball.prototype.render = function () {
  context.beginPath();
  context.arc(this.x, this.y, 5, 2 * Math.PI, false);
  context.fillStyle = "#00ffff";
  context.fill();
};

Ball.prototype.update = function (paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if (this.x - 5 < 0) {
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if (this.x + 5 > 800) {
    this.x = 795;
    this.x_speed = -this.x_speed;
  }

  if ((this.y < 0 || this.y > 600) && this.x > 300 && this.x < 500) {
    this.x_speed = 0;
    this.y_speed = 12;
    this.x = 400;
    this.y = 300;
  } else if (this.y < 0 && (this.x < 300 || this.x > 500)) {
    this.y = 5;
    this.y_speed = -this.y_speed;
  } else if (this.y > 600 && (this.x < 300 || this.x > 500)) {
    this.y = 585;
    this.y_speed = -this.y_speed;
  }

  if (top_y > 300) {
    if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      this.y_speed = -12;
      this.x_speed += (paddle1.x_speed * 2);
      this.y += this.y_speed;
    }
  } else {
    if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      this.y_speed = 12;
      this.x_speed += (paddle2.x_speed * 2);
      this.y += this.y_speed;
    }
  }
};

function Goalzone(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Goalzone.prototype.render = function () {
  context.fillStyle = "(127,0,0)";
  context.fillRect(this.x, this.y, this.width, this.height);
};

window.onload = function () {
  document.body.appendChild(canvas);
  animate(step);
};

window.addEventListener("keydown", function (event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
  delete keysDown[event.keyCode];
});



