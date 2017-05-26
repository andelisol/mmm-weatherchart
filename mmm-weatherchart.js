Module.register("mmm-weatherchart", {
        defaults: {
                land: 'Norge',
                fylke: 'Akershus',
                kommune: 'Oppegård',
		by: 'Kolbotn',
		updateInterval: 60 * 60 * 1000, // every hour
		hideBorder: true,
        },
        getDom: function() {
                // add current timestamp to avoid old cached image
                var src = "http://www.yr.no/place/" + this.config.land + "/" + this.config.fylke + "/" + this.config.kommune + "/" + this.config.by + "/meteogram.png?" + new Date().getTime();

                // invert and grayscale image via css
                var style = "-webkit-filter: invert(100%) grayscale(100%);";
		if (this.config.hideBorder) {
			style = "position: absolute; left: -7px; top: -25px; " + style;
		}
                var img = "<img src='" + src + "' style='" + style + "'>";

                var wrapper = document.createElement("div");
		if (this.config.hideBorder) {
			wrapper.style.width = "405px";
			wrapper.style.height = "120px";
			wrapper.style.overflow = "hidden";
			wrapper.style.position = "relative";
		}
                wrapper.innerHTML = img;
                return wrapper;
        },
	start: function() {
		var self = this;
		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
		}, this.config.updateInterval);
	},
});

