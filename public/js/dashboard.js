// Get all the menu items
const menuLinks = document.querySelectorAll('.menu a');
    const currentPath = window.location.pathname;

    // 1. Set active based on current URL
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 2. Add visual feedback before navigation (optional)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });



// close sidebar and open sidebar 
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    container.classList.toggle('sidebar-closed');

    // Change the icon direction
    const icon = toggleBtn.querySelector('i');
    if (sidebar.classList.contains('closed')) {
        // Change to right arrow when sidebar is closed
        icon.classList.remove('ri-menu-3-line');
        icon.classList.add('ri-menu-2-line');
    } else {
        // Change to left arrow when sidebar is open
        icon.classList.remove('ri-menu-2-line');
        icon.classList.add('ri-menu-3-line');
    }
});
// Select all network elements
const networkItems = document.querySelectorAll('.network');

// Loop through each network element and add click event listener
networkItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from any previously active item
        networkItems.forEach(el => el.classList.remove('active'));

        // Add 'active' class to the clicked item
        this.classList.add('active');
    });
});




// HAMBURGER 
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const menuContainer = document.getElementById("menu-container");
    const openIcon = document.getElementById("open-menu");
    const closeMenu = document.getElementById("close-menu");

    // OPEN the menu
    hamburgerMenu.addEventListener("click", function () {
        menuContainer.classList.add("active");
        openIcon.style.display = "none";
    });

    // CLOSE the menu
    closeMenu.addEventListener("click", function () {
        menuContainer.classList.remove("active");
        openIcon.style.display = "block";
    });
});





//  OVER ALL SECTION SLIDE DOWN 
document.querySelectorAll('.free-offers, .premium-offers').forEach(section => {
    section.addEventListener('click', () => {
        // Remove 'active' class and close all other sections
        document.querySelectorAll('.free-offers, .premium-offers').forEach(s => {
            if (s !== section) {
                s.classList.remove('active');
                s.querySelector('.content').classList.remove('show');
            }
        });

        // Toggle the clicked section's content and border
        const content = section.querySelector('.content');
        content.classList.toggle('show');
        section.classList.toggle('active');
    });
});



