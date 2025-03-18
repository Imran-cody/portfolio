/*
* Portfolio Website - Imran Delware
* main.js - Main JavaScript file for site functionality
*/

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const preloader = document.querySelector('.preloader');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const scrollDownBtn = document.querySelector('.scroll-down');
    const backToTopBtn = document.querySelector('.back-to-top');
    const skillBars = document.querySelectorAll('.skill-per');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');

    // Hide preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 500);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation and scroll down button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize skill bars animation
    skillBars.forEach(skillBar => {
        const percentage = skillBar.getAttribute('per');
        skillBar.style.width = percentage + '%';
        
        // Add percentage text
        skillBar.setAttribute('data-progress', percentage + '%');
    });

    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section > .container').forEach(section => {
        observer.observe(section);
    });

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showFormAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message (in a real implementation, this would send data to a server)
            showFormAlert('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Helper functions
    function showFormAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        
        // Insert alert before the form
        contactForm.parentNode.insertBefore(alert, contactForm);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add animations to timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('animate-timeline');
    });

    // Theme switch functionality (if you want to add a theme switcher)
    const createThemeSwitcher = () => {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = '<i class="fas fa-adjust"></i>';
        
        document.body.appendChild(themeSwitcher);
        
        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    };
    
    // Uncomment to enable theme switcher
    // createThemeSwitcher();
});

// Add smooth scrolling behavior for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Add a CSS class to animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.classList.add('visible');
        }
    });
};

// Listen for scroll events to trigger animations
window.addEventListener('scroll', animateOnScroll);

// Initialize typing effect for the hero section
const initTypeEffect = () => {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        const text = typedTextElement.getAttribute('data-typed');
        
        if (text) {
            let i = 0;
            const typeEffect = () => {
                if (i < text.length) {
                    typedTextElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeEffect, 100);
                }
            };
            
            typeEffect();
        }
    }
};

// Initialize typing effect if there's a typed-text element
window.addEventListener('DOMContentLoaded', initTypeEffect);

// Add parallax effect to the hero section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const scrollValue = window.scrollY;
        heroSection.style.backgroundPositionY = `${scrollValue * 0.5}px`;
    }
});

// Add dynamic year to the footer copyright
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.current-year');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});