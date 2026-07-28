/* ============================================
   PEKO PEKO EATERY ,  INTERACTIVE SCRIPTS
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       0. I18N + OPEN BADGE
       ========================================== */
    if (window.PekoI18n) {
        window.PekoI18n.init();
    }

    const openBadge = document.getElementById('openBadge');

    const getNepalDate = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }));

    const updateOpenBadge = () => {
        if (!openBadge || !window.PekoI18n) return;

        const nepal = getNepalDate();
        const day = nepal.getDay();
        const minutes = nepal.getHours() * 60 + nepal.getMinutes();
        const openAt = 11 * 60;
        const closeAt = 22 * 60;
        const lang = window.PekoI18n.lang;
        const t = (key) => window.PekoI18n.strings[key]?.[lang] || window.PekoI18n.strings[key]?.en || '';

        openBadge.classList.remove('open-badge--loading', 'open-badge--open', 'open-badge--closed');

        if (day === 1) {
            openBadge.textContent = t('badge.closed');
            openBadge.classList.add('open-badge--closed');
            openBadge.title = t('badge.opens');
            return;
        }

        if (minutes >= openAt && minutes < closeAt) {
            openBadge.textContent = t('badge.open');
            openBadge.classList.add('open-badge--open');
            openBadge.title = t('badge.closes');
        } else {
            openBadge.textContent = t('badge.closed');
            openBadge.classList.add('open-badge--closed');
            openBadge.title = day === 0 && minutes < openAt ? t('badge.opens') : t('badge.closes');
        }
    };

    updateOpenBadge();
    setInterval(updateOpenBadge, 60000);
    document.addEventListener('peko:langchange', updateOpenBadge);

    /* ==========================================
       0b. PHOTO PLACEHOLDER SLOTS
       ========================================== */
    document.querySelectorAll('.photo-slot').forEach(slot => {
        const input = slot.querySelector('.photo-slot-input');
        const preview = slot.querySelector('.photo-slot-preview');
        if (!input || !preview) return;

        slot.addEventListener('click', () => input.click());

        input.addEventListener('change', () => {
            const file = input.files && input.files[0];
            if (!file || !file.type.startsWith('image/')) return;

            if (preview.dataset.objectUrl) {
                URL.revokeObjectURL(preview.dataset.objectUrl);
            }

            const url = URL.createObjectURL(file);
            preview.dataset.objectUrl = url;
            preview.src = url;
            preview.hidden = false;
            slot.classList.add('photo-slot--filled');
        });
    });

    /* ==========================================
       1. MOBILE HAMBURGER MENU TOGGLE
       ========================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /* ==========================================
       2. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       3. ANNOUNCEMENT BAR ,  PAUSE ON VISIBILITY
       ========================================== */
    const announcementTrack = document.querySelector('.announcement-track');

    if (announcementTrack) {
        document.addEventListener('visibilitychange', () => {
            announcementTrack.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
    }

    /* ==========================================
       3b. GALLERY ,  draggable infinite carousel
       ========================================== */
    (function initGalleryCarousel() {
        const wrapper = document.getElementById('galleryCarousel');
        const track = document.getElementById('galleryTrack');
        if (!wrapper || !track) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let position = 0;
        let isDragging = false;
        let startX = 0;
        let startPos = 0;
        let loopWidth = 0;
        const autoSpeed = prefersReducedMotion ? 0 : 0.45;

        const measureLoop = () => {
            loopWidth = track.scrollWidth / 2;
        };

        const wrapPosition = () => {
            if (loopWidth <= 0) return;
            while (position <= -loopWidth) position += loopWidth;
            while (position > 0) position -= loopWidth;
        };

        const applyTransform = () => {
            wrapPosition();
            track.style.transform = `translate3d(${position}px, 0, 0)`;
        };

        const tick = () => {
            if (!isDragging && autoSpeed) {
                position -= autoSpeed;
                applyTransform();
            }
            requestAnimationFrame(tick);
        };

        const onPointerDown = (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            isDragging = true;
            wrapper.classList.add('is-dragging');
            startX = e.clientX;
            startPos = position;
            wrapper.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            position = startPos + (e.clientX - startX);
            applyTransform();
        };

        const endDrag = (e) => {
            if (!isDragging) return;
            isDragging = false;
            wrapper.classList.remove('is-dragging');
            try { wrapper.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }
        };

        const remeasure = () => {
            measureLoop();
            applyTransform();
        };

        wrapper.addEventListener('pointerdown', onPointerDown);
        wrapper.addEventListener('pointermove', onPointerMove);
        wrapper.addEventListener('pointerup', endDrag);
        wrapper.addEventListener('pointercancel', endDrag);

        remeasure();
        window.addEventListener('resize', remeasure, { passive: true });
        window.addEventListener('load', remeasure);
        track.querySelectorAll('img').forEach((img) => {
            if (!img.complete) img.addEventListener('load', remeasure, { once: true });
        });
        tick();
    })();

    /* ==========================================
       4. REVIEWS ,  pinned section, cards scroll only
       REVIEWS text is always in the sticky viewport.
       JS only moves the review cards.
       ========================================== */
    const reviewsSection = document.querySelector('.reviews-section');
    const reviewCards = document.querySelectorAll('[data-review-card]');
    const reviewsSpacer = reviewsSection?.querySelector('.reviews-scroll-spacer');

    if (reviewsSection && reviewsSpacer && reviewCards.length > 0) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* Slow stagger ,  cards use ~85% of scroll; last 15% = brief hold then unpin */
        const CARD_STARTS = [0.05, 0.20, 0.35, 0.50, 0.65];
        const CARD_DURATION = 0.14;

        const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

        const getScrollProgress = () => {
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const rect = reviewsSpacer.getBoundingClientRect();
            const scrollable = reviewsSpacer.offsetHeight - vh;
            if (scrollable <= 0) return 0;
            const scrolled = clamp(-rect.top, 0, scrollable);
            return scrolled / scrollable;
        };

        const animateCard = (card, index, progress, vh) => {
            const start = CARD_STARTS[index];
            const end = start + CARD_DURATION;
            const enterFrom = vh * 1.1;
            const exitAt = -(vh * 0.25);

            if (progress < start) {
                card.style.setProperty('--card-opacity', '0');
                card.style.setProperty('--card-y', `${enterFrom}px`);
                return;
            }

            if (progress > end) {
                card.style.setProperty('--card-opacity', '0');
                card.style.setProperty('--card-y', `${exitAt}px`);
                return;
            }

            const local = (progress - start) / (end - start);
            const y = enterFrom + (exitAt - enterFrom) * local;
            const opacity = local < 0.08 ? local / 0.08 : local > 0.92 ? (1 - local) / 0.08 : 1;

            card.style.setProperty('--card-opacity', opacity.toFixed(3));
            card.style.setProperty('--card-y', `${y.toFixed(1)}px`);
        };

        const updateReviews = () => {
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const progress = getScrollProgress();
            const rect = reviewsSpacer.getBoundingClientRect();
            const isPinned = rect.top <= 0 && rect.bottom > vh;

            reviewCards.forEach((card, i) => {
                if (!isPinned) {
                    card.style.setProperty('--card-opacity', '0');
                    return;
                }
                animateCard(card, i, progress, vh);
            });
        };

        if (prefersReducedMotion) {
            reviewsSection.classList.add('reviews--static');
        } else {
            let ticking = false;
            const onScrollOrResize = () => {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    updateReviews();
                    ticking = false;
                });
            };
            window.addEventListener('scroll', onScrollOrResize, { passive: true });
            window.addEventListener('resize', onScrollOrResize, { passive: true });
            updateReviews();
        }
    }

    /* ==========================================
        5. CANVAS PARTICLE SYSTEM ,  Floating Crimson Embers
        Renders glowing #E31B23 particles in the hero background.
        ========================================== */
    (function initParticles() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:2;';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const hero = document.querySelector('.hero');
        if (!hero) return;
        hero.style.position = 'relative';
        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const PARTICLE_COLOR = '#dc143c';
        const PARTICLE_COUNT = 80;
        let particles = [];

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + 20;
                this.size = Math.random() * 3 + 1.5;
                this.speedY = -(Math.random() * 0.8 + 0.3);
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity = Math.max(0, this.opacity - 0.002);
                if (this.y < -20 || this.opacity <= 0) this.reset();
            }
            draw() {
                const alpha = this.opacity * (0.7 + 0.3 * Math.sin(Date.now() * this.pulseSpeed + this.pulsePhase));
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.shadowBlur = 15;
                ctx.shadowColor = PARTICLE_COLOR;
                ctx.fillStyle = PARTICLE_COLOR;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                // Glow halo
                ctx.shadowBlur = 30;
                ctx.globalAlpha = alpha * 0.3;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = new Particle();
            p.y = Math.random() * canvas.height;
            p.opacity = Math.random() * 0.5 + 0.2;
            particles.push(p);
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    })();

    /* ==========================================
        6. CONSOLE BRANDING (optional easter egg)
        ========================================== */
    console.log(
        '%c🍽️ Peko Peko Eatery %cCome Hungry',
        'font-family: "Bodoni Moda", serif; font-size: 20px; font-weight: 700; color: #ffffff;',
        'font-family: "Playfair Display", serif; font-size: 18px; font-style: italic; color: #dc143c;'
    );
    console.log('%cSunakothi & Thecho ,  pizza, wings, momo & keema noodles.', 'font-style: italic; color: #888;');

});
