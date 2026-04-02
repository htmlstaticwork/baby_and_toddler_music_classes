/* 
  Main JavaScript for Baby & Toddler Music Classes 
*/

document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 500); // Small delay for smooth feel
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');
    const html = document.documentElement;

    // Dark Mode Toggle Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            }
        });
    }

    // RTL Toggle Logic
    const savedDir = localStorage.getItem('dir');
    if (savedDir === 'rtl') {
        html.setAttribute('dir', 'rtl');
        if (rtlToggle) rtlToggle.innerText = 'LTR';
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            if (currentDir === 'rtl') {
                html.removeAttribute('dir');
                localStorage.setItem('dir', 'ltr');
                rtlToggle.innerText = 'RTL';
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
                rtlToggle.innerText = 'LTR';
            }
        });
    }

    // Sticky Header Scroll Logic
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.style.padding = '1rem 0';
            }
        });
    }

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Simple Audio Player Initialization
    const audioPlayers = document.querySelectorAll('.custom-audio-player');
    audioPlayers.forEach(player => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        const progressBar = player.querySelector('.progress-bar-inner');

        if (playBtn && audio) {
            playBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
                } else {
                    audio.pause();
                    playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
                }
            });

            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                if (progressBar) progressBar.style.width = `${progress}%`;
            });
        }
    });

    // Active Link Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .home-dropdown-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');

            const homeCard = link.querySelector('.home-card');
            if (homeCard) homeCard.classList.add('active');

            const dropdown = link.closest('.nav-item.dropdown');
            if (dropdown) {
                const parentNav = dropdown.querySelector('.nav-link');
                if (parentNav) parentNav.classList.add('active');
            }
        }
    });

    // Scroll to Top Injection & Logic
    const setupScrollTop = () => {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.setAttribute('title', 'Scroll to Top');
        document.body.appendChild(scrollTopBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };
    setupScrollTop();

    // Decorative Background Injection
    const injectDecorations = () => {
        const corners = [
            { icon: 'bi-music-note-beamed', pos: 'tl' },
            { icon: 'bi-mic-fill', pos: 'tr' },
            { icon: 'bi-balloon-heart', pos: 'bl' },
            { icon: 'bi-boombox-fill', pos: 'br' }
        ];

        corners.forEach(corner => {
            const el = document.createElement('i');
            el.className = `bi ${corner.icon} corner-icon corner-${corner.pos}`;
            document.body.appendChild(el);
        });
    };
    injectDecorations();

    // Password Toggle Logic
    const initPasswordToggle = () => {
        const toggleBtns = document.querySelectorAll('.password-toggle-btn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.parentElement.querySelector('input');
                if (!input) return;
                const icon = btn.querySelector('i');
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('bi-eye');
                    icon.classList.add('bi-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('bi-eye-slash');
                    icon.classList.add('bi-eye');
                }
            });
        });
    };
    initPasswordToggle();

    // Global Form Validation (Bootstrap style)
    const initFormValidation = () => {
        const forms = document.querySelectorAll('.needs-validation');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    // Success handling for various forms
                    if (form.id === 'login-form' || form.id === 'signup-form') {
                        e.preventDefault();
                        window.location.href = 'dashboard.html';
                    } else if (form.id === 'booking-form') {
                        e.preventDefault();
                        const successModal = document.getElementById('successModal');
                        if (successModal) {
                            const modal = new bootstrap.Modal(successModal);
                            modal.show();
                        }
                    } else if (form.id === 'contact-form') {
                        e.preventDefault();
                        alert('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
                        form.reset();
                        form.classList.remove('was-validated');
                        return; // Prevent adding was-validated again
                    }
                }
                form.classList.add('was-validated');
            }, false);
        });
    };
    initFormValidation();

    // Dashboard Sidebar Logic
    window.toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar) {
            sidebar.classList.toggle('show');
            if (overlay) overlay.classList.toggle('show');
        }
    };

    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            window.toggleSidebar();
        });
    }
});
