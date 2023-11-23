const cat = document.getElementById('runningCat');
let posX = 0;
const speed = 0.5; // Adjust speed as needed

function moveCat() {
  posX += speed;
  cat.style.left = posX + 'px';

  // Reset position if cat reaches the right end of the screen
  if (posX > window.innerWidth) {
    posX = -100; // Reset to start just off-screen
  }

  requestAnimationFrame(moveCat);
}

moveCat();
