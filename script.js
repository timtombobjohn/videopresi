var imageSources = [
    ["bilder/wagner1.png", "bilder/wagner2.png", "bilder/wagner3.png","bilder/wagner4.png","bilder/wagner5.png"],
    ["bilder/wengeter1.png", "bilder/wengeter2.png", "bilder/wengeter3.png", "bilder/wengeter4.png", "bilder/wengeter5.png",],
    ["bilder/schmied1.png", "bilder/schmied2.png", "bilder/schmied3.png", "bilder/schmied4.png", "bilder/schmied5.png",]
];



var currentIndex = 1;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeImage() {
  const img = document.getElementsByClassName("slide-img");


  for(let i = 0; i<img.length; i++){
    img[i].style.opacity=0.3;
    await sleep(400);
    
  }
  await sleep(400);

  for(let i = 0; i<img.length; i++){
    img[i].style.opacity=1;
    img[i].src = imageSources[i][currentIndex];

    await sleep(400);
  }

  currentIndex++;
  if (currentIndex >= 5) {
    currentIndex = 0;
  }
}

setInterval(changeImage, 8700); // Change image every 5 seconds



async function playVideo(videoPath) {
  var videoPlayer = document.createElement('video');
  videoPlayer.src = videoPath;
  videoPlayer.controls = false;
  videoPlayer.autoplay = true;
  document.body.appendChild(videoPlayer);
  videoPlayer.requestFullscreen();
  await sleep(4000);
  videoPlayer.addEventListener('click', function() {
    document.body.removeChild(videoPlayer); 
  });
  videoPlayer.addEventListener('ended', function() {
    document.body.removeChild(videoPlayer);
  });
}

