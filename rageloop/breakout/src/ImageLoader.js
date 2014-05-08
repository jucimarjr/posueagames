
(function(){


	var ImageLoader = {

		images : {},
		callback: null

	}

	ImageLoader.load = function(images, callback){

		var amount = 0, amountLoaded = 0;

		//check if image is object
		if (typeof images !== 'object') {
			return -1;
		}

		//checks if there entries on images array
		if (images.length === 0) {
			return -2;
		}

		// store total of images to load.
		amount = this.getAmount(images);

		// image loaded callback
		var imageLoaded = function() {

			amountLoaded++;
			console.log("img loaded: " + amountLoaded + " - total: " + amount);

			if (amountLoaded === amount) {
				if (typeof callback === 'function') {
					callback.call();
				}
			}
		}

		//interact through images and load them
		for (img in images) {

			var imageItem = new Image();

			imageItem.onload = function() {
				imageLoaded();
			};

			imageItem.src = images[img];

			this.images[img] = imageItem;

		}

	};

	ImageLoader.getAmount = function(object) {

		var count = 0;

		// count amount of key in object
		for (key in object) if (object.hasOwnProperty(key)) count++;

		return count;

	};

	ImageLoader.get = function(id) {

		if (typeof id !== 'string') {
			return -1;
		}

		return this.images[id];
	};


	window.ImageLoader = ImageLoader;

})()


