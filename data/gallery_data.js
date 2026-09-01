// gallery_data.js

// Questo è il database della tue foto.
// src: il nome dell'immagine (deve trovarsi nella stessa cartella)
// album: il nome dell'evento (utile per la barra di ricerca)
// didascalia: il testo che apparirà sotto la foto nel Lightbox

// DIZIONARIO DEI LINK ESTERNI
// Aggiungi qui il link a un'intera galleria Facebook o sito web.
// Il nome a sinistra DEVE essere uguale al nome dell'album nelle foto!
const ALBUM_LINKS = {
    "Trofeo Liberazione": {
        testo: "Guarda l'album completo su Facebook",
        url: "https://www.facebook.com/share/p/1EKz5JsFNg/"
    }
};

const FOTO_GALLERY = [
    {
        src: "../assets/run-smile.jpg",
        album: "Run and Smile - Beky Bay",
        didascalia: "La locandina ufficiale dell'evento!"
    },
    {
        src: "../assets/trofeo_liberazione.jpeg",
        album: "Trofeo Liberazione",
        didascalia: "Kevin all'arrivo!"
    },
    {
        src: "../assets/trofeo_liberazione (2).jpeg",
        album: "Trofeo Liberazione",
    },
    {
        src: "../assets/trofeo_liberazione (3).jpeg",
        album: "Trofeo Liberazione",
    },

];
