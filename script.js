/**
 * Tạp hoá Toàn Lương - Custom Scripts
 * With GSAP + ScrollTrigger + AOS animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. Dynamic copyright year in footer
    // ============================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ============================================================
    // 2. Dynamic store open/closed status badge
    // ============================================================
    const OPEN_HOUR = 7;   // 07:00
    const CLOSE_HOUR = 22; // 22:00

    function updateStoreStatus() {
        const dot = document.getElementById('store-status-dot');
        const text = document.getElementById('store-status-text');
        if (!dot || !text) return;

        const now = new Date();
        const currentHour = now.getHours();
        const isOpen = currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR;

        if (isOpen) {
            dot.style.color = '#4caf50';        // Green
            text.textContent = 'Đang mở cửa';
        } else {
            dot.style.color = '#f44336';        // Red
            text.textContent = 'Đã đóng cửa';
        }
    }

    // Run immediately and then every 60 seconds
    updateStoreStatus();
    setInterval(updateStoreStatus, 60000);

    // ============================================================
    // 3. Header background change on scroll
    // ============================================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '15px 0';
        }
    });

    // ============================================================
    // 4. Smooth scrolling for anchor links
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ============================================================
    // 5. Mobile Menu Toggle Placeholder
    // ============================================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Menu đang được nâng cấp! Vui lòng vuốt xuống để xem thêm thông tin.');
        });
    }

    // ============================================================
    // 6. Initialize AOS (Animate On Scroll)
    // ============================================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,         // Replay animations when scrolling back
        offset: 80,          // Trigger 80px before element enters viewport
        delay: 0,
        anchorPlacement: 'top-bottom',
    });

    // ============================================================
    // 7. GSAP - Register ScrollTrigger Plugin
    // ============================================================
    gsap.registerPlugin(ScrollTrigger);

    // ============================================================
    // 8. GSAP Hero Entrance Animation (on page load)
    // ============================================================
    const heroTl = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 0.7,
        },
    });

    // Set initial state only for clip-path (can't be handled by .fromTo() easily)
    gsap.set(".hero-right", { clipPath: "inset(0 100% 0 0)" });

    // Build the hero timeline — .fromTo() for explicit control of both states
    heroTl
        .fromTo(".hero-tag",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
        )

        .fromTo(".hero-title",
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            "-=0.3"
        )

        .fromTo(".hero-subtitle",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            "-=0.4"
        )

        .fromTo(".hero-info-list",
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7 },
            "-=0.3"
        )

        .fromTo(".hero-info-item",
            { x: -25, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
            "-=0.3"
        )

        .fromTo(".hero-buttons .btn",
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
            "-=0.2"
        )

        // Hero right image panel reveal with clip-path
        .to(".hero-right", {
            clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut",
        }, "-=1.0")

        // Store status badge pops in
        .fromTo(".hero-open-badge",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
            "-=0.4"
        );

    // NOTE: Section titles are animated by AOS (data-aos attributes in HTML).
    // No additional GSAP ScrollTrigger needed here to avoid conflicts.

    // ============================================================
    // 10. GSAP ScrollTrigger - Category Cards hover bounce
    // ============================================================
    gsap.utils.toArray('.category-icon-wrapper').forEach(icon => {
        // Continuous subtle floating animation
        gsap.to(icon, {
            y: -5,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
                trigger: icon,
                start: "top 90%",
                toggleActions: "play pause resume pause",
            }
        });
    });

    // ============================================================
    // 11. GSAP ScrollTrigger - About Section parallax image
    // ============================================================
    const aboutImage = document.querySelector('.about-image-wrapper');
    if (aboutImage) {
        gsap.to(aboutImage, {
            y: -30,
            scrollTrigger: {
                trigger: '.about-section',
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });
    }

    // Experience badge rotation on scroll
    const expBadge = document.querySelector('.experience-badge');
    if (expBadge) {
        gsap.to(expBadge, {
            rotation: 10,
            scrollTrigger: {
                trigger: expBadge,
                start: "top 90%",
                end: "top 30%",
                scrub: 1,
            }
        });
    }

    // ============================================================
    // 12. GSAP ScrollTrigger - Contact section map reveal
    // ============================================================
    const contactMap = document.querySelector('.contact-map');
    if (contactMap) {
        gsap.from(contactMap, {
            scale: 0.95,
            opacity: 0.3,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: contactMap,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        });
    }

    // ============================================================
    // 13. GSAP - Contact card entrance
    // ============================================================
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        gsap.from(contactCard, {
            y: 60,
            opacity: 0.5,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: contactCard,
                start: "top 90%",
                toggleActions: "play none none reverse",
            }
        });
    }

    // ============================================================
    // 14. GSAP - Footer subtle entrance
    // ============================================================
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.from(footer, {
            opacity: 0.6,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: footer,
                start: "top 95%",
                toggleActions: "play none none reverse",
            }
        });
    }

    // ============================================================
    // 15. GSAP - Subtle pulse for hero info icons (uniform, no position shift)
    // ============================================================
    gsap.to('.hero-info-icon', {
        scale: 1.08,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
    });

    // ============================================================
    // 16. GSAP - Pulse effect for CTA buttons
    // ============================================================
    gsap.to('.btn-accent', {
        boxShadow: "0 0 25px rgba(230, 81, 0, 0.4)",
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
    });

});
