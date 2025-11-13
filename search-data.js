/* Nuestra "Base de Datos" de todo el contenido del sitio.
*/
const searchData = [
    {
        tipo: 'Producto',
        titulo: 'Mega Pack Retro para PC',
        descripcion: 'Sistema independiente con +7700 juegos y 28 consolas. Compatible con joystick USB, arranca directo desde el pendrive. ✅',
        precio: '$1.200 UYU',
        url: 'productos.html',
        imagen: 'img/pack-retro.jpg',
        alt: 'Mega Pack Retro para PC con 7700 juegos'
    },
    {
        tipo: 'Producto',
        titulo: 'Pendrive PS2 para PC (128GB)',
        descripcion: 'Con juegos de PS2 a elección del cliente, configurado y optimizado para jugar desde PC con joystick USB. ✅',
        precio: '$1.500 UYU',
        url: 'productos.html',
        imagen: 'img/pendrive-ps2.jpg',
        alt: 'Pendrive PS2 para PC de 128GB con juegos a elección'
    },
    // ==== PRODUCTO NUEVO ====
    {
        tipo: 'Producto',
        titulo: 'Pendrive Retro Xbox 360 RGH',
        descripcion: 'Sistema de emuladores que arranca directo desde el pendrive en tu Xbox 360 RGH. ¡Juega a todo! ✅',
        // ¡ATENCIÓN! CAMBIA EL PRECIO AQUÍ
        precio: '$1.200', 
        url: 'productos.html',
        imagen: 'img/pendrive-xbox.jpg',
        alt: 'Pendrive retro para Xbox 360 RGH con emuladores'
    },
    // ==== FIN DEL PRODUCTO NUEVO ====
    {
        tipo: 'Servicio',
        titulo: 'Destrabe PS1 / PS2',
        descripcion: 'Desde la memory card del cliente.',
        precio: '$500',
        url: 'servicios.html',
        imagen: 'icon', 
        icon_class: 'fa-solid fa-gamepad'
    },
    {
        tipo: 'Servicio',
        titulo: 'Destrabe PS3 (HEN)',
        descripcion: 'Desbloqueo completo para PS3.',
        precio: '$1.500',
        url: 'servicios.html',
        imagen: 'icon', 
        icon_class: 'fa-solid fa-gamepad'
    },
    {
        tipo: 'Servicio',
        titulo: 'Destrabe Nintendo Wii',
        descripcion: 'Desbloqueo completo de Nintendo Wii.',
        precio: '$500',
        url: 'servicios.html',
        imagen: 'icon', 
        icon_class: 'fa-solid fa-gamepad'
    },
    {
        tipo: 'Servicio',
        titulo: 'Optimización completa de PC',
        descripcion: 'Formateo + diagnóstico. Incluye activación de Windows y Office, limpieza, drivers y antivirus. ✅',
        precio: '$800',
        url: 'servicios.html#pc',
        imagen: 'icon', 
        icon_class: 'fa-solid fa-laptop-code'
    },
    {
        tipo: 'Info',
        titulo: 'Sobre Nosotros - 8BitOnda',
        descripcion: 'Emprendimiento uruguayo nacido de la pasión por la cultura gamer y la tecnología retro.',
        precio: '',
        url: 'nosotros.html',
        imagen: 'icon', 
        icon_class: 'fa-solid fa-circle-info'
    }
];


