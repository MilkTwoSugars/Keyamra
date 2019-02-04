class PixelObject {
    constructor(x, y, brightness){
        this.x = x;
        this.y = y;
        this.position = createVector(x, y);
        this.brightness = brightness ? brightness : 0;
    }
}