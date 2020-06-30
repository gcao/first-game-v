function preload() {
  this.load.image('player', 'BLUESQUARE.png');
  this.load.image('player2', 'GREENSQUARE.png');
  this.load.image('barrier', 'BLACKSQUARE.png');
  this.load.image('ball', 'REDSQUARE.png');
  this.load.image('goal', 'ORANGESQUARE.png');
  this.load.image('goal2', 'ORANGESQUARE.png');
}

var score = 0
var score2 = 0
var scoreText;
var scoreText2;

function create() {
  scoreText = this.add.text(16, 16, '0', { fontSize: '32px', fill: '#000' });
  scoreText2 = this.add.text(463, 16, '0', { fontSize: '32px', fill: '#000' });

  this.goal = this.physics.add.image(config.width / 1, config.height / 2, 'goal').setScale(0.1, 0.75);

  this.goal2 = this.physics.add.image(config.width / 500, config.height / 2, 'goal2').setScale(0.075, 0.75);

  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

  this.player = this.physics.add.image(config.width / 1.5, config.height / 2, 'player').setScale(0.25, 0.25);
  this.player.setCollideWorldBounds(true);
  this.player.setBounce(1);

  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

  this.player2 = this.physics.add.image(config.width / 3, config.height / 2, 'player2').setScale(0.25, 0.25);
  this.player2.setCollideWorldBounds(true);
  this.player2.setBounce(1);

  this.ball = this.physics.add.image(config.width / 2, config.height / 2, 'ball').setScale(0.1, 0.1)
  this.ball.setCollideWorldBounds(true);
  this.ball.setBounce(1.1);

  this.barrier = this.add.image(config.width / 2, config.height / 2, 'barrier').setScale(0.05, 2);

  this.physics.add.collider(this.player, this.barrier);
  this.physics.add.collider(this.player2, this.barrier);
  this.physics.add.collider(this.player, this.player2);
  this.physics.add.collider(this.player, this.ball);
  this.physics.add.collider(this.player2, this.ball);
  this.physics.add.overlap(this.goal2, this.ball, goalIn, null, this);
  this.physics.add.overlap(this.goal, this.ball, goalIn2, null, this);

  var ball = this.ball;
  var goal = this.goal;
  var goal2 = this.goal2;
  var goal = this.goal;
}

function update() {
  let cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown || cursors.right.isDown) this.player.setVelocityX(cursors.left.isDown ? -160 : 160);
  else this.player.setVelocityX(0);
  if (cursors.up.isDown || cursors.down.isDown) this.player.setVelocityY(cursors.up.isDown ? -160 : 160);
  else this.player.setVelocityY(0);

  this.input.keyboard.createCursorKeys();
  if (this.a.isDown || this.d.isDown) this.player2.setVelocityX(this.a.isDown ? -160 : 160);
  else this.player2.setVelocityX(0);
  if (this.w.isDown || this.s.isDown) this.player2.setVelocityY(this.w.isDown ? -160 : 160);
  else this.player2.setVelocityY(0);
}

function goalIn(ball, goal) {
  this.goal2.disableBody(true, true);
  this.ball.disableBody(true, true);
  score += 1;
  scoreText2.setText(score);
}

function goalIn2(ball, goal2) {
  this.goal.disableBody(true, true);
  this.ball.disableBody(true, true);
  score2 += 1;
  scoreText.setText(score2);
}

function reset() {

}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 400,
  backgroundColor: '#f9f9f9',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);