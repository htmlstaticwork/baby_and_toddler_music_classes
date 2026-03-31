/* 
  Main JavaScript for Baby & Toddler Music Classes 
*/

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');
    const html = document.documentElement;

    // Dark Mode Toggle Logic
    if (localStorage.getItem('theme') === 'dark') {
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
    if (localStorage.getItem('dir') === 'rtl') {
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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.padding = '1rem 0';
        }
    });

    // Simple Audio Player Initialization (for Resources Page)
    const audioPlayers = document.querySelectorAll('.custom-audio-player');
    audioPlayers.forEach(player => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        const progressBar = player.querySelector('.progress-bar-inner');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
                } else {
                    audio.pause();
                    playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
                }
            });
        }

        if (audio) {
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
            
            // Highlight the home-card if applicable
            const homeCard = link.querySelector('.home-card');
            if (homeCard) homeCard.classList.add('active');

            // Handle the parent dropdown (if inside one)
            const dropdown = link.closest('.nav-item.dropdown');
            if (dropdown) {
                const parentNav = dropdown.querySelector('.nav-link');
                if (parentNav) parentNav.classList.add('active');
            }
        }
    });

    // Scroll to Top Injection & Logic
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Decorative Background Injection
    const injectDecorations = () => {
        // Corner Icons Injection
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

    // Global Form Validation
    const initFormValidation = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValid = true;
                const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    } else {
                        input.classList.remove('is-invalid');
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert('Please fill out all required fields.');
                } else {
                    // If it's a login or signup form, redirect to dashboard as a demo
                    if (form.id === 'login-form' || form.id === 'signup-form') {
                        e.preventDefault();
                        window.location.href = 'dashboard.html';
                    }
                }
            });
        });
    };
    initFormValidation();
});
