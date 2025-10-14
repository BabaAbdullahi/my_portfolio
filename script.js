// script.js - Abdullahi Ibrahim Portfolio Interactivity

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const projectItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');

// Project data for modal
const projects = [
    {
        title: "Deep Learning Based Object Detection System",
        image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Object+Detection",
        description: "An AI-powered system for real-time object detection and classification using deep learning algorithms. This project demonstrates advanced computer vision techniques and neural network implementation.",
        link: "#"
    },
    {
        title: "Antidiabetic Effect of Mint Plants",
        image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Antidiabetic+Research",
        description: "Scientific research on the medicinal properties of mint plants, focusing on their potential antidiabetic effects. This project involved data collection, analysis, and scientific documentation.",
        link: "#"
    },
    {
        title: "WooCommerce Website Design",
        image: "https://placehold.co/600x400/1e3a8a/ffffff?text=WooCommerce+Store",
        description: "A fully customized e-commerce solution built with WooCommerce, featuring secure payment integration, product management, and responsive design for optimal user experience.",
        link: "#"
    },
    {
        title: "Data Collection Tool for NGO",
        image: "https://placehold.co/600x400/1e3a8a/ffffff?text=NGO+Data+Tool",
        description: "A specialized data management system developed for a non-profit organization to streamline their data collection processes, improve reporting, and enhance operational efficiency.",
        link: "#"
    },
    {
        title: "Bootstrap Responsive Website",
        image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Responsive+Website",
        description: "A fully responsive website built with the Bootstrap framework, ensuring optimal viewing experience across all device sizes with a clean, modern design.",
        link: "#"
    },
    {
        title: "School Projects",
        image: "https://placehold.co/600x400/1e3a8a/ffffff?text=School+Projects",
        description: "Assisted in the digital presentation and formatting of academic projects for students.",
        link: "#"
    }
];

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Highlight active navigation link
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Back to Top Functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && subject && message) {
        // In a real application, you would send this to a server
        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Portfolio Modal Functionality
projectItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const project = projects[index];
        modalTitle.textContent = project.title;
        modalImage.src = project.image;
        modalDescription.textContent = project.description;
        modalLink.href = project.link;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Typing Effect for Hero Section
const typedTextElement = document.querySelector('.typed-text');
const roles = ["Web Developer", "IT Professional", "Graphic Designer", "Cybersecurity Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (!isDeleting) {
        // Typing
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else {
            typingSpeed = 100;
        }
    } else {
        // Deleting
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next role
        } else {
            typingSpeed = 50;
        }
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const position = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            bar.style.width = width + '%';
        }
    });
}

// Initialize skill bars with 0 width
document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.style.width = '0';
});

// Trigger skill bar animation on scroll
window.addEventListener('scroll', animateSkillBars);

// Fade-in Animation for Sections
function fadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
}

// Add fade-in class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
});

// Trigger fade-in on scroll
window.addEventListener('scroll', fadeInElements);

// Trigger once on load
window.addEventListener('load', () => {
    fadeInElements();
    animateSkillBars();

});
