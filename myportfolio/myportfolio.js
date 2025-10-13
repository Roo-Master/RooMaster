// Smooth scrolling for nav links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // offset for navbar
                behavior: "smooth"
            });
        }
    });
});

// Fade-in animation when sections come into view
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Skill bar animation
const skillBars = document.querySelectorAll(".skill-progress");
const skillsSection = document.getElementById("skills");

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = "0";
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            skillObserver.unobserve(skillsSection);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Contact form submission simulation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        alert("✅ Thank you! Your message has been sent.");
        contactForm.reset();
    });
}

// Download page as HTML when download button is pressed
const downloadBtn = document.getElementById("downloadBtn");

if (downloadBtn) {
    downloadBtn.addEventListener("click", function(e) {
        e.preventDefault();

        // Get the current page's HTML
        const pageContent = document.documentElement.outerHTML;

        // Create a Blob with HTML content
        const blob = new Blob([pageContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element for download
        const a = document.createElement("a");
        a.href = url;
        a.download = "MyPortfolio.html"; // file name
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}