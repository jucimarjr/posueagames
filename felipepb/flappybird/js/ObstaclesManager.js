BasicGame.ObstaclesManager = function (gameManager, obstaclesGroup) {
    var groundHeight = 40;

    this.gameManager = gameManager;
    this.obstaclesGroup = obstaclesGroup;
    this.obstacles = new Array();
  
    this._obstacleWidth = 165;
    this._obstaclesHorizontalMargin = this._obstacleWidth * 2;
    this._obstaclesVerticalMargin = 82;
    this._obstaclesGap = 200;
    this._obstaclesMinY = this._obstaclesGap / 2.0 + this._obstaclesVerticalMargin + 3;
    this._obstaclesMaxY = gameManager.camera.height - this._obstaclesMinY - groundHeight;
};

BasicGame.ObstaclesManager.prototype = {
    random: function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    },

    create: function () {
        var count = Math.ceil(this.gameManager.camera.width / this._obstaclesHorizontalMargin) + 1;
        var obstacleWidth = this._obstacleWidth;
        var cameraWidth = this.gameManager.camera.width;
        
        // console.log("count: " + count + " | " + this._obstaclesMinY + " | " + this._obstaclesMaxY);

        for (var i = 0; i < count; i++) {
            var randomY = this.random(this._obstaclesMinY, this._obstaclesMaxY);
            // console.log("randomY: " + randomY);
            var missionEvent = this.gameManager.missions.nextEventIndex();
            var type = missionEvent.isUnique ? BasicGame.Obstacle.Type.Hard : BasicGame.Obstacle.Type.Default;
            var obstacle = new BasicGame.Obstacle(this.gameManager,
                								  this.obstaclesGroup);
            obstacle.create();
            obstacle.setUp(cameraWidth + (obstacleWidth / 2.0) + i * this._obstaclesHorizontalMargin,
                						  randomY,
                						  this._obstaclesGap,
                                          missionEvent.name,
                                          type);
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
            var missionEvent = this.gameManager.missions.nextEventIndex();
            var type = missionEvent.isUnique ? BasicGame.Obstacle.Type.Hard : BasicGame.Obstacle.Type.Default;
            obstacleToMove.setUp(obstacles[length - 1].x() + this._obstaclesHorizontalMargin,
                				 randomY,
                				 this._obstaclesGap,
                                 missionEvent.name,
                                 type);

            var firstObstacle = obstacles[0];
            for (var i = 0; i < length - 1; i++) {
                obstacles[i] = obstacles[i + 1];
            }
            obstacles[length - 1] = firstObstacle;
        }
    }
};