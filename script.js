/**
 * Tạp hoá Toàn Lương - Custom Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic copyright year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Header background change on scroll
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

    // 3. Smooth scrolling for anchor links (mostly handled by CSS, but good fallback/enhancement)
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
    
    // 4. Mobile Menu Toggle Placeholder
    // Since this is a simple page, we hide nav on very small screens, 
    // but here is the listener if we want to expand a menu later.
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
             // In a full implementation, this would toggle a class on the nav
             alert('Menu đang được nâng cấp! Vui lòng vuốt xuống để xem thêm thông tin.');
        });
    }
});
