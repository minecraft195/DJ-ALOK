var song = "";

leftWristX = 0;
leftWristY = 0;

rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;

function preload()
 {
     song = loadSound("music.mp3");
 }

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);   
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;       
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristyY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
}
function modelloaded(){
    console.log('poseNet Is Intialized');
}
 

 function play()
 {
     song.play();
     song.setVolume(1);
     song.rate(1);
 }

 function draw()
 {
     image(video, 0, 0, 600, 500);

     fill("#FF0000");
     stroke("#FF0000");

     circle(rightWristX,rightWristY,20);

   if(scoreRightWrist > 0.2)
   {
    if(rightWristY >0 && right <= 100)
    {
        document.getElementById("speed").innerHTML= "Speed 0.5x";
    }
    if(rightWristY >0 && right <= 200)
    {
        document.getElementById("speed").innerHTML= "Speed 1.0x";
    }
    if(rightWristY >0 && right <= 300)
    {
        document.getElementById("speed").innerHTML= "Speed 1.5x";
    }
    if(rightWristY >0 && right <= 400)
    {
        document.getElementById("speed").innerHTML= "Speed 2.0x";
    }
    if(rightWristY >0 && right <= 500)
    {
        document.getElementById("speed").innerHTML= "Speed 2.5x";
    }
   }
   
     

     if(scoreLeftWrist > 0.2)
     {
     circle(leftWristX,leftWristY, 20);
     InNumberLeftWristY = Number(leftWristY);
     remove_decimals = floor(InNumberLeftWirstY)
     volume = remove_decimals/500;
     document.getElementById("volume").innerHTML = "Volume = " + volume;
     song.setVolume(volume);
    }
}

