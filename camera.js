class Camera {
    constructor(density, resolution) {
        this.video = null;
        this.density = density;
        this.resolution = resolution;
        this.initialise();
    }

    initialise() {
        pixelDensity(this.density);
        this.video = createCapture(VIDEO);
        this.video.size(width / this.resolution, height / this.resolution);
        this.video.hide();
    }

    get height() {
        return this.video.height;
    }

    get width() {
        return this.video.width;
    }

    get pixels() {
        return this.video.pixels;
    }

    read() {
        this.video.loadPixels();
        loadPixels();
    }

    resize() {
        this.initialise();
    }

}