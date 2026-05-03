document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. GSAP Loader & Hero Animation
    // =========================================
    const tl = gsap.timeline();
    const loader = document.querySelector(".loader");

    // 1. Loader Animation (Sirf tabhi chalega jab loader exist karega)
    if (loader) {
        tl.to(loader, {
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
                loader.style.display = "none";
            }
        });
    }
    // 2. Hero Animations (Ye hamesha chalenge, chahe loader ho ya na ho)
    tl.from(".gsap-hero-img", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, loader ? "-=0.4" : "0") // Agar loader nahi hai, toh turant start karo
        .from(".gsap-hero", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.8");


    // =========================================
    // 2. Theme Toggle Logic (Light/Dark)
    // =========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const htmlElement = document.documentElement;

    // Check Local Storage for saved theme
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);
    // updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        let currentTheme = htmlElement.getAttribute("data-theme");
        let newTheme = currentTheme === "dark" ? "light" : "dark";

        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === "dark") {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    }

    // =========================================
    // 3. Mobile Navigation Menu (FIXED & MERGED)
    // =========================================
    
    const hamburger = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links"); // Sahi HTML class
    const navItems = document.querySelectorAll(".nav-link");

    // Check if elements exist to prevent null errors
    if (hamburger && navLinksContainer) {
        
        // 1. Hamburger Click Event
        hamburger.addEventListener("click", () => {
            // Menu ko andar/bahar karne ke liye class toggle
            navLinksContainer.classList.toggle("active");

            // Icon Change & GSAP Animation logic
            const icon = hamburger.querySelector("i");
            
            if (navLinksContainer.classList.contains("active")) {
                // Menu khula -> Cross icon lagao
                icon.classList.replace("fa-bars", "fa-times");
                
                // GSAP smooth entry animation links ke liye
                if (typeof gsap !== "undefined") {
                    gsap.fromTo(navItems, 
                        { x: 50, opacity: 0 }, 
                        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
                    );
                }
            } else {
                // Menu band hua -> Wapas 3 lines wala icon lagao
                icon.classList.replace("fa-times", "fa-bars");
            }
        });

        // 2. Link Click Event (Menu band karne ke liye)
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                // Agar menu khula hai, toh band kar do
                if (navLinksContainer.classList.contains("active")) {
                    navLinksContainer.classList.remove("active");
                    
                    // Icon wapas normal kar do
                    const icon = hamburger.querySelector("i");
                    if (icon) {
                        icon.classList.replace("fa-times", "fa-bars");
                    }
                }
            });
        });
        
    } else {
        console.error("Error: .hamburger or .nav-links class nahi mili HTML mein.");
    }

    // =========================================
    // 4. Typing Effect
    // =========================================
    const typingText = document.querySelector(".typing-text");
    const words = ["Data Analytics", "Python Developer", "Freelancer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect slightly after initial load
    setTimeout(typeEffect, 2000);

    // =========================================
    // 5. Skill Circles & Color Animation (UPDATED)
    // =========================================
    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach(card => {
        const circle = card.querySelector(".progress");
        const percent = circle.getAttribute("data-percent");

        // Math for circle drawing
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        // GSAP fromTo: Starting state se le kar End state tak animation
        gsap.fromTo(circle,
            {
                strokeDashoffset: circumference, // Circle pura khali (0%)
                stroke: "#555555"                // 0% par starting color (Gray)
            },
            {
                scrollTrigger: {
                    trigger: card,               // Jab skill card dikhega
                    start: "top 100%",           // Screen ke bottom se start hoga
                    toggleActions: "play none none none"
                },
                strokeDashoffset: offset,        // Target percentage tak bharega
                stroke: "var(--primary-color)",  // Gray se smoothly Theme Color (Gold/Orange) ban jayega
                duration: 2.5,                   // Number counter ke sath exact sync (2.5 seconds)
                ease: "power2.out"
            }
        );
    });
    // =========================================
    // 5.5 Number Count-Up Animation (FIXED)
    // =========================================
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const targetNumber = parseInt(counter.getAttribute('data-target'));

        // Pura sure karne ke liye ki starting humesha 0 se ho
        counter.innerHTML = 0;

        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter, // Ab animation tabhi start hoga jab number khud view mein aayega
                start: "top 104%", // 'top 100%' matlab screen me thoda niche aane par hi start hoga
                toggleActions: "play none none none"
            },
            innerHTML: targetNumber,
            duration: 2.5,           // Thoda smooth aur slow karne ke liye 2.5 seconds
            snap: { innerHTML: 1 },
            ease: "power2.out"
        });
    });

    // =========================================
    // 5.6 Timeline Cards Sliding Animation
    // =========================================
    const timelineItems = gsap.utils.toArray(".timeline-anim");

    timelineItems.forEach((item, index) => {
        // Agar item left class ka hai, toh -100px se aayega, right hai toh +100px se
        const isLeft = item.classList.contains("left");
        const xOffset = isLeft ? -100 : 100;

        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%", // Screen me thoda dikhne par start hoga
                toggleActions: "play none none none"
            },
            x: xOffset,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // =========================================
    // 6. Active Link Highlight on Scroll
    // =========================================
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // =========================================
    // 7. REAL Form Submission (Web3Forms API)
    // =========================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.querySelector(".form-status");
    const submitBtn = document.querySelector(".submit-btn");
    const btnText = document.querySelector(".btn-text");
    const btnIcon = document.querySelector(".btn-icon");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.style.color = "red";
                formStatus.textContent = "Please enter a valid email address.";
                return;
            }

            formStatus.textContent = "";

            // 1. Loading State Start (UI Animation)
            btnText.textContent = "Sending...";
            btnIcon.className = "fas fa-spinner fa-spin";
            submitBtn.style.opacity = "0.8";
            submitBtn.style.pointerEvents = "none";

            // 2. Real API Data Setup
            const formData = {
                access_key: "e612e699-5d97-4f0b-a08b-60a784d77b4a",
                name: name,
                email: email,
                message: message,
                subject: `New Message from ${name} - Portfolio`
            };

            // 3. Sending Data to Server
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        // 4. Success State
                        btnText.textContent = "Sent Successfully!";
                        btnIcon.className = "fas fa-check-circle";

                        submitBtn.style.backgroundColor = "#28a745";
                        submitBtn.style.color = "#ffffff";
                        submitBtn.style.borderColor = "#28a745";
                        submitBtn.style.opacity = "1";

                        formStatus.style.color = "var(--primary-color)";
                        formStatus.textContent = "Thanks, " + name.split(' ')[0] + "! I received your message.";
                        contactForm.reset();
                    } else {
                        // Error state handled by API
                        console.log(response);
                        formStatus.style.color = "red";
                        formStatus.textContent = json.message;
                        resetButtonUI();
                    }
                })
                .catch(error => {
                    console.log(error);
                    formStatus.style.color = "red";
                    formStatus.textContent = "Something went wrong! Please try again.";
                    resetButtonUI();
                })
                .then(function () {
                    // Reset Button after 4 Seconds on Success
                    setTimeout(() => {
                        resetButtonUI();
                        formStatus.textContent = "";
                    }, 4000);
                });

            // Helper function to reset button UI
            function resetButtonUI() {
                btnText.textContent = "Send Message";
                btnIcon.className = "fas fa-paper-plane";
                submitBtn.style.backgroundColor = "";
                submitBtn.style.color = "";
                submitBtn.style.borderColor = "";
                submitBtn.style.pointerEvents = "all";
            }
        });
    }

    // =========================================
    // 8. Portfolio Category Filter (Vertical)
    // =========================================

    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // 1. Button active state
            filterBtns.forEach(button => button.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            // 2. Smooth Animation Cycle
            portfolioCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || filterValue === category) {
                    // Pehle display block karein par opacity 0 rakhein
                    card.style.display = "block";

                    gsap.fromTo(card,
                        { opacity: 0, scale: 0.8, y: 30 },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "back.out(1.7)", // Isse ek halka sa bounce aayega jo premium lagta hai
                            clearProps: "all"
                        }
                    );
                } else {
                    // Gayab hone ka animation
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        onComplete: () => {
                            card.style.display = "none";
                        }
                    });
                }
            });
        });
    });

    // =========================================
    // 9. 3D Tilt Hover Effect on Cards
    // =========================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X relative to card
            const y = e.clientY - rect.top;  // Mouse Y relative to card

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -15; // Max 15 degree tilt
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none'; // Smooth tracking ke liye transition band
        });

        card.addEventListener('mouseleave', () => {
            // Mouse hatne par wapas normal ho jaye
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
    });

    // =========================================
    // 10. Bento Box Grid Pop-up Animation
    // =========================================
    gsap.from(".bento-anim", {
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, /* Ek box ke baad dusra aayega */
        ease: "back.out(1.5)" /* Thoda bounce hoke aayega */
    });

    // =========================================
    // 11. Scroll Progress Bar Logic
    // =========================================
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        scrollProgress.style.width = scrollPercent + '%';
    });

    // =========================================
    // 12. Custom Cursor Tracking & Hover (UPDATED)
    // =========================================
    const cursor = document.querySelector('.custom-cursor');

    // Sirf Desktop standard par chalega
    if (window.innerWidth > 768) {
        // Cursor movement
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // Effect 1: Growing Cursor on interactable elements
        // Maine isme se input aur textarea hata diya hai kyunki ab hum use hide karenge
        const hoverElements = document.querySelectorAll('a, button, .filter-btn, .portfolio-card, .bento-item, .timeline-content');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
        });

        // Effect 2 (NEW): Hiding Cursor when Input/Textarea is focused (clicked)
        const allInputs = document.querySelectorAll('input, textarea');

        allInputs.forEach(input => {
            // Jab box pe click ho ya keyboard se select ho (Focus)
            input.addEventListener('focus', () => {
                cursor.classList.add('cursor-hide');
            });

            // Jab box se bahar click ho (Blur)
            input.addEventListener('blur', () => {
                cursor.classList.remove('cursor-hide');
            });
        });
    }

});