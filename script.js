// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initSmoothScroll();
    initScrollAnimation();
    initTypingAnimation();
    initFormSubmission();
    initMobileMenu();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Find and activate the target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-list');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Set home as active on page load
    document.querySelector('[data-section="home"]').classList.add('active');
    document.getElementById('home').classList.add('active');
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !this.classList.contains('nav-link')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .skill-category, .project-card, .info-item').forEach(el => {
        observer.observe(el);
    });
}

function initTypingAnimation() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    // Ensure the text is visible
    typedTextElement.style.color = 'var(--light-text)';

    const texts = ['Raj Kumar', 'Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    // color: transparent;

    function type() {
        const currentText = texts[textIndex];
        const displayText = isDeleting
            ? currentText.substring(0, charIndex - 1)
            : currentText.substring(0, charIndex + 1);

        typedTextElement.textContent = displayText;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500); // Pause before typing next
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    }

    type();
}

function initFormSubmission() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(this);
            const data = {
                name: this.querySelector('input[placeholder="Your Name"]')?.value || '',
                email: this.querySelector('input[placeholder="Your Email"]')?.value || '',
                message: this.querySelector('textarea')?.value || ''
            };

            // Simple validation
            if (data.name && data.email && data.message) {
                // Show success message
                showNotification('Message sent successfully! I will get back to you soon.', 'success');

                // Reset form
                this.reset();

                // You can add form submission to a backend service here
                // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInDown 0.3s ease-out;
        background: ${type === 'success' ? '#00d084' : '#ff006e'};
        color: white;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-list');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function downloadResume() {
    // Create a simple resume download
    const resumeData = `
RESUME - Raj Kumar
Email: raj@example.com | Phone: +1 (555) 123-4567

PROFESSIONAL SUMMARY
Full Stack Developer with expertise in modern web technologies. Passionate about building scalable applications and creating exceptional user experiences.

TECHNICAL SKILLS
Frontend: HTML5, CSS3, JavaScript, React, Vue.js
Backend: Node.js, Express, MongoDB, REST APIs
Tools: Git, Docker, Figma, VS Code

EXPERIENCE
Senior Web Developer - Tech Innovations Inc. (2022 - Present)
- Led development of customer-facing applications
- Improved application performance by 40%
- Mentored junior developers

Full Stack Developer - Digital Solutions Ltd. (2020 - 2022)
- Developed and maintained multiple full-stack applications
- Collaborated with designers and product managers

Junior Developer - StartUp Ventures (2019 - 2020)
- Started career building responsive websites
- Learned best practices and modern development workflows

EDUCATION
B.Tech in Computer Science
Technology Institute, Graduated 2019
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resumeData));
    element.setAttribute('download', 'Raj_Kumar_Resume.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification('Resume downloaded successfully!', 'success');
}

// ===== SCROLL HEADER ON SCROLL =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMATION KEYFRAMES IN JS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }

    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: animate-in 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);