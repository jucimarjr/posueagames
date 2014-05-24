
'use strict';

var Asteroid = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('rotate');
//  this.game.physics.arcade.enableBody(this);
};

Asteroid.prototype = Object.create(Phaser.Sprite.prototype);
Asteroid.prototype.constructor = Bird;

Asteroid.prototype.update = function() {
  if(this.angle < 90) {
    this.angle += 2.5;
  }
};


Asteroid.prototype.rotate = function() {
  // rotate the bird to -40 degrees
  this.game.add.tween(this).to({angle: -40}, 100).start();
};

Asteroid.prototype.revived = function() { 
};

module.exports = Asteroid;
