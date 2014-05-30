var Hero = {
    path:'assets/images/hero/h.png',
    json:'assets/images/hero/h.json',
    width:50,
    height:50,
    dragX:200,
    gravityY:100,
    velocityX:100,
    jump:-350,
    animations:{
        run:{
            name:'run',
            frames:[1,2,3]
        }
    }
};

var Weapon = {
    shot_delay:1000,
    bullet_speed:500,
    number_of_bullets:20
}