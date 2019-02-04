var cameraInput;

var PIXEL_RESOLUTION = 24;
var PIXEL_DENSITY = 1;
var BRIGHTNESS_THRESHOLD = 255;
var FREQUENCY_MULTIPLYER = 5;
var DEBUGGING = false;

var pix;
var pads;

var columns = 8;
var rows = 5;

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function setup() {
    createCanvas(windowWidth, windowHeight);

    cameraInput = new Camera(PIXEL_DENSITY, PIXEL_RESOLUTION);

    initialise();
}

function draw() {
    background(0);

    pix = [];

    cameraInput.read();
    for (var y = 0; y < cameraInput.height; y += 1) {
        for (var x = 0; x < cameraInput.width; x += 1) {
            var i = (cameraInput.width - x + 1 + (y * cameraInput.width)) * 4;

            var r = cameraInput.pixels[i + 0];
            var g = cameraInput.pixels[i + 1];
            var b = cameraInput.pixels[i + 2];

            var bright = (r + g + b) / 3

            var p = new PixelObject(x * PIXEL_RESOLUTION, y * PIXEL_RESOLUTION, bright);
            pix.push(p);

        }
    }

    for (var i = 0; i < pads.length; i++) {
        pads[i].check(pix);
        pads[i].render();
    }

    if (DEBUGGING) {

        for (var j = 0; j < pix.length; j++) {
            drawPoint(pix[j].x, pix[j].y, pix[j].brightness)
        }

    }

}

function drawPoint(x, y, bright) {
    noFill();
    stroke(bright)
    ellipse(x, y, 10, 10)
    stroke(100);
}

function initialise() {
    background(0);
    stroke(100);

    pads = [];

    pix = new Array();
    pads = new Array();

    columnWidth = windowWidth / columns;
    rowHeight = windowHeight / rows;

    for (var x = 0; x < width; x += columnWidth) {
        for (var y = 0; y < height; y += rowHeight) {
            let p = new Pad("sine", getRandomFrequency(), 0.1, createVector(x, y), columnWidth, rowHeight, random(colorArray));
            pads.push(p);
        }
    }
}
