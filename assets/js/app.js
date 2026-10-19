/**
 * Optimized ParticlesJS configuration for Dinesh Kumar Yadav portfolio.
 * - Dynamic particle count: Desktop (40-50), Mobile (15-20)
 * - Accessibility: Disabled if prefers-reduced-motion is active
 * - Performance: Automatically paused when hero is off-screen or tab is hidden
 */
(function () {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        return;
    }

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 45;

    if (typeof particlesJS !== 'undefined') {
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
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.35,
                    "random": false,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 140,
                    "color": "#000000",
                    "opacity": 0.25,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
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
                        "distance": 80,
                        "duration": 0.4
                    }
                }
            },
            "retina_detect": false
        });

        // Pause animation when tab is inactive or hero is off-screen
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
})();