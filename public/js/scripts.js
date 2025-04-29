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






// FUNTION THAT SIDES OUT ANIMATION INTO SCREEEN 
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to apply animation SLIDE ANYWHERE class when element is in view
function handleScroll() {
  const elements = document.querySelectorAll('.scroll-section'); // Adjust the selector as needed
  
  elements.forEach(element => {
    if (isInViewport(element)) {
      // Apply animation based on class (left, right, top, bottom)
      if (element.classList.contains('left')) {
        element.classList.add('scroll-animate-left');
      } else if (element.classList.contains('right')) {
        element.classList.add('scroll-animate-right');
      } else if (element.classList.contains('top')) {
        element.classList.add('scroll-animate-top');
      } else if (element.classList.contains('bottom')) {
        element.classList.add('scroll-animate-bottom');
      }
    }
  });
}

// Listen for the scroll event and call the handleScroll function
window.addEventListener('scroll', handleScroll);

// Run on page load to check if elements are already in view
handleScroll();