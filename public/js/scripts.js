// ALL ABOUT MUTE AND PLAY MUSIC 
const musicControl = document.getElementById('music-control');
const musicImg = document.getElementById('music-img');
const music = document.getElementById('background-music');

// Ensure music plays automatically
music.volume = 0.5; // adjust volume if needed
music.play();

let isPlaying = true;

musicControl.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicImg.src = './img/mute.png';
  } else {
    music.play();
    musicImg.src = './img/muted.png';
  }
  isPlaying = !isPlaying;
});





// FUNCTION TO TOGGLE COLOR FROM ONE ICON TO THE OTHER 
const icons = document.querySelectorAll('.social-icons a');
let currentIndex = 0;

function changeActiveIcon() {
  // Remove 'active' class from all
  icons.forEach(icon => icon.classList.remove('active'));

  // Add 'active' class to current icon
  icons[currentIndex].classList.add('active');

  // Move to next index
  currentIndex = (currentIndex + 1) % icons.length;
}

changeActiveIcon();
setInterval(changeActiveIcon, 5000);






