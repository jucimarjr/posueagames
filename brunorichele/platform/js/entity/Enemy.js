var EnemyBase = {
}

var SkullBase = {
    name : 'skull',
    path : 'assets/phase2/enemy/skull_260-41-4.png',
    width : 65,
    height : 41,
    default : [2, 3],
    objLayer : 'skulls',
    objId : 5,
    velx : 30
}

var WormBase = {
    name : 'worm',
    path : 'assets/phase3/map/vermes_240-18-3.png',
    width : 80,
    height : 18,
    default : [0, 1, 2],
    objLayer : 'worms',
    objId : 7,
    velx : 13
}

var MonsterBase = {
    name : 'monster',
    path : 'assets/images/enemy/monstro_200-35-4.png',
    width : 50,
    height : 35,
    default : [0, 1, 2, 3],
    objLayer : 'monster',
    objId : 8,
    velx : 20
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

    var i;
    for (i = 0; i < enemies.children.length; i++) {
        enemies.children[i].anchor.set(.5);
    }

    enemies.callAll('animations.add', 'animations', 'default', this.enemy.default, 4, true);
    enemies.callAll('animations.play', 'animations', 'default');

    this.movement(enemies);
}

Enemy.prototype.movement = function(enemies) {
    // TODO movimento do inimigo
}

Enemy.prototype.update = function(player) {
    var i;
    for (i = 0; i < enemies.children.length; i++) {
        enemy = enemies.children[i];
        if (player.player.body.x > enemy.body.x) {
            enemy.body.velocity.x = this.enemy.velx;
            enemy.scale.x = +1;
        } else if (player.player.body.x < enemy.body.x) {
            enemy.body.velocity.x = -this.enemy.velx;
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
        game.add.tween(enemies.children[i]).to({y : enemies.children[i].body.y - 180}, 1500, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
    }
}

function Worm() {
    Enemy.call(this, WormBase);
}
Worm.prototype = new Enemy();
Worm.prototype.constructor = Worm;

function Monster() {
    Enemy.call(this, MonsterBase);
}
Monster.prototype = new Enemy();
Monster.prototype.constructor = Monster;

Monster.prototype.movement = function(enemies) {
    enemies.physicsBodyType = Phaser.Physics.P2JS;
    var i;
    for(i = 0; i < enemies.children.length; i++) {
        enemy = enemies.children[i];
        game.physics.p2.enable(enemy);
        enemy.body.fixedRotation = true;
        enemy.body.mass = 9999;
    }
}