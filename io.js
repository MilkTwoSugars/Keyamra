function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initialise();
    cameraInput.resize(windowWidth, windowHeight);
}

function mousePressed() {
    getAudioContext().resume()

    BRIGHTNESS_THRESHOLD = map(mouseX, 0, windowWidth, 0, 255)
}