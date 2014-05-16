function Game(id, width, height) {
    this.id = id;
    this.width = width;
    this.height = height;

    //game components
    this.player = null;
    this.ball = null;
    this.level = null;
    this.canvas = null;
    this.context = null;

    //sound components
    this.bgSound = null;
    this.destroySound = null;
    this.gameOverSound = null;
    this.missBallSound = null;
    this.winSound = null;

    //hud
    this.hud = null;

    //key handlers
    this.keys = {
        left: false,
        right: false
    };

    this.posicaoInicial = this.height / 2;
    this.timer = null;
    this.delay = 0;

    //game fps
    this.stats = null;
}

Game.prototype.init = function () {
    this.canvas = document.getElementById(this.id);
    this.context = this.canvas.getContext('2d');

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.player = new Player((this.width - 40) / 2, this.height - 30, 80, 15, ImageLoader.get('player'));

    this.ball = new Ball(this.width / 2, this.height / 2, 10, ImageLoader.get('ball'));
    this.ball.speed = 15;
    this.ball.angle = 0;

    this.level = new Level();
    this.level.init();
    
    this.bgSound = new Audio("assets/audio/background.wav");
    this.destroySound = new Audio("assets/audio/explosion.wav");
    this.gameOverSound = new Audio("assets/audio/gameOver.wav");
    this.missBallSound = new Audio("assets/audio/missBall.wav");
    this.winSound = new Audio("assets/audio/winGame.mp3");
    
    this.hud = new HUD({
        'top' : 20,
        'amountOfLifes': 5,
        'lifeImage': ImageLoader.get('ball')
    });

    this.stats = this.initStats();
};

Game.prototype.start = function () {
    var self = this;
    
    this.bgSound.loop = true;
    this.bgSound.play();            
    
    this.timer = setInterval(function () {
        self.update();
        self.stats.update();
    }, 30);
};

Game.prototype.update = function () {   

    //move player
    if (this.keys.right != this.keys.left) {
        if (this.keys.left) {
            if (this.player.x > 0) {
                this.player.moveLeft();
            }
        } else {
            if (this.player.x < (this.width - this.player.width)) {
                this.player.moveRight();
            }
        }
    }

    if (this.delay <= 0) {
        //move ball
        if (this.player.collidesWithBall(this.ball)) {
            this.ball.diretionUp = true;
            if (this.keys.right) {
                this.ball.angle = Math.floor(Math.random() * 10) - 9;
            }
            else {
                this.ball.angle = Math.floor((Math.random() * 10));
            }
        }

        if ((this.ball.y - this.ball.radius) <= 0) {
            this.ball.diretionUp = false;            
        }

        if ((this.ball.x - this.ball.radius <= 0) || (this.ball.x + this.ball.radius > this.width)) {
            this.ball.angle = this.ball.angle * -1;
        }

        this.ball.x += this.ball.angle;

        if (this.ball.diretionUp) {
            this.ball.y -= this.ball.speed;
        } else {
            this.ball.y += this.ball.speed;
        }                    
    }              

    //miss
    if (this.ball.y > this.height) {
    	    	
        if (this.delay === 0) {
            this.hud.updateLifes(-1);
            this.missBallSound.play();
        }

        if (this.delay >= 50) {
            this.ball.x = this.width / 2;
            this.ball.y = this.height / 2;
            this.ball.diretionUp = false;
            this.ball.angle = 0;
            this.delay = 0;
        }
        else {
            this.delay++;
        }
    }

    //destroy bars
    for (var i in this.level.bars) {
        var colisao = this.level.bars[i].collidesWithBall(this.ball);

        if (colisao) {
            this.level.bars.splice(i, 1);
            this.ball.diretionUp = !this.ball.diretionUp;
            this.hud.updateScore(1);
            this.destroySound.play();
            this.destroySound.currentTime = 0;
        }
    }

    //check game over
    if (this.hud.getLifes() < 1) {
        this.gameOver(this.context);
        return;
    }

    //check player is winner
    if (!this.level.hasBars()) {
        this.gameWin(this.context);
        return;
    }

    this.clear();

    //render all
    this.level.draw(this.context);

    this.player.draw(this.context);

    this.ball.draw(this.context);

    this.hud.draw(this.context);    
};

Game.prototype.gameOver = function () {
    this.clear();

    this.context.font = '42pt Tr2n';
    this.context.fillStyle = '#00ffff';
    this.context.fillText('GAME OVER!', (this.width / 2) - 180, (this.height / 2) - 50);
    this.bgSound.pause();
    this.gameOverSound.play();    
    clearInterval(this.timer);
};

Game.prototype.gameWin = function () {
    this.clear();

    this.context.font = '42pt Tr2n';
    this.context.fillStyle = '#00ffff';
    this.context.fillText('YOU WIN!', (this.width / 2) - 130, (this.height / 2) - 50);    
    clearInterval(this.timer);
    this.bgSound.pause();
    this.winSound.play();
};

Game.prototype.clear = function () {
    this.canvas.width = this.canvas.width;
};

//===============================================================
// Game Stats
//===============================================================

Game.prototype.initStats = function() {

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );
    
    return stats;
};