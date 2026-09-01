// gallery.js

document.addEventListener('DOMContentLoaded', () => {
    

    // === Gallery Logic ===
    const galleryGrid = document.getElementById('galleryGrid');
    const searchInput = document.getElementById('searchInput');
    const albumFilters = document.getElementById('albumFilters');
    const albumLinkContainer = document.getElementById('albumLinkContainer');
    const albumLinkBtn = document.getElementById('albumLinkBtn');
    const albumLinkText = document.getElementById('albumLinkText');
    
    // Lightbox Elements
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxAlbum = document.getElementById('lightboxAlbum');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentImages = [];
    let currentIndex = 0;
    let activeAlbum = 'Tutti';

    const renderFilters = () => {
        if (!albumFilters || typeof FOTO_GALLERY === 'undefined') return;

        // Estrai album unici
        const uniqueAlbums = [...new Set(FOTO_GALLERY.map(foto => foto.album))];
        
        // Costruisci HTML Filtri
        let html = `
            <button class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeAlbum === 'Tutti' ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-dark-card dark:text-gray-300 dark:border dark:border-dark-border dark:hover:bg-gray-800'}" onclick="filterByAlbum('Tutti')">
                Tutte le foto
            </button>
        `;

        uniqueAlbums.forEach(album => {
            if (!album) return;
            const isActive = activeAlbum === album;
            html += `
                <button class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-dark-card dark:text-gray-300 dark:border dark:border-dark-border dark:hover:bg-gray-800'}" onclick="filterByAlbum('${album}')">
                    ${album}
                </button>
            `;
        });
        
        albumFilters.innerHTML = html;
    };

    window.filterByAlbum = (albumName) => {
        activeAlbum = albumName;
        renderFilters(); // Ri-renderizza per aggiornare i colori attivi
        
        // Gestione Bottone Link Esterno
        if (typeof ALBUM_LINKS !== 'undefined' && ALBUM_LINKS[albumName] && albumLinkContainer) {
            albumLinkBtn.href = ALBUM_LINKS[albumName].url;
            albumLinkText.innerText = ALBUM_LINKS[albumName].testo;
            albumLinkContainer.classList.remove('hidden');
        } else if (albumLinkContainer) {
            albumLinkContainer.classList.add('hidden');
        }
        
        if (albumName === 'Tutti') {
            renderGrid(FOTO_GALLERY);
        } else {
            const filtered = FOTO_GALLERY.filter(foto => foto.album === albumName);
            renderGrid(filtered);
        }
        
        // Pulisci ricerca se si usa un filtro
        if (searchInput) searchInput.value = '';
    };

    const renderGrid = (imagesToRender = FOTO_GALLERY) => {
        currentImages = imagesToRender; // Salva per la navigazione del lightbox
        
        if (typeof FOTO_GALLERY === 'undefined' || FOTO_GALLERY.length === 0) {
            galleryGrid.innerHTML = `
                <div class="col-span-2 md:col-span-3 text-center text-gray-500 py-10 w-full flex-grow">
                    <p>Nessuna foto presente nella galleria.</p>
                </div>
            `;
            return;
        }

        if (imagesToRender.length === 0) {
            galleryGrid.innerHTML = `
                <div class="col-span-2 md:col-span-3 text-center text-gray-500 py-10 w-full flex-grow">
                    <p>Nessuna foto trovata per questa ricerca.</p>
                </div>
            `;
            return;
        }

        let html = '';
        imagesToRender.forEach((foto, index) => {
            html += `
                <div class="masonry-item relative group cursor-pointer overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800" onclick="openLightbox(${index})">
                    <img src="${foto.src}" alt="${foto.album}" class="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-primary-400 mb-1">${foto.album || ''}</span>
                        <p class="text-white text-xs line-clamp-2">${foto.didascalia || ''}</p>
                    </div>
                </div>
            `;
        });
        galleryGrid.innerHTML = html;
    };

    // Ricerca
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            
            // Filtra in base al termine E in base all'album attivo
            const filtered = FOTO_GALLERY.filter(foto => {
                const searchString = ((foto.album || '') + ' ' + (foto.didascalia || '')).toLowerCase();
                const matchTerm = searchString.includes(term);
                const matchAlbum = activeAlbum === 'Tutti' || foto.album === activeAlbum;
                return matchTerm && matchAlbum;
            });
            renderGrid(filtered);
        });
    }

    // === Lightbox Logic ===
    window.openLightbox = (index) => {
        currentIndex = index;
        updateLightboxContent();
        
        lightboxOverlay.classList.remove('hidden');
        lightboxOverlay.classList.add('flex');
        setTimeout(() => {
            lightboxOverlay.classList.remove('opacity-0');
            document.body.style.overflow = 'hidden'; // Previeni scroll di sfondo
        }, 10);
    };

    const closeLightbox = () => {
        lightboxOverlay.classList.add('opacity-0');
        document.body.style.overflow = ''; 
        setTimeout(() => {
            lightboxOverlay.classList.add('hidden');
            lightboxOverlay.classList.remove('flex');
            lightboxImg.src = ''; // Clear image to avoid flash on next open
        }, 300);
    };

    const updateLightboxContent = () => {
        const foto = currentImages[currentIndex];
        if (!foto) return;

        // Piccola animazione di fade per il cambio immagine
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = foto.src;
            lightboxImg.alt = foto.album || 'Immagine Galleria';
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
            };
        }, 150);

        lightboxAlbum.innerText = foto.album || '';
        lightboxCaption.innerHTML = foto.didascalia || '';

        // Gestione visibilità frecce
        prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
        nextBtn.style.display = currentIndex < currentImages.length - 1 ? 'flex' : 'none';
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            updateLightboxContent();
        }
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent();
        }
    };

    // Event Listeners Lightbox
    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    
    // Chiudi lightbox se si clicca sullo sfondo scuro
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
    }

    // Supporto tastiera (Freccette ed Esc)
    document.addEventListener('keydown', (e) => {
        if (!lightboxOverlay.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });

    // Inizializza
    renderFilters();
    renderGrid();
});
