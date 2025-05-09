document.addEventListener("DOMContentLoaded", () => {
    const words = document.querySelectorAll('.heading span');
    words.forEach((word, index) => {
        word.style.animationDelay = `${index * 0.3}s`; // Adjust delay for each word
    });

    // Smooth scroll for navigation linkss
    const navLinks = document.querySelectorAll('.options a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');

            // Checking for external links
            if(targetId.startsWith("#"))
            {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            else{
                //navigate the external link naturally
                console.log(`Navigating to external link: ${targetId}`);
            }
        });
    });
    // Sign In button event
    const signInButton = document.querySelector('.signin a button');
    signInButton.addEventListener('click', () => {
        alert('Redirecting to Sign In page...');
    });

    const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const revealPoint = 150; // Adjust based on when you want elements to start revealing
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active'); // Optional: Remove if you want a one-time reveal
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Call initially to reveal elements already in view

    // Add this code to landing.js inside the DOMContentLoaded event listener

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger-menu');
const navOptions = document.querySelector('.options');

hamburger.addEventListener('click', () => {
    // Toggle active class for menu visibility
    navOptions.classList.toggle('active');
    // Toggle animation for hamburger icon
    hamburger.classList.toggle('change');
});

// Close the menu when a link is clicked
document.querySelectorAll('.options a').forEach(link => {
    link.addEventListener('click', () => {
        navOptions.classList.remove('active');
        hamburger.classList.remove('change');
    });
});

// Close the menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInside = navOptions.contains(event.target) || hamburger.contains(event.target);
    
    if (!isClickInside && navOptions.classList.contains('active')) {
        navOptions.classList.remove('active');
        hamburger.classList.remove('change');
    }
});
});