function Level() {
    this.bars = [];
    this.delay = 0;
    this.barWidth = 60;
    this.barHeight = 25;
    this.barsPerLine = 20;
    this.barsLines = 6;
}

Level.prototype.init = function () {
    for (var i=0; i<this.barsLines; i++) {
        for (var j=0; j<this.barsPerLine; j++) {
            this.bars.push(new Bar({
                'x': j * this.barWidth,
                'y': this.barHeight * (i+2),
                'width': this.barWidth,
                'height': this.barHeight,
                'image': ImageLoader.get('brick')
            }));

        }
    }
};

Level.prototype.draw = function (context) {
    for (var i in this.bars) {
        if (this.bars[i].x <= - (this.barWidth * this.barsPerLine) / 2) {
            this.bars[i].x = this.barWidth * this.barsPerLine / 2;
        } else {
            this.bars[i].x -= 2;
        }

        this.bars[i].draw(context);
    }
};

Level.prototype.hasBars = function () {
    return this.bars.length != 0;
};