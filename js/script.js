// Preloader Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressCircle = document.querySelector('.progress-ring__circle-progress');
    const counter = document.querySelector('.counter');
    const circumference = 565.48; // 2 * π * radius (90)
    
    let progress = 0;
    const targetProgress = 100;
    const duration = 2000; // 2 seconds
    const increment = targetProgress / (duration / 16); // 16ms is roughly one frame at 60fps

    function updateLoader() {
        progress = Math.min(progress + increment, targetProgress);
        
        // Update the circle progress
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        // Update the counter
        counter.textContent = Math.round(progress);
        
        if (progress < targetProgress) {
            requestAnimationFrame(updateLoader);
        } else {
            // Fade out the preloader
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        preloader.style.display = 'none';
                        // Initialize home animations first, then scroll animations
                        initHomeAnimations();
                        initScrollAnimations();
                    }
                });
            }, 400);
        }
    }

    // Start the animation
    requestAnimationFrame(updateLoader);
});

// Initialize Home Section Animations
function initHomeAnimations() {
    // Create a timeline for home section animations
    const tl = gsap.timeline();

    // Animate the navigation logo and links
    tl.from('nav h1', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('nav ul li', {
        y: -50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.5')

    // Animate the header text elements
    .from('.header-text p:first-child', {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.header-text h1', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.header-text h1 span', {
        scale: 1.5,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.header-text .bio', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')

    // Animate the buttons with a bounce effect
    .from('.buttons a', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // Add a subtle floating animation to the header text
    gsap.to('.header-text h1', {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Add hover animations for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.1,
                color: '#ff004f',
                duration: 0.3
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                color: 'white',
                duration: 0.3
            });
        });
    });

    // Add hover animation for the main button
    const mainButton = document.querySelector('.buttons a button');
    if (mainButton) {
        mainButton.addEventListener('mouseenter', () => {
            gsap.to(mainButton, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        mainButton.addEventListener('mouseleave', () => {
            gsap.to(mainButton, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

// Initialize GSAP ScrollTrigger Animations
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Header animations
    gsap.from('.header-text', {
        scrollTrigger: {
            trigger: '.header-text',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // About section animations
    gsap.from('.about-col-1', {
        scrollTrigger: {
            trigger: '.about-col-1',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-col-2', {
        scrollTrigger: {
            trigger: '.about-col-2',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Services section animations
    const serviceCards = document.querySelectorAll('.services-list div');
    serviceCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Portfolio section animations
    const workItems = document.querySelectorAll('.work');
    workItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // Certificates section animations
    const certificates = document.querySelectorAll('.certificate');
    certificates.forEach((cert, index) => {
        gsap.from(cert, {
            scrollTrigger: {
                trigger: cert,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Contact section animations
    gsap.from('.contact-left', {
        scrollTrigger: {
            trigger: '.contact-left',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.contact-right', {
        scrollTrigger: {
            trigger: '.contact-right',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Social icons stagger animation
    gsap.from('.Social-icon a', {
        scrollTrigger: {
            trigger: '.Social-icon',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Tab titles animation
    gsap.from('.tab-links', {
        scrollTrigger: {
            trigger: '.tab-titles',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Smooth section title reveals
    document.querySelectorAll('.sub-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger icon between bars and X
        if (navLinks.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Projects slider navigation
    const slider = document.querySelector('.projects-slider');
    const slideLeft = document.getElementById('slide-left');
    const slideRight = document.getElementById('slide-right');
    
    slideLeft.addEventListener('click', function() {
        slider.scrollBy({ left: -340, behavior: 'smooth' });
    });
    
    slideRight.addEventListener('click', function() {
        slider.scrollBy({ left: 340, behavior: 'smooth' });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.section-title, .about-image, .about-content, .service-card, .project-card, .certificate-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add page loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});