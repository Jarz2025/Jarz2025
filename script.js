// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const batteryLevel = document.querySelector('.battery-level');
    const batteryPercent = document.querySelector('.battery-percent');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        batteryLevel.style.width = `${progress}%`;
        batteryPercent.textContent = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 2000);
        }
    }, 50);
});

// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close menu when clicking on links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Active Section Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Telegram Bot Integration
async function sendToTelegram(formData) {
    const botToken = '7572714464:AAGhDqvPY5Pz3pMwNjS3aIsmsdC3u5nO94g'; // Replace with your bot token
    const chatId = '7141301127';    // Replace with your chat ID
    
    const message = `📩 New Contact Form Submission:\n\n` +
                   `👤 Name: ${formData.name}\n` +
                   `📧 Email: ${formData.email}\n` +
                   `📱 Phone: ${formData.phone || 'Not provided'}\n` +
                   `📌 Subject: ${formData.subject || 'No subject'}\n\n` +
                   `💬 Message:\n${formData.message}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return { ok: false };
    }
}

// Form Submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value
    };
    
    const statusElement = document.getElementById('form-status');
    statusElement.textContent = 'Sending message...';
    statusElement.style.color = 'var(--main-color)';
    
    try {
        const result = await sendToTelegram(formData);
        
        if (result.ok) {
            statusElement.textContent = 'Message sent successfully!';
            statusElement.style.color = 'var(--main-color)';
            form.reset();
        } else {
            statusElement.textContent = 'Failed to send message. Please try again.';
            statusElement.style.color = '#ff3333';
        }
    } catch (error) {
        statusElement.textContent = 'An error occurred. Please try again later.';
        statusElement.style.color = '#ff3333';
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-box, .project-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation state
document.querySelectorAll('.service-box, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);