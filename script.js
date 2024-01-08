const menuItems = document.getElementById('menu-items');
const menu = document.getElementById("menu-item");
const backgroundPattern = document.getElementById('menu-background-pattern');

// Move Background in
menuItems.addEventListener('mouseover', () => {
    backgroundPattern.style.backgroundSize = '11vmin 11vmin';
    backgroundPattern.style.opacity = '1';
});

// Move background out
menuItems.addEventListener('mouseout', () => {
    backgroundPattern.style.backgroundSize = '12vmin 12vmin';
    backgroundPattern.style.opacity = '0';
});

//Move pattern
if (menuItems) {
    const menuButtons = Array.from(menuItems.getElementsByClassName('menu-item'));

    menuButtons.forEach((button, index) => {
        button.addEventListener('mouseover', () => {
        menuItems.dataset.activeIndex = index;
        updateBackgroundPosition();
        });
    });

    function updateBackgroundPosition() {
        const activeIndex = menuItems.dataset.activeIndex || 0;
        const topPosition = `-${activeIndex * 20}vh`;
        backgroundPattern.style.top = topPosition;
    }
}

// Button Opacity
document.addEventListener('DOMContentLoaded', function () {
    var activeButtons = {
      aboutButton: false,
      projectsButton: false,
      experienceButton: false,
      contactButton: false
    };

    //Hover Opacity
    var menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(function (menuItem) {
      menuItem.addEventListener('mouseenter', function () {
        // Set hover state to true
        var buttonId = this.id;
        activeButtons[buttonId] = true;
        updateOpacity();
      });

      menuItem.addEventListener('mouseleave', function () {
        // Set hover state to false
        var buttonId = this.id;
        activeButtons[buttonId] = false;
        updateOpacity();
      });
    });

    function updateOpacity() {
      // Opacity based on hovered or actived
      menuItems.forEach(function (menuItem) {
        var buttonId = menuItem.id;
        menuItem.style.opacity = activeButtons[buttonId] || activeButtons[buttonId] === undefined ? 1 : 0.3;
      });
    }

    window.addEventListener('scroll', function () {
      var scrollPercentage = (document.documentElement.scrollTop + window.innerHeight) / document.documentElement.scrollHeight;

      // Thresholds for each button
      var thresholds = {
        aboutButton: 0,
        projectsButton: 0.3,
        experienceButton: 0.6,
        contactButton: 0.9
      };

      // Currently active button
      var activeButton = null;
      Object.keys(thresholds).forEach(function (buttonId) {
        if (scrollPercentage > thresholds[buttonId]) {
          activeButton = buttonId;
        }
      });

      // Set state for each button
      Object.keys(activeButtons).forEach(function (buttonId) {
        activeButtons[buttonId] = buttonId === activeButton;
      });

      updateOpacity();
    });
});