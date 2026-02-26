/**
 * Tạp hoá Toàn Lương — Runova-Inspired Animations
 * GSAP + ScrollTrigger + AOS
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Copyright year
    // ============================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ============================================================
    // 2. Store open/closed status
    // ============================================================
    const OPEN_HOUR = 7;
    const CLOSE_HOUR = 22;

    function updateStoreStatus() {
        const text = document.getElementById('store-status-text');
        const badge = document.querySelector('.hero-badge');
        if (!text || !badge) return;

        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
        const isClosingSoon = isOpen && hour >= (CLOSE_HOUR - 1);

        const dot = badge.querySelector('i');

        if (isClosingSoon) {
            const minsLeft = (CLOSE_HOUR - hour - 1) * 60 + (60 - minutes);
            text.textContent = 'Sắp đóng cửa (còn ' + minsLeft + ' phút)';
            dot.style.color = '#fbbf24';
            badge.style.borderColor = 'rgba(251, 191, 36, 0.3)';
        } else if (isOpen) {
            text.textContent = 'Đang mở cửa';
            dot.style.color = '#c8f169';
            badge.style.borderColor = '';
        } else {
            text.textContent = 'Đã đóng cửa · Mở lại lúc 07:00';
            dot.style.color = '#f87171';
            badge.style.borderColor = 'rgba(248, 113, 113, 0.3)';
        }
    }

    updateStoreStatus();
    setInterval(updateStoreStatus, 60000);

    // ============================================================
    // 3. Header scroll effect
    // ============================================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================================
    // 4. Smooth scrolling
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerH = header.offsetHeight;
                const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 5. Mobile menu toggle
    // ============================================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');

    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            const icon = mobileBtn.querySelector('i');
            if (nav.classList.contains('nav-open')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                const icon = mobileBtn.querySelector('i');
                icon.classList.replace('ph-x', 'ph-list');
            });
        });
    }

    // ============================================================
    // 6. Active nav link on scroll
    // ============================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============================================================
    // 7. Initialize AOS
    // ============================================================
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
    });

    // ============================================================
    // 8. GSAP — Register ScrollTrigger
    // ============================================================
    gsap.registerPlugin(ScrollTrigger);

    // ============================================================
    // 9. CINEMATIC HERO ENTRANCE
    // ============================================================
    const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
    });

    // Initial states
    gsap.set('.hero-overlay', { opacity: 0 });
    gsap.set('.hero-content', { opacity: 0 });

    heroTl
        // Background video/image scale-in
        .fromTo('.hero-bg-video, .hero-bg-img',
            { scale: 1.2 },
            { scale: 1, duration: 2, ease: 'power2.out' }
        )
        // Overlay fades in
        .to('.hero-overlay',
            { opacity: 1, duration: 1 },
            0.3
        )
        // Content block fades in
        .to('.hero-content',
            { opacity: 1, duration: 0.5 },
            0.8
        )
        // Badge slides in
        .fromTo('.hero-badge',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            1.0
        )
        // Title lines stagger
        .fromTo('.hero-title-line',
            { y: 80, opacity: 0, skewY: 3 },
            { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.15 },
            1.1
        )
        // Subtitle
        .fromTo('.hero-subtitle',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.4'
        )
        // Info pills stagger
        .fromTo('.info-pill',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
            '-=0.3'
        )
        // CTA buttons
        .fromTo('.hero-buttons .btn',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
            '-=0.2'
        )
        // Floating card pops in
        .fromTo('.hero-float-card',
            { x: 60, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
            '-=0.5'
        );

    // ============================================================
    // 10. COUNTER ANIMATION for Stats Bar
    // ============================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(num => {
        const target = parseInt(num.dataset.target, 10);

        ScrollTrigger.create({
            trigger: num,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(num, {
                    textContent: target,
                    duration: 2,
                    ease: 'power1.out',
                    snap: { textContent: 1 },
                    onUpdate: function () {
                        num.textContent = Math.round(
                            gsap.getProperty(num, 'textContent')
                        );
                    },
                });
            },
        });
    });

    // ============================================================
    // 11. BENTO CARDS — Stagger reveal with ScrollTrigger
    // ============================================================
    gsap.utils.toArray('.bento-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // Floating icon animation for bento icons
    gsap.utils.toArray('.bento-icon').forEach(icon => {
        gsap.to(icon, {
            y: -4,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
                trigger: icon,
                start: 'top 90%',
                toggleActions: 'play pause resume pause',
            },
        });
    });

    // ============================================================
    // 12. ABOUT SECTION — Parallax image
    // ============================================================
    const aboutImg = document.querySelector('.about-image-wrapper');
    if (aboutImg) {
        gsap.to(aboutImg, {
            y: -30,
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            },
        });
    }

    // About badge pop
    const aboutBadge = document.querySelector('.about-badge');
    if (aboutBadge) {
        gsap.fromTo(aboutBadge,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.7,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: aboutBadge,
                    start: 'top 85%',
                },
            }
        );
    }

    // ============================================================
    // 13. TESTIMONIAL CARDS — Stagger
    // ============================================================
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                delay: i * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ============================================================
    // 14. CONTACT BENTO — Stagger cards
    // ============================================================
    gsap.utils.toArray('.contact-info-card, .contact-cta-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });

    // ============================================================
    // 15. Subtle pulse for CTA buttons
    // ============================================================
    gsap.to('.btn-lime', {
        boxShadow: '0 0 30px rgba(200, 241, 105, 0.35)',
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
    });

});
