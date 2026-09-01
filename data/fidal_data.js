// fidal_data.js
// Database dei coefficienti per il calcolo dei punteggi World Athletics / FIDAL.
// La formula generale è:
// - Corse (track): Punteggio = A * (B - Prestazione in secondi)^C
// - Salti/Lanci (field): Punteggio = A * (Prestazione in metri/cm - B)^C

const fidalData = {
    'M': {
        'Assoluti': {
            // Corse (Track) - Formule Quadratica Spiriev/CdS
            '60m': { type: 'quadratic_track', A: 48.0, B: -950.0, C: 4900.0, unit: 'sec' }, // Approssimazione 60m
            '100m': { type: 'quadratic_track', A: 28.0, B: -907.0, C: 7454.0, unit: 'sec' },
            '200m': { type: 'quadratic_track', A: 5.0, B: -358.0, C: 6358.0, unit: 'sec' },
            '400m': { type: 'quadratic_track', A: 1.04, B: -162.6, C: 6357.0, unit: 'sec' },
            '800m': { type: 'quadratic_track', A: 0.1, B: -47.7, C: 5055.0, unit: 'sec' },
            '1500m': { type: 'quadratic_track', A: 0.0355, B: -27.875, C: 5483.25, unit: 'sec' },
            '3000m': { type: 'quadratic_track', A: 0.005, B: -9.7167, C: 4551.0, unit: 'sec' },
            '5000m': { type: 'quadratic_track', A: 0.001667, B: -5.8, C: 4693.9, unit: 'sec' },
            '10000m': { type: 'quadratic_track', A: 0.000451, B: -3.09, C: 5017.2, unit: 'sec' },
            '110hs': { type: 'quadratic_track', A: 6.5, B: -365.5, C: 4876.0, unit: 'sec' },
            '400hs': { type: 'quadratic_track', A: 0.7083, B: -122.375, C: 5407.9, unit: 'sec' },
            '3000m Siepi': { type: 'quadratic_track', A: 0.00445, B: -9.238, C: 4623.9, unit: 'sec' },
            
            // Strada (Road)
            '10 km (Strada)': { type: 'track', A: 0.00114, B: 3600.0, C: 1.85, unit: 'sec' }, // Approx as 10000m
            'Mezza Maratona': { type: 'track', A: 0.0003, B: 7800.0, C: 1.85, unit: 'sec' }, // Approx
            'Maratona': { type: 'track', A: 0.000065, B: 16200.0, C: 1.85, unit: 'sec' }, // Approx
            '20 km Marcia': { type: 'track', A: 0.00032, B: 7800.0, C: 1.85, unit: 'sec' }, // Approx
            
            // Salti (Jumps)
            'Salto in Alto': { type: 'quadratic_field', A: 0.01, B: 5.3, C: -610, unit: 'cm' },
            'Salto con l\'Asta': { type: 'quadratic_field', A: 0.0002, B: 2.55, C: -318, unit: 'cm' },
            'Salto in Lungo': { type: 'quadratic_field', A: 0.0002, B: 1.87, C: -476, unit: 'cm' },
            'Salto Triplo': { type: 'quadratic_field', A: 0.00005, B: 0.895, C: -502, unit: 'cm' },
            
            // Lanci (Throws)
            'Getto del Peso': { type: 'quadratic_field', A: -0.25, B: 69.0, C: -154, unit: 'm' },
            'Lancio del Disco': { type: 'quadratic_field', A: -0.01, B: 19.7, C: -82, unit: 'm' },
            'Lancio del Martello': { type: 'quadratic_field', A: -0.01, B: 16.8, C: -82, unit: 'm' },
            'Lancio del Giavellotto': { type: 'quadratic_field', A: 0.0, B: 14.2, C: -30, unit: 'm' }
        }
    },
    'F': {
        'Assoluti': {
            // Corse (Track) - Formule Quadratica Spiriev/CdS
            '60m': { type: 'quadratic_track', A: 16.667, B: -575.0, C: 4413.5, unit: 'sec' },
            '100m': { type: 'quadratic_track', A: 10.0, B: -463.0, C: 5060.0, unit: 'sec' },
            '200m': { type: 'quadratic_track', A: 2.0, B: -206.0, C: 4780.0, unit: 'sec' },
            '400m': { type: 'quadratic_track', A: 0.2583, B: -63.525, C: 3725.5, unit: 'sec' },
            '800m': { type: 'quadratic_track', A: 0.0467, B: -27.57, C: 3781.0, unit: 'sec' },
            '1500m': { type: 'quadratic_track', A: 0.00667, B: -10.767, C: 3387.8, unit: 'sec' },
            '3000m': { type: 'quadratic_track', A: 0.0016, B: -5.12, C: 3365.0, unit: 'sec' },
            '5000m': { type: 'quadratic_track', A: 0.000741, B: -4.011, C: 4138.8, unit: 'sec' },
            '10000m': { type: 'quadratic_track', A: 0.000092, B: -1.37, C: 3392.0, unit: 'sec' },
            '100hs': { type: 'quadratic_track', A: 2.667, B: -214.0, C: 3470.3, unit: 'sec' },
            '400hs': { type: 'quadratic_track', A: 0.133, B: -51.36, C: 3572.5, unit: 'sec' },
            '3000m Siepi': { type: 'quadratic_track', A: 0.000555, B: -3.616, C: 2985.8, unit: 'sec' },
            
            // Strada (Road)
            '10 km (Strada)': { type: 'track', A: 0.00142, B: 4200.0, C: 1.88, unit: 'sec' }, // Approx
            'Mezza Maratona': { type: 'track', A: 0.00035, B: 9000.0, C: 1.88, unit: 'sec' }, // Approx
            'Maratona': { type: 'track', A: 0.000075, B: 19200.0, C: 1.88, unit: 'sec' }, // Approx
            '20 km Marcia': { type: 'track', A: 0.00038, B: 9000.0, C: 1.88, unit: 'sec' }, // Approx
            
            // Salti (Jumps)
            'Salto in Alto': { type: 'quadratic_field', A: 0.01, B: 6.3, C: -412, unit: 'cm' },
            'Salto con l\'Asta': { type: 'quadratic_field', A: 0.0, B: 2.94, C: -209, unit: 'cm' },
            'Salto in Lungo': { type: 'quadratic_field', A: 0.0, B: 2.18, C: -315, unit: 'cm' },
            'Salto Triplo': { type: 'quadratic_field', A: -0.00005, B: 1.165, C: -435, unit: 'cm' },
            
            // Lanci (Throws)
            'Getto del Peso': { type: 'quadratic_field', A: -0.125, B: 66.5, C: -70.375, unit: 'm' },
            'Lancio del Disco': { type: 'quadratic_field', A: -0.015, B: 20.45, C: -93, unit: 'm' },
            'Lancio del Martello': { type: 'quadratic_field', A: -0.01, B: 17.0, C: -58, unit: 'm' },
            'Lancio del Giavellotto': { type: 'quadratic_field', A: 0.0, B: 18.5, C: -41, unit: 'm' }
        }
    }
};

// Funzione di utilità per estrarre categorie e gare
const getCategories = (gender) => {
    return Object.keys(fidalData[gender] || {});
};

const getEvents = (gender, category) => {
    if (fidalData[gender] && fidalData[gender][category]) {
        return Object.keys(fidalData[gender][category]);
    }
    return [];
};

const getEventData = (gender, category, eventName) => {
    if (fidalData[gender] && fidalData[gender][category] && fidalData[gender][category][eventName]) {
        return fidalData[gender][category][eventName];
    }
    return null;
};
