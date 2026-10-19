/**
 * Optimized ParticlesJS configuration for Dinesh Kumar Yadav portfolio.
 * - Dynamic particle count: Desktop (40), Mobile (15)
 * - Mobile CPU optimization: line_linked disabled on mobile to prevent sqrt calculations
 * - Deferred initialization via requestIdleCallback to free main thread during initial load
 * - Accessibility: Disabled if prefers-reduced-motion is active
 * - Auto-pause on scroll and tab switch
 */
(function () {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    function initParticles() {
        if (typeof particlesJS === 'undefined') return;

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 15 : 40;

        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": particleCount,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#000000"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.3,
                    "random": false
                },
                "size": {
                    "value": 3.5,
                    "random": true
                },
                "line_linked": {
                    "enable": !isMobile,
                    "distance": 130,
                    "color": "#000000",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": !isMobile,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 70,
                        "duration": 0.4
                    }
                }
            },
            "retina_detect": false
        });

        let heroInView = true;

        function updateParticleState() {
            if (!window.pJSDom || !window.pJSDom[0] || !window.pJSDom[0].pJS) return;
            const pJS = window.pJSDom[0].pJS;
            if (document.hidden || !heroInView) {
                pJS.particles.move.enable = false;
            } else {
                pJS.particles.move.enable = true;
                if (typeof pJS.fn.vendors.draw === 'function') {
                    pJS.fn.vendors.draw();
                }
            }
        }

        document.addEventListener('visibilitychange', updateParticleState);

        const heroEl = document.getElementById('home');
        if (heroEl && 'IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    heroInView = entry.isIntersecting;
                    updateParticleState();
                });
            }, { threshold: 0.05 });
            heroObserver.observe(heroEl);
        }
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(initParticles, { timeout: 1200 });
    } else {
        setTimeout(initParticles, 600);
    }
})();