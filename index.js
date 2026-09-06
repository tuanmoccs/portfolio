// ==========================================================================
// Trinh Tuan Anh Portfolio - Interactive JavaScript Logic & Language Switcher
// Default Language: English (EN)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Language Switcher Logic (Default: English)
    let currentLang = localStorage.getItem('portfolio_lang') || 'en';
    const langToggleBtn = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');

    const updateLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('portfolio_lang', lang);
        document.documentElement.lang = lang;

        if (langLabel) {
            langLabel.textContent = lang === 'en' ? 'EN' : 'VI';
        }

        // Find all translatable elements with data-en and data-vi
        const translatableElements = document.querySelectorAll('[data-en][data-vi]');
        
        translatableElements.forEach(el => {
            const textEN = el.getAttribute('data-en');
            const textVI = el.getAttribute('data-vi');
            const targetText = lang === 'vi' ? textVI : textEN;

            if (!targetText) return;

            // If the element contains icon <i> or child tags, update only text node or target span
            const icon = el.querySelector('i');
            if (icon) {
                // Keep the icon element intact and replace text after icon
                const iconHTML = icon.outerHTML;
                el.innerHTML = `${iconHTML} ${targetText}`;
            } else {
                el.textContent = targetText;
            }
        });
    };

    // Initialize language on load
    updateLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'en' ? 'vi' : 'en';
            updateLanguage(nextLang);
        });
    }

    // 2. Sticky Navigation Bar & Active Link Scrollspy
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    const handleScroll = () => {
        // Sticky Header effect
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scrollspy Link Highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });

        // Back to top button visibility
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    // 3. Mobile Menu Toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when clicking a link
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 4. Project Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 30);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 5. Back to Top Button Click
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
