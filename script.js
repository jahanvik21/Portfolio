document.addEventListener('DOMContentLoaded', () => {

    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Text Animation Setup ---
    const heroHeading = new SplitType('.hero-heading', { types: 'chars' });
    
    // --- Splash Screen Logic ---
    const splashScreen = document.getElementById('splash-screen');
    const splashLogo = document.getElementById('splash-logo');
    const mainContent = document.getElementById('main-content');

    function enterSite() {
        if (!splashScreen || splashScreen.style.display === 'none') return;
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            if (mainContent) {
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    gsap.to(heroHeading.chars, {
                        y: 0,
                        stagger: 0.03,
                        delay: 0.1,
                        duration: 1,
                        ease: 'power4.out'
                    });
                }, 50);
            }
            document.body.style.overflowY = 'auto';
        }, 600);
    }

    if(splashLogo) {
        splashLogo.addEventListener('click', enterSite);
    }
    setTimeout(enterSite, 3500);
    document.body.style.overflowY = 'hidden';

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('hero-heading')) {
            observer.observe(el);
        }
    });
    
    // --- Unified Project Gallery & Lightbox Setup ---
    const projectGallery = document.querySelector('.project-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxClose = document.getElementById('lightbox-close');

    if (projectGallery && lightbox) {
        const projects = [
            {
                type: 'image',
                src: './Assets/BURGER POST.png',
                title: 'Food Post'
            },
            {
                type: 'video',
                src: './Assets/fashion1.mp4',
                title: 'Fashion Showcase'
            },
            {
                type: 'image',
                src: './Assets/Gym.jpg',
                title: 'Fitness App Promo'
            },
            {
                type: 'video',
                src: './Assets/Bridal.mp4',
                title: 'Makeup Artistry Showcase'
            },
            {
                type: 'image',
                src: './Assets/Mumbai.png',
                title: 'Mumbai Cityscape'
            },
            {
                type: 'video',
                src: './Assets/fitness3.mp4',
                title: 'Fitness Journey'
            },
            {
                type: 'image',
                src: './Assets/restaurant2.jpg',
                title: 'Food Photography'
            },
            {
                type: 'video',
                src: './Assets/fashion3.mp4',
                title: 'Fashion Showcase'
            }
        ];
        
        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'project-gallery-item reveal';
            
            let mediaElement;
            if (project.type === 'image') {
                mediaElement = `<img src="${project.src}" alt="${project.title}">`;
            } else if (project.type === 'video') {
                mediaElement = `
                    <video loop muted playsinline autoplay>
                        <source src="${project.src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="play-icon">
                        <svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3.22v13.56c0 .79.87 1.27 1.54.84l10.29-6.78a.98.98 0 000-1.68L5.54 2.38C4.87 1.95 4 2.43 4 3.22z"></path></svg>
                    </div>
                `;
            }

            item.innerHTML = `
                ${mediaElement}
                <div class="project-gallery-overlay">
                    <h3 class="project-gallery-title">${project.title}</h3>
                </div>
            `;
            
            projectGallery.appendChild(item);
            observer.observe(item);

            // Add click listener to open lightbox
            item.addEventListener('click', () => {
                lightbox.classList.add('active');
                // The sizing classes have been REMOVED from the lines below
                if (project.type === 'image') {
                    lightboxContent.innerHTML = `<img src="${project.src}">`;
                } else if (project.type === 'video') {
                    lightboxContent.innerHTML = `<video src="${project.src}" controls autoplay></video>`;
                }
            });
        });

        // Close lightbox functionality
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = ''; // Clear content to stop video playback
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                 closeLightbox();
            }
        });
    }
});