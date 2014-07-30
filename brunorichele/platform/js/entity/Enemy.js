var EnemyBase = {
}

var SkullBase = {
    name : 'skull',
    path : 'assets/phase2/enemy/skull_260-41-4.png',
    width : 65,
    height : 41,
    default : [2, 3],
    objLayer : 'skulls',
    objId : 5
}

var WormBase = {
    name : 'worm',
    path : 'assets/phase3/map/vermes_240-18-3.png',
    width : 80,
    height : 18,
    default : [0, 1, 2],
    objLayer : 'worms',
    objId : 7
}

function Enemy(enemy) {
    this.enemy = enemy,
    this.enemies;
}

Enemy.prototype.preload = function() {
    game.load.spritesheet(this.enemy.name, this.enemy.path, this.enemy.width, this.enemy.height);
}

Enemy.prototype.create = function(mymap) {
    enemies = game.add.group();
    enemies.enableBody = true;
    mymap.createFromObjects(this.enemy.objLayer, this.enemy.objId, this.enemy.name, 0, true, false, enemies);

    enemies.callAll('animations.add', 'animations', 'default', this.enemy.default, 4, true);

    this.movement(enemies);
}

Enemy.prototype.movement = function(enemies) {
    console.log('movement');
}

Enemy.prototype.update = function(player) {
    var i;
    for (i = 0; i < enemies.children.length; i++) {
        enemy = enemies.children[i];
        if (player.player.body.x > enemy.body.x) {
            enemy.body.velocity.x = 20;
            enemy.scale.x = +1;
        } else if (player.player.body.x < enemy.body.x) {
            enemy.body.velocity.x = -20;
            enemy.scale.x = -1;
        }
        if(this.checkCollision(player.player, enemy)) {
            player.state = PlayerState.BURNING;
        }
    }
}

Enemy.prototype.checkCollision = function(player, enemy) {
    var playerBounds = player.getBounds();
    var enemyBounds = enemy.getBounds();
    return Phaser.Rectangle.intersects(playerBounds, enemyBounds);
}

function Skull() {
    Enemy.call(this, SkullBase);
}
Skull.prototype = new Enemy();
Skull.prototype.constructor = Skull;

Skull.prototype.movement = function(enemies) {
    var i;
    for(i = 0; i < enemies.children.length; i++) {
        game.add.tween(enemies.children[i]).to({y : enemies.children[i].body.y - 80}, 800, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
    }
}

function Worm() {
    Enemy.call(this, WormBase);
}
Worm.prototype = new Enemy();
Worm.prototype.constructor = Worm;