let img;
let imgLoaded = false;

function setup() {
    createCanvas(800, 800).parent('canvasContainer');
    noLoop(); // No need to loop until the image is uploaded
    
    // Image upload handling
    const input = select('#imageInput');
    input.changed(e => {
    if (e.target.files.length) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        loadImage(url, newImg => {
            img = newImg;
            imgLoaded = true;
            redraw(); // Redraw with the loaded image
        });
    }
});}

function draw() {
    background(0);

    if (imgLoaded) {
        image(img, 0, 0, width, height); // This will be replaced with the kaleidoscope effect later
    }
}
// Placeholder for kaleidoscope drawing function
function drawKaleidoscope(image) {
    const segments = segmentsSlider.value();
    const angle = TWO_PI / segments;
    
    push(); // Start a new drawing state
    translate(width / 2, height / 2); // Move to the center of the canvas

    for (let i = 0; i < segments; i++) {
        push(); // Save the current state
        rotate(angle * i);
        scale(1, -1); // Reflect the image for kaleidoscope effect
        imageMode(CENTER);
        image(img, 0, 0, width, height / 2); // Adjust image size and position as needed
        pop(); // Restore the state
    }

    pop(); // Restore the original state
}

// Modify the draw function
function draw() {
    background(0);

    if (imgLoaded) {
        drawKaleidoscope(img);
    }
}
