music = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
leftWristScore = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotposes);
}

function preload() {
    music = loadSound("music.mp3");
}

function play() {
    music.play();
    music.setVolume(1);
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
        leftWristScore = result[0].pose.keypoints[9].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("orangered");
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        number_lwy = Number(leftWristY);
        floor_lwy = floor(number_lwy);
        volume = floor_lwy / 500;
        music.setVolume(volume);
        document.getElementById("music_volume").innerHTML = volume;
    }
}