/**
 * SPLITCODE Portfolio - Enhanced Interactive Features
 * Улучшенные интерактивные эффекты и анимации
 */

// ==================== //
// Page Load Animation
// ==================== //

const pageLoadAnimation = () => {
    document.body.classList.add('loaded');
};

window.addEventListener('load', pageLoadAnimation);

// ==================== //
// Плавная прокрутка
// ==================== //

document.addEventListener('DOMContentLoaded', () => {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==================== //
// Enhanced Image Loading with Blur-up Effect
// ==================== //

const enhancedImageLoading = () => {
    const images = document.querySelectorAll('.case-images img, .work-pair img');

    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', enhancedImageLoading);

// ==================== //
// Staggered Animation for Case Images
// ==================== //

const animateCaseImages = () => {
    const cases = document.querySelectorAll('.case');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const images = entry.target.querySelectorAll('.case-images img');
                images.forEach((img, index) => {
                    setTimeout(() => {
                        img.classList.add('loaded');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cases.forEach(case_ => observer.observe(case_));
};

document.addEventListener('DOMContentLoaded', animateCaseImages);

// ==================== //
// Scroll Reveal Animation (Optimized)
// ==================== //

const optimizedAnimations = () => {
    const animatedElements = document.querySelectorAll('.case, .stage-card, .work-pair');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    animatedElements.forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', optimizedAnimations);

// ==================== //
// Magnetic Hover Effect
// ==================== //

const addMagneticEffect = () => {
    const magneticElements = document.querySelectorAll('.tag, .stage-card, .telegram-link');

    magneticElements.forEach(element => {
        let rafId = null;

        element.addEventListener('mousemove', (e) => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const moveX = x * 0.15;
                const moveY = y * 0.15;

                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                rafId = null;
            });
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
};

document.addEventListener('DOMContentLoaded', addMagneticEffect);

// ==================== //
// Dynamic Star Positioning Based on Document Height
// ==================== //

const positionStarsDynamically = () => {
    const stars = document.querySelectorAll('.star');
    const documentHeight = document.documentElement.scrollHeight;

    // Распределяем звезды равномерно по высоте документа
    stars.forEach((star, index) => {
        // Рассчитываем позицию для каждой звезды
        // Оставляем отступы сверху (5%) и снизу (5%)
        const startOffset = documentHeight * 0.05;
        const endOffset = documentHeight * 0.95;
        const usableHeight = endOffset - startOffset;

        // Распределяем звезды равномерно
        const starCount = stars.length;
        const position = startOffset + (usableHeight / starCount) * index;

        star.style.top = `${position}px`;
    });
};

// ==================== //
// Enhanced Parallax with Rotation for Stars
// ==================== //

const enhancedParallaxWithRotation = () => {
    const stars = document.querySelectorAll('.star');
    let rafId = null;
    let startTime = Date.now();

    // Устанавливаем начальные позиции звезд на основе высоты документа
    positionStarsDynamically();

    // Индивидуальные настройки для каждой звезды (25 элементов)
    const starConfigs = [
        { parallaxSpeed: 0.08, rotationSpeed: 95000, horizontalShift: 0.04 },   // star-1
        { parallaxSpeed: 0.10, rotationSpeed: 110000, horizontalShift: -0.05 }, // star-2: обратное
        { parallaxSpeed: 0.12, rotationSpeed: 85000, horizontalShift: 0.06 },   // star-3
        { parallaxSpeed: 0.15, rotationSpeed: 120000, horizontalShift: -0.06 }, // star-4: обратное
        { parallaxSpeed: 0.11, rotationSpeed: 90000, horizontalShift: 0.05 },   // star-5
        { parallaxSpeed: 0.14, rotationSpeed: 105000, horizontalShift: -0.05 }, // star-6: обратное
        { parallaxSpeed: 0.13, rotationSpeed: 95000, horizontalShift: 0.05 },   // star-7
        { parallaxSpeed: 0.16, rotationSpeed: 115000, horizontalShift: -0.07 }, // star-8: обратное
        { parallaxSpeed: 0.12, rotationSpeed: 100000, horizontalShift: 0.06 },  // star-9
        { parallaxSpeed: 0.17, rotationSpeed: 88000, horizontalShift: -0.06 },  // star-10: обратное
        { parallaxSpeed: 0.14, rotationSpeed: 108000, horizontalShift: 0.05 },  // star-11
        { parallaxSpeed: 0.18, rotationSpeed: 98000, horizontalShift: -0.07 },  // star-12: обратное
        { parallaxSpeed: 0.13, rotationSpeed: 93000, horizontalShift: 0.06 },   // star-13
        { parallaxSpeed: 0.16, rotationSpeed: 112000, horizontalShift: -0.06 }, // star-14: обратное
        { parallaxSpeed: 0.11, rotationSpeed: 102000, horizontalShift: 0.05 },  // star-15
        { parallaxSpeed: 0.15, rotationSpeed: 96000, horizontalShift: -0.05 },  // star-16: обратное
        { parallaxSpeed: 0.14, rotationSpeed: 107000, horizontalShift: 0.06 },  // star-17
        { parallaxSpeed: 0.17, rotationSpeed: 91000, horizontalShift: -0.06 },  // star-18: обратное
        { parallaxSpeed: 0.13, rotationSpeed: 104000, horizontalShift: 0.05 },  // star-19
        { parallaxSpeed: 0.16, rotationSpeed: 94000, horizontalShift: -0.06 },  // star-20: обратное
        { parallaxSpeed: 0.12, rotationSpeed: 109000, horizontalShift: 0.05 },  // star-21
        { parallaxSpeed: 0.15, rotationSpeed: 97000, horizontalShift: -0.05 },  // star-22: обратное
        { parallaxSpeed: 0.14, rotationSpeed: 103000, horizontalShift: 0.06 },  // star-23
        { parallaxSpeed: 0.17, rotationSpeed: 89000, horizontalShift: -0.06 },  // star-24: обратное
        { parallaxSpeed: 0.13, rotationSpeed: 106000, horizontalShift: 0.05 }   // star-25
    ];

    const updateStars = () => {
        const scrolled = window.pageYOffset;
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        stars.forEach((star, index) => {
            const config = starConfigs[index] || starConfigs[0];

            // Параллакс эффект - звезды движутся медленнее основной прокрутки
            const yPos = -(scrolled * config.parallaxSpeed);

            // Параллакс эффект по горизонтали (создает глубину)
            const xPos = scrolled * config.horizontalShift;

            // Медленное плавное вращение
            let rotation = 0;
            if (config.rotationSpeed > 0) {
                rotation = (elapsed / config.rotationSpeed) * 360;
                // Обратное вращение для звезд с отрицательным horizontalShift
                if (config.horizontalShift < 0) {
                    rotation = -rotation;
                }
            }

            // Комбинируем все трансформации в одно свойство
            star.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotate(${rotation}deg)`;
        });

        rafId = null;
    };

    const onScroll = () => {
        if (!rafId) {
            rafId = requestAnimationFrame(updateStars);
        }
    };

    // Обновляем позиции при скролле
    window.addEventListener('scroll', onScroll, { passive: true });

    // Постоянное обновление для анимации вращения
    const animateRotation = () => {
        updateStars();
        requestAnimationFrame(animateRotation);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!prefersReducedMotion.matches) {
        animateRotation();
    } else {
        // Если пользователь предпочитает меньше движения, только параллакс без вращения
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Пересчитываем позиции при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            positionStarsDynamically();
        }, 250);
    });
};

document.addEventListener('DOMContentLoaded', enhancedParallaxWithRotation);

// ==================== //
// Lightbox для изображений
// ==================== //

const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Закрыть">&times;</button>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-controls">
                <button class="lightbox-prev" aria-label="Предыдущее">‹</button>
                <button class="lightbox-next" aria-label="Следующее">›</button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    const openLightbox = (imageSrc, images, index) => {
        currentImages = images;
        currentIndex = index;
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showImage = (index) => {
        if (index >= 0 && index < currentImages.length) {
            currentIndex = index;
            lightboxImage.src = currentImages[index].src;
        }
    };

    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
            showImage(currentIndex - 1);
        }
        if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
            showImage(currentIndex + 1);
        }
    });

    const caseImages = document.querySelectorAll('.case-images img, .work-pair img');

    caseImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const allImages = Array.from(caseImages);
            openLightbox(img.src, allImages, index);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .lightbox.active {
            opacity: 1;
            visibility: visible;
        }

        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        }

        .lightbox-image {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 12px;
        }

        .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 48px;
            cursor: pointer;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
        }

        .lightbox-close:hover {
            transform: scale(1.1);
        }

        .lightbox-controls {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            pointer-events: none;
        }

        .lightbox-prev,
        .lightbox-next {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: 48px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            pointer-events: all;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: white;
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .lightbox-close {
                top: -40px;
                font-size: 36px;
            }

            .lightbox-prev,
            .lightbox-next {
                width: 48px;
                height: 48px;
                font-size: 36px;
            }
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', createLightbox);

// ==================== //
// Reading Progress Bar
// ==================== //

const createReadingProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    let rafId = null;

    const updateProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;

        progressBar.style.width = `${Math.min(progress, 100)}%`;
        rafId = null;
    };

    const onScroll = () => {
        if (!rafId) {
            rafId = requestAnimationFrame(updateProgress);
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, rgba(100, 181, 246, 0.6) 0%, rgba(179, 136, 255, 0.8) 100%);
            z-index: 10000;
            transition: width 0.1s ease;
            width: 0;
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', createReadingProgress);

// ==================== //
// Debounce Utility
// ==================== //

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ==================== //
// Window Resize Handler
// ==================== //

let windowWidth = window.innerWidth;

const handleResize = debounce(() => {
    const newWidth = window.innerWidth;

    if (Math.abs(newWidth - windowWidth) > 10) {
        windowWidth = newWidth;
    }
}, 250);

window.addEventListener('resize', handleResize);

// ==================== //
// Console Info
// ==================== //

console.log('%cSPLITCODE Portfolio', 'font-size: 24px; font-weight: bold; color: #fff; background: linear-gradient(135deg, rgba(100, 181, 246, 0.8) 0%, rgba(179, 136, 255, 0.8) 100%); padding: 10px 20px; border-radius: 8px;');
console.log('%c✨ Разработано с использованием современных веб-технологий', 'font-size: 14px; color: #888;');
console.log('%c📱 Telegram: @dnkdmtry', 'font-size: 14px; color: #0088cc;');
