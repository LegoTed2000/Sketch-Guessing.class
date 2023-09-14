function setup() {
    canvas = createCanvas(250, 250);
    canvas.center();
    canvas.mouseReleased(classifyCanvas);
    synth = window.speachSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function clearCanvas() {
    background("white");
}

function draw() {
    strokeWeight(11);
    stroke(0);

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    {
        console.log(results);
        document.getElementById("lable").innerHTML = "I guess " + results[0].label;
        document.getElementById("confidence").innerHTML = "I am " + results[0].confidence + Math.round(results[0].confidence * 100) + "% confident";

        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}