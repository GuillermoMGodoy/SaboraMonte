document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const nav = document.querySelector('header nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Cambiar el texto del botón para accesibilidad (opcional)
            if (nav.classList.contains('active')) {
                menuButton.setAttribute('aria-label', 'Cerrar menú');
                menuButton.innerHTML = '✕'; // Un icono de cierre simple
            } else {
                menuButton.setAttribute('aria-label', 'Abrir menú');
                menuButton.innerHTML = '☰';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Solo aplicar smooth scroll para enlaces internos (#)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Cierra el menú móvil si está abierto antes de desplazarse
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuButton.setAttribute('aria-label', 'Abrir menú');
                        menuButton.innerHTML = '☰';
                    }

                    // Calcular el offset del header fijo
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // 50px de margen
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        // Caso especial para el inicio si está muy arriba
        if (window.pageYOffset < sections[0].offsetTop - headerHeight - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('header nav a[href="#inicio"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });


    // Contact Form Submission (simple example, no real sending)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual submission for this demo

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Gracias por tu mensaje, ' + name + '. Nos pondremos en contacto contigo pronto.');
                contactForm.reset(); // Clear the form
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

});