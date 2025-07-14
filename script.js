document.addEventListener('DOMContentLoaded', function() {

    // 1. Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpened = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpened);
        });

        // --- MODIFIED SECTION FOR SMOOTH PAGE TRANSITION ---
        document.querySelectorAll('.nav-link a').forEach(link => {
            // Add the 'event' parameter to the click listener
            link.addEventListener('click', (event) => {
                // Only intercept the click if the mobile menu is currently active
                if (navLinks.classList.contains('active')) {
                    
                    // 1. Prevent the browser from navigating immediately
                    event.preventDefault();

                    // 2. Get the destination URL from the link's href
                    const destination = link.href;

                    // 3. Close the menu (this triggers the 300ms animation)
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    
                    // 4. Wait for the animation to finish, then navigate
                    setTimeout(() => {
                        window.location.href = destination;
                    }, 300); // This duration MUST match your CSS transition time
                }
            });
        });
    }


    // 2. Scroll Reveal Animation using Intersection Observer API
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1, // trigger when 10% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing the element once it has been revealed
                observer.unobserve(entry.target); 
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});