document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MANEJO DEL MENÚ MÓVIL (HAMBURGUESA) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // --- 2. CERRAR MENÚ MÓVIL AL HACER CLIC EN UN ENLACE ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 3. EFECTO DE APARICIÓN EN SCROLL (FADE-IN) ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });

    
    // --- 4. RESALTAR ENLACE ACTIVO EN EL MENÚ ---
    const currentPage = window.location.pathname.split('/').pop();
    const headerLinks = document.querySelectorAll('header .nav-links a');

    headerLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active-link');
        }
    });
    if (currentPage === '') {
        const homeLink = document.querySelector('header .nav-links a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active-link');
        }
    }


    // --- 5. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.querySelector('#contact-form');
    const statusDiv = document.querySelector('#form-status');
    const submitButton = document.querySelector('#form-submit-button');

    if (contactForm && statusDiv && submitButton) {
        
        const isValidEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nombre = document.querySelector('#nombre').value.trim();
            const correo = document.querySelector('#correo').value.trim();
            const mensaje = document.querySelector('#mensaje').value.trim();

            if (nombre === '' || correo === '' || mensaje === '') {
                statusDiv.innerHTML = '<p>Por favor, completa todos los campos.</p>';
                statusDiv.className = 'error';
                return;
            }
            if (!isValidEmail(correo)) {
                statusDiv.innerHTML = '<p>Por favor, ingresa un correo electrónico válido.</p>';
                statusDiv.className = 'error';
                return;
            }

            const form = e.target;
            const data = new FormData(form);

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            statusDiv.style.display = 'none';

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusDiv.innerHTML = `
                        <div class="success-animation">
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                        <p>¡Gracias por tu mensaje! Te responderemos a la brevedad.</p>
                    `;
                    statusDiv.className = 'success';
                    form.reset();
                } else {
                    statusDiv.innerHTML = '<p>Hubo un error al enviar el mensaje. Intenta de nuevo.</p>';
                    statusDiv.className = 'error';
                }

            } catch (error) {
                statusDiv.innerHTML = '<p>Hubo un error de red. Revisa tu conexión.</p>';
                statusDiv.className = 'error';
            }

            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensaje';
        });
    }

    
    // --- 6. LÓGICA DEL BUSCADOR (Header) ---
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query !== '') {
            window.location.href = `busqueda.html?q=${encodeURIComponent(query)}`;
        }
    };

    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }

    // --- 7. LÓGICA DE LA PÁGINA DE BÚSQUEDA (ACTUALIZADA) ---
    const resultsGrid = document.querySelector('#results-grid');
    const searchTitle = document.querySelector('#search-title');

    if (resultsGrid && searchTitle) {
        if (typeof searchData === 'undefined') {
            console.error('Error: search-data.js no se cargó.');
            searchTitle.textContent = 'Error de Búsqueda';
            resultsGrid.innerHTML = '<p>No se pudo cargar la base de datos de productos.</p>';
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');

        if (!query) {
            searchTitle.textContent = 'Búsqueda Inválida';
            resultsGrid.innerHTML = '<p>No se especificó un término de búsqueda.</p>';
            return;
        }

        searchTitle.textContent = `Resultados para: "${query}"`;
        
        const queryLower = query.toLowerCase();
        const resultados = searchData.filter(item => {
            const titulo = item.titulo.toLowerCase();
            const descripcion = item.descripcion.toLowerCase();
            return titulo.includes(queryLower) || descripcion.includes(queryLower);
        });

        if (resultados.length > 0) {
            resultsGrid.innerHTML = '';
            resultados.forEach(item => {
                const card = document.createElement('div');
                card.className = 'product-card';
                
                // Lógica para mostrar imagen o ícono
                let imageHtml = '';
                if (item.imagen === 'icon') {
                    imageHtml = `<i class="${item.icon_class}"></i>`;
                } else {
                    imageHtml = `<img src="${item.imagen}" alt="${item.alt}">`;
                }

                card.innerHTML = `
                    <div class="product-image">
                        ${imageHtml} 
                    </div>
                    <div class="product-info">
                        <h4>${item.titulo}</h4>
                        <p>${item.descripcion}</p>
                        <span class="price">${item.precio}</span>
                        <a href="${item.url}" class="cta-button product-button">Ver Página</a>
                    </div>
                `;
                resultsGrid.appendChild(card);
            });
        } else {
            resultsGrid.innerHTML = `<p style="text-align: center; grid-column: 1 / -1;">No se encontraron resultados para "${query}".</p>`;
        }
    }
});