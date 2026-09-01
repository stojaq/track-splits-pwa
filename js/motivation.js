// motivation.js

const quotes = [
    {
        text: "La fatica non è mai sprecata. Soffri ma sogni.",
        author: "Pietro Mennea",
        context: "Leggenda Azzurra"
    },
    {
        text: "Non ho mai considerato la corsa come un sacrificio. È una gioia.",
        author: "Eliud Kipchoge",
        context: "Recordman Maratona"
    },
    {
        text: "Dare meno del tuo meglio significa sacrificare il dono.",
        author: "Steve Prefontaine",
        context: "Icona dell'Atletica"
    },
    {
        text: "Non puoi mettere un limite a nulla. Più sogni, più andrai lontano.",
        author: "Michael Phelps",
        context: "Campione Olimpico"
    },
    {
        text: "Oggi farò quello che gli altri non fanno, per poter fare domani quello che gli altri non possono fare.",
        author: "Jerry Rice",
        context: "Atleta"
    },
    {
        text: "La volontà di vincere non significa nulla senza la volontà di prepararsi.",
        author: "Juma Ikangaa",
        context: "Maratoneta"
    },
    {
        text: "Correre è la più grande metafora della vita, perché ci metti dentro quello che ne tiri fuori.",
        author: "Oprah Winfrey",
        context: "Media Mogul"
    },
    {
        text: "C'è la magia nella sofferenza. Pensa alla gara come a un dipinto che stai creando.",
        author: "Mo Farah",
        context: "Campione Olimpico"
    },
    {
        text: "In pista porto tutta me stessa, i miei sacrifici e il mio sorriso.",
        author: "Nadia Battocletti",
        context: "Campionessa Europea"
    },
    {
        text: "Quando le gambe bruciano, è la testa che ti porta al traguardo.",
        author: "Yeman Crippa",
        context: "Primato Italiano"
    },
    {
        text: "La corsa mi ha insegnato la disciplina. Non ci sono scorciatoie per arrivare in cima.",
        author: "Iliass Aouani",
        context: "Maratoneta Azzurro"
    },
    {
        text: "Senza il buio degli infortuni, non avrei mai assaporato la luce della vittoria.",
        author: "Gianmarco Tamberi",
        context: "Campione Olimpico"
    },
    {
        text: "Ho sognato questo momento tutta la vita. E i sogni si costruiscono in allenamento.",
        author: "Marcell Jacobs",
        context: "Campione Olimpico"
    },
    {
        text: "Non mi preoccupo della partenza, mi concentro sul traguardo.",
        author: "Usain Bolt",
        context: "Recordman Mondiale"
    },
    {
        text: "Se vuoi correre, corri un miglio. Se vuoi sperimentare una vita diversa, corri una maratona.",
        author: "Emil Zatopek",
        context: "Leggenda Olimpica"
    },
    {
        text: "Il momento in cui decidi di mollare è il momento in cui permetti a qualcun altro di vincere.",
        author: "Carl Lewis",
        context: "Icona dell'Atletica"
    },
    {
        text: "Ho corso ogni gara della mia vita come se fosse l'ultima.",
        author: "Hicham El Guerrouj",
        context: "Recordman 1500m"
    },
    {
        text: "Il dolore di oggi sarà la tua forza di domani.",
        author: "Sifan Hassan",
        context: "Campionessa Olimpica"
    },
    {
        text: "Non sono qui per partecipare, sono qui per battere i record.",
        author: "Jakob Ingebrigtsen",
        context: "Campione Olimpico"
    },
    {
        text: "L'unica barriera è quella che costruisci nella tua mente.",
        author: "Wayde van Niekerk",
        context: "Recordman 400m"
    },
    {
        text: "Quando mi dicono che non posso fare qualcosa, è lì che so che posso farcela.",
        author: "Florence Griffith-Joyner",
        context: "Recordman 100m"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteContext = document.getElementById('quoteContext');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const shareBtn = document.getElementById('shareBtn');

    let currentQuoteIndex = -1;

    const generateRandomQuote = () => {
        let newIndex;
        // Ensure we don't get the same quote twice in a row
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuoteIndex && quotes.length > 1);

        currentQuoteIndex = newIndex;
        return quotes[newIndex];
    };

    const displayQuote = () => {
        // Trigger fade out
        quoteContainer.classList.remove('quote-enter-active');
        
        setTimeout(() => {
            const quote = generateRandomQuote();
            
            quoteText.innerText = `"${quote.text}"`;
            quoteAuthor.innerText = quote.author;
            quoteContext.innerText = quote.context;
            
            // Trigger fade in
            quoteContainer.classList.add('quote-enter-active');
        }, 300); // Wait for transition to fade out
    };

    // Event Listeners
    newQuoteBtn.addEventListener('click', displayQuote);

    shareBtn.addEventListener('click', async () => {
        const quote = quotes[currentQuoteIndex];
        const shareText = `"${quote.text}" - ${quote.author}\n\nScopri di più su Track Splits!`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Motivazione Atletica',
                    text: shareText
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback for desktop/unsupported browsers
            navigator.clipboard.writeText(shareText).then(() => {
                const originalHTML = shareBtn.innerHTML;
                shareBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400"><path d="M20 6 9 17l-5-5"/></svg>`;
                setTimeout(() => {
                    shareBtn.innerHTML = originalHTML;
                }, 2000);
            });
        }
    });

    // Initial load
    displayQuote();
});
