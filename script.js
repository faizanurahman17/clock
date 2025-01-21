const units = document.querySelectorAll('.unit');
const ampmElement = document.querySelector('.ampm');

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Determine AM/PM and convert to 12-hour format
    const isAM = hours < 12;
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    ampmElement.textContent = isAM ? 'AM' : 'PM';

    const timeParts = [
        String(hours).padStart(2, '0'), // Hours
        String(minutes).padStart(2, '0'), // Minutes
        String(seconds).padStart(2, '0'), // Seconds
    ];

    units.forEach((unit, unitIndex) => {
        const container = unit.querySelector('.digit-container');
        const oldDigit = container.querySelector('.old');
        const newDigit = container.querySelector('.new');
        const newValue = timeParts[unitIndex];

    // Update only if the value has changed
        if (oldDigit.textContent !== newValue) {
          newDigit.textContent = newValue;
          newDigit.classList.add('slide-up');
          oldDigit.classList.add('slide-up');

          // Swap classes after animation
          setTimeout(() => {
            oldDigit.classList.remove('old', 'slide-up');
            oldDigit.textContent = newValue;
            oldDigit.classList.add('new');

            newDigit.classList.remove('new', 'slide-up');
            newDigit.classList.add('old');
          }, 500);
        }
      });
    }

    // Initialize and update every second
    updateClock();
    setInterval(updateClock, 1000);