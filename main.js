music1 = "";
music2 = "";
leftWirstX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status1 = "";
status2 = "";
function preload(){
    music1 = loadSound("mp3-1.mp3");
    music2 = loadSound("mp3-2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)  ;
}
function modelLoaded(){
    console.log('poseNet is initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreRightWrist = " + scoreRightWrist);
        leftWirstX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWirstX + " leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    status1 = music1.isPlaying();
    status2 = music2.isPlaying();
    if(scoreLeftWrist > 0.015){
        circle(leftWirstX,leftWristY, 20);
        music2.stop();
        if(status1 == false){
            music1.play();
            console.log("Music is playing");
           document.getElementById("song_name").innerHTML = "Beyond the Way";
        }
    }
    if(scoreRightWrist > 0.015){
        circle(rightWristX,rightWristY, 20);
        music1.stop();
        if(status2 == false){
            music2.play();
            console.log("Music is playing");
           document.getElementById("song_name").innerHTML = "Gehenna";
        }
    }
}