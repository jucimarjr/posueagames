function Control(game, player, cursors) {
    this.game = game,
    this.player = player,
    this.cursors = cursors,
    this.jumpTimer = 0;
}

Control.prototype = {
    update : function(cursors) {
        this.processInput();
        this.player.update();
    },

    processInput : function() {
        if (this.cursors.up.isDown && this.game.time.now > this.jumpTimer && this.checkIfCanJump()) {
            this.player.state = PlayerState.JUMPING;
            this.player.player.body.velocity.y = PlayerProperties.velJump;
            this.jumpTimer = this.game.time.now + 750;
        }

        if (this.player.state != PlayerState.JUMPING) {
            if (this.cursors.left.isDown) {
                this.player.state = PlayerState.RUNNING;
                this.player.player.body.velocity.x = -PlayerProperties.velRun;
                this.player.player.scale.x = -1;
            } else if (this.cursors.right.isDown) {
                this.player.state = PlayerState.RUNNING;
                this.player.player.body.velocity.x = PlayerProperties.velRun;
                this.player.player.scale.x = +1;
            } else {
                if (this.player.state != PlayerState.JUMPING) {
                    this.player.state = PlayerState.IDLE;
                    this.player.player.body.velocity.x = 0;
                }
            }
        }

        if (this.player.player.body.velocity.y <= 0 && this.player.state != PlayerState.RUNNING) {
            this.player.state = PlayerState.IDLE;
        }
    },

    checkIfCanJump : function() {
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;
        for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = this.game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === this.player.player.body.data || c.bodyB === this.player.player.body.data) {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === this.player.player.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }
        return result;
    }
}