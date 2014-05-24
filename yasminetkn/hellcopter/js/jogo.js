function restart(){
    if ( game.input.keyboard.isDown (Phaser.Keyboard.R) ) {
        //game.state.start('fase');
        document.location.reload(false);
    }
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    if(Phaser.Rectangle.intersects(boundsA, boundsB)){
        incrementCounter(spriteB);
    }

}


function createFuels(){
    fuel = fuels.create(game.world.width, game.rnd.integerInRange(30, game.world.height) - 100, 'fuel');
    if((fuel.y + fuel.height)>500 ){
        fuel.y += -200;
    }else if (fuel.y < 50){
        fuel.y+= 100;
    }else if ((fuel.y + fuel.height)<=200){
        fuel.y+=100;
    }

    fuel.body.velocity.x = -500;
    fuel.body.immovable = true;
    fuel.outOfBoundsKill = true;
}

function colidirBounds(){
    bonecoSprite.animations.play('explode');
    explosion.play('boom');
    gameEnd();
}

function colidir(player, ledge){
    ledge.kill();
    explosion.play('boom');
    bonecoSprite.animations.play('explode');
    gameEnd(player, ledge);
}


function createBlocos() {
    ledge = ledges.create(game.world.width, game.rnd.integerInRange(35, game.world.height) - 100, 'bloco');

    if((ledge.y + ledge.height)>500 ){
        ledge.y += -200;
    }else if (ledge.y < 50){
        ledge.y+= 100;
    }else if ((ledge.y + ledge.height)<=200){
        ledge.y+=100;
    }

    ledge.body.velocity.x = -600;
    ledge.body.immovable = true;
    ledge.outOfBoundsKill = true;

    count = count + 25;
    text.setText("Pontuação: " + count);
}

function gameEnd(player, ledge) {
    game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    //bonecoSprite.destroy();
    game.time.events.stop(true);
    music2.stop();


    game.time.events.remove(blocos);
    game.time.events.remove(energia);

    text2.setText("Game over. Pontuação: " + count + "\nPressione SPACE para reiniciar.");
    text2.anchor.setTo(0.5, 0.5);
    //bonecoSprite.kill();
    //bonecoSprite.x = 200;
    //bonecoSprite.y = 100;
    bonecoSprite.body.velocity.y = 0;
    bonecoSprite.body.velocity.x = 0;
    bonecoSprite.body.gravity.y = 0;
    start = 0;
    if (highscore < count) {
        highscore = count;
        text4.setText("Highscore: " + highscore);
    }

    bonecoSprite.animations.stop('explode');
}

function updateCounter(){

    if(counter>0){
        counter--;
        timer.setText('Combustível: '+counter);
    }else{
        gameEnd();
    }
}

function incrementCounter(fuel){
    counter+=250;
    fuel.kill();
}
