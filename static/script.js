var imageSources = [
    ["/static/bilder/wagner1.png", "/static/bilder/wagner2.png", "/static/bilder/wagner3.png","/static/bilder/wagner4.png","/static/bilder/wagner5.png"],
    ["/static/bilder/wengeter1.png", "/static/bilder/wengeter2.png", "/static/bilder/wengeter3.png", "/static/bilder/wengeter4.png", "/static/bilder/wengeter5.png",],
    ["/static/bilder/schmied1.png", "/static/bilder/schmied2.png", "/static/bilder/schmied3.png", "/static/bilder/schmied4.png", "/static/bilder/schmied5.png",]
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

		function playVideo() {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log("Received response: " + this.responseText);
				}
			};
			xhttp.open("GET", "/play_video", true);
			xhttp.send();
		}
