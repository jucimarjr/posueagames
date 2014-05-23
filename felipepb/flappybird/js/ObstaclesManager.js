BasicGame.ObstaclesManager = function (gameManager, obstaclesGroup) {
    var groundHeight = gameManager.cache.getImage('ground').height;

    this.gameManager = gameManager;
    this.obstaclesGroup = obstaclesGroup;
    this.obstacles = new Array();
  
    this._obstacleWidth = gameManager.cache.getImage('pipe').width;
    this._obstaclesHorizontalMargin = this._obstacleWidth * 2;
    this._obstaclesVerticalMargin = 40;
    this._obstaclesGap = 200;
    this._obstaclesMinY = this._obstaclesGap / 2.0 + this._obstaclesVerticalMargin;
    this._obstaclesMaxY = gameManager.camera.height - this._obstaclesMinY - groundHeight;
};

BasicGame.ObstaclesManager.prototype = {
    random: function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    },

    create: function () {
        var count = Math.ceil(this.gameManager.camera.width / this._obstaclesHorizontalMargin);
        var obstacleWidth = this._obstacleWidth;
        var cameraWidth = this.gameManager.camera.width;
        
        // console.log("count: " + count + " | " + this._obstaclesMinY + " | " + this._obstaclesMaxY);

        for (var i = 0; i < count; i++) {
            var randomY = this.random(this._obstaclesMinY, this._obstaclesMaxY);
            // console.log("randomY: " + randomY);
            var obstacle = new BasicGame.Obstacle(this.gameManager,
                								  this.obstaclesGroup);
            obstacle.create();
            obstacle.setGap(cameraWidth + (obstacleWidth / 2.0) + i * this._obstaclesHorizontalMargin,
                						   randomY,
                						   this._obstaclesGap);
            this.obstacles.push(obstacle);
        }

    },

    update: function () {
        var obstacles = this.obstacles;
        var length = obstacles.length;
        var obstacleToMove = null;

        for (var i = 0; i < length; i++) {
            obstacles[i].update();
            if (obstacles[i].x() <= -obstacles[i].spriteWidth() / 2.0) {
                obstacleToMove = obstacles[i];
            }
        }

        if (obstacleToMove) {
            var randomY = this.random(this._obstaclesMinY, this._obstaclesMaxY);
            obstacleToMove.setGap(obstacles[length - 1].x() + this._obstaclesHorizontalMargin,
                				  randomY,
                				  this._obstaclesGap);

            var firstObstacle = obstacles[0];
            for (var i = 0; i < length - 1; i++) {
                obstacles[i] = obstacles[i + 1];
            }
            obstacles[length - 1] = firstObstacle;
        }
    }
};