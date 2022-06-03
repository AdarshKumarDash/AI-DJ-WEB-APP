music = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotposes);
}

function preload() {
    music = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500)
}

function play() {
    music.play();
}

function stop() {
    music.stop();
}

function modelloaded() {
    console.log("posenet is initialized");
}

function gotposes(result) {
    if (result.length > 0) {
        console.log(result);
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        console.log("Left WristX: " + leftWristX + " Left WristY: " + leftWristY);
        console.log("Right WirstX: " + rightWristX + " Right WristY: " + rightWristY);
    }
}