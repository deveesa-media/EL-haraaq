/* =====================================================
   ALHARAA WEBSITE
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const themeButton =
    document.getElementById("theme-toggle");

const languageButton =
    document.getElementById("language-toggle");

const menuButton =
    document.getElementById("menu-toggle");

const mainNav =
    document.getElementById("main-nav");

const topButton =
    document.getElementById("top-button");

const yearSpan =
    document.getElementById("current-year");

const header =
    document.getElementById("header");


/* =====================================================
   THEME
===================================================== */

let savedTheme =
    localStorage.getItem("theme") || "light";


function applyTheme() {

    const isDark =
        savedTheme === "dark";

    document.body.classList.toggle(
        "dark",
        isDark
    );


    if (!themeButton) {
        return;
    }


    themeButton.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';


    themeButton.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

}


applyTheme();


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            savedTheme =
                document.body.classList.contains("dark")
                    ? "light"
                    : "dark";


            localStorage.setItem(
                "theme",
                savedTheme
            );


            applyTheme();

        }
    );

}


/* =====================================================
   LANGUAGE
===================================================== */

let currentLanguage =
    localStorage.getItem("language") || "ar";


function updateLanguage() {

    const isArabic =
        currentLanguage === "ar";


    document.documentElement.lang =
        isArabic
            ? "ar"
            : "en";


    document.documentElement.dir =
        isArabic
            ? "rtl"
            : "ltr";


    document
        .querySelectorAll(
            "[data-ar][data-en]"
        )
        .forEach(element => {

            element.textContent =
                isArabic
                    ? element.dataset.ar
                    : element.dataset.en;

        });


    if (languageButton) {

        languageButton.textContent =
            isArabic
                ? "EN"
                : "AR";

    }

}


updateLanguage();


if (languageButton) {

    languageButton.addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";


            localStorage.setItem(
                "language",
                currentLanguage
            );


            updateLanguage();

        }
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

function closeMenu() {

    if (!mainNav || !menuButton) {
        return;
    }


    mainNav.classList.remove("open");


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    menuButton.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

}


if (menuButton && mainNav) {

    menuButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const isOpen =
                mainNav.classList.toggle("open");


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuButton.innerHTML =
                isOpen
                    ? '<i class="fa-solid fa-xmark"></i>'
                    : '<i class="fa-solid fa-bars"></i>';

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                mainNav.classList.contains("open") &&
                !mainNav.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                closeMenu();

            }

        }
    );

}


/* =====================================================
   BACK TO TOP
===================================================== */

if (topButton) {

    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   CURRENT YEAR
===================================================== */

if (yearSpan) {

    yearSpan.textContent =
        new Date().getFullYear();

}


/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    entry.target.classList.add(
                        "show"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${Math.min(
                    index * 45,
                    260
                )}ms`;


            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav a"
    );


if (
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        navLinks.forEach(
                            link => {

                                const isActive =
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`;


                                link.classList.toggle(
                                    "active",
                                    isActive
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }


        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );


            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.08)";

        } else {

            header.classList.remove(
                "scrolled"
            );


            header.style.boxShadow =
                "none";

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   INITIAL LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        applyTheme();

        updateLanguage();


        document
            .querySelectorAll(
                ".hero .reveal"
            )
            .forEach(element => {

                element.classList.add(
                    "show"
                );

            });

    }
);