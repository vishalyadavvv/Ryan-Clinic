// Phone number for contact
const PHONE_NUMBER = '9911111247';
const WHATSAPP_NUMBER = '919911111247'; // Include country code for WhatsApp

// Function to make a phone call
function makeCall() {
    window.location.href = `tel:${PHONE_NUMBER}`;
}

// Toggle navigation menu for mobile - FIXED
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        navbar.classList.toggle("active");
        
        // Toggle body scroll when menu is open
        if (navbar.classList.contains("active")) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    });

    // Close menu when clicking on nav links
    if (navLinks) {
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                body.style.overflow = "";
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navbar.classList.contains("active") && 
            !navbar.contains(e.target) && 
            !menuIcon.contains(e.target)) {
            navbar.classList.remove("active");
            body.style.overflow = "";
        }
    });
}

// Function to open WhatsApp
function openWhatsApp() {
    const message = encodeURIComponent('Hi, I am interested in hair transplant consultation.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

// Function to book consultation
function bookConsultation() {
    // You can redirect to a booking page or open a modal
    // For now, it will call the phone number
    const userConfirm = confirm('Would you like to call us to book your consultation?');
    if (userConfirm) {
        makeCall();
    }
}

// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
  
        });

// Add keyboard accessibility for floating buttons
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('floating-btn')) {
            e.preventDefault();
            activeElement.click();
        }
    }
});


// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

//............................... Stats Section..............................//

// Counter Animation Function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, );
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Intersection Observer for triggering animation when in view
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                statNumbers.forEach((stat, index) => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    
                    // Stagger the animations
                    setTimeout(() => {
                        animateCounter(stat, target, 2000);
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initCounters();
    
    // Add pulse animation to icons on hover
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Optional: Add click tracking
    statItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const label = this.querySelector('.stat-label');
            if (label) {
                console.log(`Stat clicked: ${label.textContent}`);
            }
        });
    });
});

// Optional: Restart animation when scrolling back up
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            
            // If section is out of view (scrolled past), reset for next view
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                // Reset numbers for re-animation
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    stat.textContent = '0';
                });
            }
        }
    }, 100);
});


// ...................................THE TURKISH ADVANTAGE.............................//



  
  function bookAppointment() {
    // Option 1: Open appointment form page (example)
    window.location.href = "#appointment"; // Scroll to your appointment section
    // Or if  have a booking form link, use:
    window.open("https://ryanclinic.com", "_blank");
  }

  
  function speakToExpert() {
    // Option 1: Open WhatsApp chat
    window.open("https://wa.me/919876543210?text=Hello!%20I%20want%20to%20speak%20to%20a%20hair%20transplant%20expert.", "_blank");

    // Option 2 (alternative): Open phone dialer directly
    window.location.href = "tel:+919876543210";
  }


// ...................................SUCCESSFUL TRANSPLANTS............................//

// See Results / Book Consultation Function
// WhatsApp Chat Function
function seeResults() {
    const phoneNumber = "919911111247"; 
    const message = "Hello! I’d like to book a free consultation.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank"); // opens WhatsApp chat
    console.log('Opening WhatsApp for free consultation...');
}

// Call Function
function talkToExpert() {
    const phoneNumber = "tel:+919911111247"; 
    window.location.href = phoneNumber; // opens phone dialer
    console.log('Opening phone dialer to talk with expert...');
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to result cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all result cards
    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });

    // Add click event to result cards (for lightbox/modal in production)
    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log(`Result card ${index + 1} clicked`);
            showImageModal(this);
        });
    });

    // Animate badges on load
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = `all 0.6s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 300);
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS animation for ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Image Modal Function (placeholder for lightbox)
function showImageModal(card) {
    const img = card.querySelector('.result-image');
    if (img) {
        console.log('Opening modal for:', img.alt);
    }
    alert('In production, this would show a before/after comparison slider!');
}

// Track user interactions
function trackInteraction(action, label) {
    console.log(`Action: ${action}, Label: ${label}`);
}

// Add tracking to all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackInteraction('button_click', buttonText);
        });
    });

    document.querySelectorAll('.result-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            trackInteraction('result_card_click', `Card ${index + 1}`);
        });
    });
});

// ...................OUR TURKISH SPECIALISTS..........................//



  // 💬 Book Consultation
  function bookConsultation() {
    // Option 1: Redirect to a consultation booking form section
    window.location.href = "#consultation"; 

    // Option 2: If you have an online form link (replace below)
    window.open("https://ryanclinic.com/book-consultation", "_blank");
  }

  // 📞 Schedule Visit
  function scheduleVisit() {
    // Option 1: Open WhatsApp chat for visit scheduling
    window.open("https://wa.me/919876543210?text=Hello!%20I%20would%20like%20to%20schedule%20a%20visit%20to%20Ryan%20Clinic.", "_blank");

    // Option 2 (Alternative): Direct phone call
    window.location.href = "tel:+919876543210";
  }



// ....................................................offer Section...........................//

document.addEventListener('DOMContentLoaded', function() {
    const consultBtn = document.getElementById("consult-btn");
    const callBtn = document.getElementById("call-btn");

    if (consultBtn) {
        consultBtn.addEventListener("click", () => {
            alert("Your free consultation request has been submitted!");
        });
    }

    if (callBtn) {
        callBtn.addEventListener("click", () => {
            window.location.href = "tel:+919911111247";
        });
    }
});

// .......................................Transform Your Look ......................................
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
    });
});

//.................................... Footer..............................//

// Function to handle call now action
function callNow() {
    if (window.matchMedia('(max-width: 768px)').matches) {
        // On mobile, directly call
        window.location.href = 'tel:+919911111247';
    } else {
        // On desktop, show both numbers
        const choice = confirm('Choose OK to call +919911111247\nChoose Cancel to call +918882356930');
        if (choice) {
            window.location.href = 'tel:+919911111247';
        } else {
            window.location.href = 'tel:+918882356930';
        }
    }
}

// Add smooth scroll behavior for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all main sections
    document.querySelectorAll('.contact-info, .cta-box, .why-choose').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add click tracking for analytics (optional)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent);
        });
    });

    // Add hover effect for phone numbers
    document.querySelectorAll('.phone-numbers a').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Phone number clicked:', this.textContent);
        });
    });
});

// ..........................POPUP Window...........................//




  // Show popup after page load
  window.addEventListener("load", function() {
    setTimeout(() => {
      document.getElementById("popup").classList.add("active");
    }, 1000); // show after 1 second
  });

  // Close popup
  function closePopup() {
    document.getElementById("popup").classList.remove("active");
  }

  // Handle form submission
  function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Example: Send to WhatsApp (you can integrate with backend later)
    const text = `Hello, I am ${name}. My phone number is ${phone}. Message: ${message || "No message provided."}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919876543210?text=${encodedText}`, "_blank");

    alert("Thank you! We’ll reach out to you shortly.");
    closePopup();
  }

