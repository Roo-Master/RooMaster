// script.js

// 1. Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. Highlight active section in nav while scrolling
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 3. Scroll reveal animations (fade-in sections)
const revealSections = document.querySelectorAll('section, .project, .exp');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealSections.forEach(section => {
        const elementTop = section.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // initial call

// 4. Optional: typing effect for developer title
const titleElement = document.querySelector('.profile p');
const titles = ["Full-Stack Developer", "Software Engineering Student", "Problem Solver"];
let index = 0;
let charIndex = 0;
let currentTitle = "";
let deleting = false;

function typeEffect() {
    if (index >= titles.length) index = 0;
    const fullText = titles[index];

    if (!deleting) {
        currentTitle = fullText.substring(0, charIndex + 1);
        charIndex++;
        titleElement.textContent = currentTitle;
        if (charIndex === fullText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        currentTitle = fullText.substring(0, charIndex - 1);
        charIndex--;
        titleElement.textContent = currentTitle;
        if (charIndex === 0) {
            deleting = false;
            index++;
        }
    }
    setTimeout(typeEffect, deleting ? 100 : 150);
}

typeEffect();