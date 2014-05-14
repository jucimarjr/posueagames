function Level() {
    this.bars = [];
}

Level.prototype.init = function () {
    var barsPerLine = 10;
    var barWidth = 60;
    var barHeight = 25;
    var colors = [
        'rgb(208, 58, 209)',
        'rgb(247, 83, 82)',
        'rgb(253, 128, 20)',
        'rgb(255, 144, 36)',
        'rgb(5, 179, 32)',
        'rgb(109, 101, 246)'
    ];

    for (var i=0; i<colors.length; i++) {
        for (var j=0; j<barsPerLine; j++) {

            this.bars.push(new Bar({
                'x': j * barWidth,
                'y': barHeight * (i+2),
                'width': barWidth,
                'height': barHeight,
                'color': colors[i],
                'image': ImageLoader.get('brick')
            }));

        }
    }
};

Level.prototype.draw = function (context) {
    for (var i in this.bars) {
        this.bars[i].draw(context);
    }
};

Level.prototype.hasBars = function () {
    return this.bars.length != 0;
};