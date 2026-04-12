document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple typing effect for hero title
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.innerText;
        typingText.innerText = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.append(text.charAt(i));
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 1000);
    }

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursor && cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            cursorGlow.style.top = `${e.clientY}px`;
            cursorGlow.style.left = `${e.clientX}px`;
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .ai-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(2)';
                cursor.style.background = 'white';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
                cursor.style.background = 'var(--primary-color)';
            });
        });
    }

});
