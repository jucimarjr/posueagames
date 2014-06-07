Game.HeartsLightModel = function (game) {
	this.x;
	this.y;
	this.light;
	this.input = game.input;
	this.math = game.math;
	
	if (!Game.HeartsLightModel._bitmap) {
		// Create a bitmap texture for drawing light cones
	    var bitmap = game.add.bitmapData(game.width, game.height);
	    bitmap.context.fillStyle = 'rgb(255, 255, 255)';
	    bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
	    var lightBitmap = game.add.image(0, 0, bitmap);
	    lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
		
		Game.HeartsLightModel._bitmap = bitmap;
	}
};

Game.HeartsLightModel._bitmap = null;

Game.HeartsLightModel.clearBitmap = function(game) {
	var bitmap = Game.HeartsLightModel._bitmap;
	if (bitmap) {
		// Next, fill the entire light bitmap with a dark shadow color.
	    bitmap.context.fillStyle = 'rgb(100, 100, 100)';
	    bitmap.context.fillRect(0, 0, bitmap.width, bitmap.height);
	}
};

Game.HeartsLightModel.renderBitmap = function () {
	var bitmap = Game.HeartsLightModel._bitmap;
	if (bitmap) {
		// This just tells the engine it should update the texture cache
        bitmap.dirty = true;
	}
};

Game.HeartsLightModel._stageCorners;

Game.HeartsLightModel.setStageCorners = function (x, y, width, height) {
	// An array of the stage corners that we'll use later
    Game.HeartsLightModel._stageCorners = [
        new Phaser.Point(x, y),
        new Phaser.Point(width, y),
        new Phaser.Point(width, height),
        new Phaser.Point(x, height)
    ];
};

Game.HeartsLightModel._walls;

Game.HeartsLightModel.setWalls = function (tiles) {
	// Build some walls. These will block line of sight.
    var NUMBER_OF_WALLS = tiles.length;
    var walls = [];

    for(var i = 0; i < NUMBER_OF_WALLS; i++) {
        walls.push(tiles[i]);
    }

    for (var w = 0; w < walls.length; w++) {
        var wall = walls[w];
        wall.corners = [];
        var polyline = wall.polyline;
        for (var k = 0; k < polyline.length; k++) {
            wall.corners.push(new Phaser.Point(wall.x+0.1 + polyline[k][0], wall.y+0.1 + polyline[k][1]));
            wall.corners.push(new Phaser.Point(wall.x-0.1 + polyline[k][0], wall.y-0.1 + polyline[k][1]));
        }
    }
	
	Game.HeartsLightModel._walls = walls;
}

Game.HeartsLightModel.prototype = {
	create: function (x, y, game) {
		this.light = game.add.sprite(x, y, 'light');
		this.light.anchor.setTo(0.5, 0.5);
		this.x = x;
		this.y = y;
	},
	
	update: function () {
		var walls = Game.HeartsLightModel._walls;
		var stageCorners = Game.HeartsLightModel._stageCorners;
		var bitmap = Game.HeartsLightModel._bitmap;
		
		// Move the light to the pointer/touch location
//	    this.light.x = this.input.activePointer.x;
//	    this.light.y = this.input.activePointer.y;
        this.light.x = this.x;
		this.light.y = this.y;
	
	    // Ray casting!
	    // Cast rays through the corners of each wall towards the stage edge.
	    // Save all of the intersection points or ray end points if there was no intersection.
	    var points = [];
	    var ray = null;
	    var intersect;
		
		for (var w = 0; w < walls.length; w++) {
            var wall = walls[w];
	        // Create a ray from the light through each corner out to the edge of the stage.
	        // This array defines points just inside of each corner to make sure we hit each one.
	        // It also defines points just outside of each corner so we can see to the stage edges.
            var corners = wall.corners;
	        // Calculate rays through each point to the edge of the stage
	        for(var i = 0; i < corners.length; i++) {
	            var c = corners[i];
	
	            // Here comes the linear algebra.
	            // The equation for a line is y = slope * x + b
	            // b is where the line crosses the left edge of the stage
	            var slope = (c.y - this.light.y) / (c.x - this.light.x);
	            var b = this.light.y - slope * this.light.x;
	
	            var end = null;
	
	            if (c.x === this.light.x) {
	                // Vertical lines are a special case
	                if (c.y <= this.light.y) {
	                    end = new Phaser.Point(this.light.x, 0);
	                } else {
	                    end = new Phaser.Point(this.light.x, bitmap.height);
	                }
	            } else if (c.y === this.light.y) {
	                // Horizontal lines are a special case
	                if (c.x <= this.light.x) {
	                    end = new Phaser.Point(0, this.light.y);
	                } else {
	                    end = new Phaser.Point(bitmap.width, this.light.y);
	                }
	            } else {
	                // Find the point where the line crosses the stage edge
	                var left = new Phaser.Point(0, b);
	                var right = new Phaser.Point(bitmap.width, slope * bitmap.width + b);
	                var top = new Phaser.Point(-b/slope, 0);
	                var bottom = new Phaser.Point((bitmap.height-b)/slope, bitmap.height);
	
	                // Get the actual intersection point
	                if (c.y <= this.light.y && c.x >= this.light.x) {
	                    if (top.x >= 0 && top.x <= bitmap.width) {
	                        end = top;
	                    } else {
	                        end = right;
	                    }
	                } else if (c.y <= this.light.y && c.x <= this.light.x) {
	                    if (top.x >= 0 && top.x <= bitmap.width) {
	                        end = top;
	                    } else {
	                        end = left;
	                    }
	                } else if (c.y >= this.light.y && c.x >= this.light.x) {
	                    if (bottom.x >= 0 && bottom.x <= bitmap.width) {
	                        end = bottom;
	                    } else {
	                        end = right;
	                    }
	                } else if (c.y >= this.light.y && c.x <= this.light.x) {
	                    if (bottom.x >= 0 && bottom.x <= bitmap.width) {
	                        end = bottom;
	                    } else {
	                        end = left;
	                    }
	                }
	            }
	
	            // Create a ray
	            ray = new Phaser.Line(this.light.x, this.light.y, end.x, end.y);
	
	            // Check if the ray intersected the wall
	            intersect = this.getWallIntersection(ray);
	            if (intersect) {
	                // This is the front edge of the light blocking object
	                points.push(intersect);
	            } else {
	                // Nothing blocked the ray
	                points.push(ray.end);
	            }
	        }
        }

	    // Shoot rays at each of the stage corners to see if the corner
	    // of the stage is in shadow. This needs to be done so that
	    // shadows don't cut the corner.
	    for(i = 0; i < stageCorners.length; i++) {
	        ray = new Phaser.Line(this.light.x, this.light.y, stageCorners[i].x, stageCorners[i].y);
	        intersect = this.getWallIntersection(ray);
	        if (!intersect) {
	            // Corner is in light
	            points.push(stageCorners[i]);
	        }
	    }

	    // Now sort the points clockwise around the light
	    // Sorting is required so that the points are connected in the right order.
	    //
	    // This sorting algorithm was copied from Stack Overflow:
	    // http://stackoverflow.com/questions/6989100/sort-points-in-clockwise-order
	    //
	    // Here's a pseudo-code implementation if you want to code it yourself:
	    // http://en.wikipedia.org/wiki/Graham_scan
	    var center = { x: this.light.x, y: this.light.y };
	    points = points.sort(function(a, b) {
	        if (a.x - center.x >= 0 && b.x - center.x < 0)
	            return 1;
	        if (a.x - center.x < 0 && b.x - center.x >= 0)
	            return -1;
	        if (a.x - center.x === 0 && b.x - center.x === 0) {
	            if (a.y - center.y >= 0 || b.y - center.y >= 0)
	                return 1;
	            return -1;
	        }
	
	        // Compute the cross product of vectors (center -> a) x (center -> b)
	        var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
	        if (det < 0)
	            return 1;
	        if (det > 0)
	            return -1;
	
	        // Points a and b are on the same line from the center
	        // Check which point is closer to the center
	        var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
	        var d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
	        return 1;
	    });
		
		this.points = points;
	},
	
	render: function () {
		var bitmap = Game.HeartsLightModel._bitmap;
		var points = this.points;

		// Connect the dots and fill in the shape, which are cones of light,
        // with a bright white color. When multiplied with the background,
        // the white color will allow the full color of the background to
        // shine through.
        bitmap.context.beginPath();
        bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        bitmap.context.moveTo(points[0].x, points[0].y);
        for (var j = 0; j < points.length; j++) {
            bitmap.context.lineTo(points[j].x, points[j].y);
        }
        bitmap.context.closePath();
		
		bitmap.context.fill();
	},
	
	getWallIntersection: function (ray) {
		var distanceToWall = Number.POSITIVE_INFINITY;
        var closestIntersection = null;

	    // For each of the walls...
		var walls = Game.HeartsLightModel._walls;
		var wallsLength = walls.length;
		
		for (var w = 0; w < wallsLength; w++) {
			var wall = walls[w];
			var polyline = wall.polyline;
			
//			console.log('polyline: ' + polyline);
			var lines = [];
			var lastPoint = polyline[0];
			for (var p = 1; p < polyline.length; p++) {
//				console.log('lastp: ' + lastPoint);
				lines.push(new Phaser.Line(wall.x + lastPoint[0], wall.y + lastPoint[1],
                                           wall.x + polyline[p][0], wall.y + polyline[p][1]));
                lastPoint = polyline[p];
			}
			lines.push(new Phaser.Line(wall.x + lastPoint[0], wall.y + lastPoint[1],
                                       wall.x + polyline[0][0], wall.y + polyline[0][1]));
			
			// Test each of the edges in this wall against the ray.
			// If the ray intersects any of the edges then the wall must be in the way.
			for (var i = 0; i < lines.length; i++) {
				var intersect = Phaser.Line.intersects(ray, lines[i]);
				if (intersect) {
					// Find the closest intersection
					distance = this.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
					if (distance < distanceToWall) {
						distanceToWall = distance;
						closestIntersection = intersect;
					}
				}
			}
		}

        return closestIntersection;
	}
};
