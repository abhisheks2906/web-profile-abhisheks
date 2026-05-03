// modern.js

console.log("Modern JS Loaded Successfully!");

document.addEventListener('DOMContentLoaded', () => {
    // Magnet Effect Code...
    const magnetElements = document.querySelectorAll('.btn, .social-btn, .filter-btn, #theme-toggle');

    console.log("Found " + magnetElements.length + " magnet elements");

    magnetElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const pos = el.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Magnet Effect Function
    const initMagnetEffect = () => {
        const magnetElements = document.querySelectorAll('.btn, .social-btn, .filter-btn, #theme-toggle, .nav-link');

        magnetElements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const pos = el.getBoundingClientRect();
                const x = e.clientX - pos.left - pos.width / 2;
                const y = e.clientY - pos.top - pos.height / 2;

                gsap.to(el, {
                    x: x * 0.35,
                    y: y * 0.35,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    };

    // Initialize Effects
    if (window.innerWidth > 768) {
        initMagnetEffect();
    }
});


// =========================================
// SCROLL TO TOP LOGIC
// =========================================
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    // Scroll check karne ke liye event listener
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) { // Jab 400px niche scroll ho jaye
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    // Click karne par upar le jane ke liye
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Makhan ki tarah upar jayega
        });
    });
}
// =========================================
// Lazy Loading Images (Performance Boost)
// ========================================

card.innerHTML = `
    <div class="project-img-wrapper">
        <img src="${project.image}" alt="${project.title}" loading="lazy" class="lazy-image">
    </div>
    <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-links">
            <a href="${project.demoLink}" class="live-demo">Live Demo</a>
        </div>
    </div>
`;