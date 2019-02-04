var attackLevel = 0.1;
var releaseLevel = 0.0001;

var attackTime = 0.1;
var decayTime = 0.05;
var susPercent = 0.2;
var releaseTime = 0.3;

class Pad {
    constructor(type, frequency, activeAmplitude, position, w, h, colour) {
        this.sound = this.initialiseOscillator(type, frequency);
        
        this.activeAmplitude = activeAmplitude;
        this.position = position;
        this.width = w;
        this.height = h;
        this.area = (w / PIXEL_RESOLUTION) * (h / PIXEL_RESOLUTION);
        this.colour = colour;
        this.on = false;
    }

    initialiseOscillator(type, frequency) {
        let o = new p5.Oscillator();
        let e = new p5.Envelope();
        e.setADSR(attackTime, decayTime, susPercent, releaseTime);
        e.setRange(attackLevel, releaseLevel);
        o.setType(type);
        o.freq(frequency);
        o.amp(e);
        o.start();
        return e;
    }

    render() {
        if (this.on) {
            fill(this.colour)
        } else {
            fill(0);
        }
        stroke(this.colour)
        rect(this.position.x, this.position.y, this.width, this.height);


    }

    check(pixelObjectArray) {

        var count = 0;

        for (var i = 0; i < pixelObjectArray.length; i++) {
            if (pixelObjectArray[i].brightness >= BRIGHTNESS_THRESHOLD && this.withinBounds(pixelObjectArray[i].position)) {
                count++;
            }
        }
        this.on = count > (this.area * 0.6666);

        if (this.on) {
            this.sound.play();
        }

        if (DEBUGGING) {
            stroke(255)
            fill(255);
            textSize(16);
            text("v" + count + "/" + this.area * 0.6666, this.position.x, this.position.y);
        }
    }

    withinBounds(pos) {
        if (
            pos.x > this.position.x &&
            pos.x < this.position.x + this.width &&
            pos.y > this.position.y &&
            pos.y < this.position.y + this.height) {
            return true
        } else {
            return false;
        }
    }

}