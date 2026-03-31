document.addEventListener("DOMContentLoaded", () => {
    fetch('data/gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo data/gallery.json');
            }
            return response.json();
        })
        .then(data => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = ''; // Limpiar loader

            // Decap/Sveltia CMS lista iterativa
            const items = data.galeria || [];

            if(items.length > 0) {
                items.forEach(item => {
                    // Solo renderizar si hay una imagen
                    if (!item.imagen) return;

                    const el = document.createElement('article');
                    el.className = 'gallery-item';
                    
                    // Asegurar rutas correctas de imagen
                    const imagePath = item.imagen.startsWith('/') ? item.imagen.substring(1) : item.imagen;

                    el.innerHTML = `
                        <img src="${imagePath}" alt="${item.titulo || 'Obra del portafolio'}" loading="lazy">
                        <div class="overlay">
                            <h3>${item.titulo || 'Sin Título'}</h3>
                            <p>${item.descripcion || ''}</p>
                        </div>
                    `;
                    gallery.appendChild(el);
                });
            } else {
                gallery.innerHTML = '<p class="empty-msg">No hay obras en la galería aún. Entra al Panel de Control para añadir fotos.</p>';
            }
        })
        .catch(err => {
            console.warn(err);
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = `
                <div class="empty-msg" style="color: #d32f2f; background: #ffebee;">
                    <strong>Atención:</strong> ${err.message}.<br><br>
                    Para comenzar, inicia sesión en el <a href="admin/" style="color: #d32f2f;">Panel de Control</a>,
                    añade tu primera imagen y Sveltia CMS creará este archivo automáticamente por ti.
                </div>
            `;
        });
});
