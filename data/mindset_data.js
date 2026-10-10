const mindsetQuestions = [
    {
        id: 1,
        text: "Manca un'ora alla gara più importante dell'anno. Come ti senti?",
        category: "Gestione Ansia",
        answers: [
            { text: "Completamente svuotato e teso, fatico a pensare lucidamente.", scores: { ansia: -2, focus: -1, resilienza: 0 } },
            { text: "Eccitato, non vedo l'ora di scendere in pista e spaccare tutto.", scores: { ansia: 1, focus: 0, resilienza: 1 } },
            { text: "Tranquillo e isolato, sto già ripassando i movimenti e la tattica.", scores: { ansia: 2, focus: 2, resilienza: 0 } }
        ]
    },
    {
        id: 2,
        text: "Hai appena fatto una falsa partenza, o il tuo primo salto è nullo. Cosa ti passa per la testa?",
        category: "Resilienza",
        answers: [
            { text: "Cavolo, oggi non è giornata. Sento già la pressione addosso.", scores: { ansia: -1, focus: -1, resilienza: -2 } },
            { text: "Mi arrabbio con me stesso e uso questa rabbia per spingere di più.", scores: { ansia: 0, focus: 0, resilienza: 1 } },
            { text: "Resetto immediatamente. È successo, ora penso solo al prossimo tentativo.", scores: { ansia: 1, focus: 2, resilienza: 2 } }
        ]
    },
    {
        id: 3,
        text: "Durante l'allenamento più duro della settimana, quando le gambe bruciano, a cosa pensi?",
        category: "Focus e Motivazione",
        answers: [
            { text: "Cerco di distrarmi pensando ad altro per non sentire la fatica.", scores: { ansia: 0, focus: -1, resilienza: -1 } },
            { text: "Penso al mio avversario diretto e a quanto voglio batterlo.", scores: { ansia: -1, focus: 1, resilienza: 1 } },
            { text: "Mi concentro esclusivamente sul respiro e sulla tecnica del movimento.", scores: { ansia: 1, focus: 2, resilienza: 1 } }
        ]
    },
    {
        id: 4,
        text: "Hai fatto un'ottima gara ma non hai fatto il personale. Qual è la tua reazione?",
        category: "Locus of Control",
        answers: [
            { text: "Sono frustrato. Guardo subito ai piccoli errori che ho fatto per correggerli.", scores: { ansia: -2, focus: 2, resilienza: 0 } },
            { text: "Sono felice del piazzamento, il tempo arriverà con le giuste condizioni.", scores: { ansia: 1, focus: 0, resilienza: 1 } },
            { text: "Probabilmente c'era troppo vento contro o la pista non era velocissima.", scores: { ansia: 0, focus: -1, resilienza: -1 } }
        ]
    },
    {
        id: 5,
        text: "Sei in camera di chiamata e vedi il tuo avversario più forte che ti fissa. Cosa fai?",
        category: "Gestione Pressione",
        answers: [
            { text: "Evito lo sguardo e cerco di non pensarci. Mi mette soggezione.", scores: { ansia: -2, focus: -1, resilienza: 0 } },
            { text: "Lo fisso a mia volta per fargli capire che non ho paura.", scores: { ansia: -1, focus: 0, resilienza: 1 } },
            { text: "Lo ignoro completamente. Sono nel mio mondo, concentrato su di me.", scores: { ansia: 2, focus: 2, resilienza: 1 } }
        ]
    },
    {
        id: 6,
        text: "Ti infortuni (stiramento) a un mese dalla gara clou. Come reagisci?",
        category: "Gestione Crisi",
        answers: [
            { text: "Mi dispero. Tutti i sacrifici dell'anno buttati via, la stagione è finita.", scores: { ansia: -2, focus: -1, resilienza: -2 } },
            { text: "Sono frustrato, ma riposo un paio di settimane e spero di recuperare miracolosamente.", scores: { ansia: 0, focus: 0, resilienza: 0 } },
            { text: "Pianifico subito con il coach e il fisio una riabilitazione aggressiva per salvare il salvabile.", scores: { ansia: 1, focus: 2, resilienza: 2 } }
        ]
    },
    {
        id: 7,
        text: "Staffetta 4x100. Sei l'ultimo frazionista e ti passano il testimone in netto svantaggio.",
        category: "Responsabilità",
        answers: [
            { text: "Sento il peso di dover fare un miracolo, ho paura di deludere il team.", scores: { ansia: -2, focus: -1, resilienza: 0 } },
            { text: "Una scossa di adrenalina, voglio recuperare a tutti i costi e spingo al 110%.", scores: { ansia: 0, focus: 0, resilienza: 1 } },
            { text: "Non guardo gli avversari. Corro la mia frazione al massimo pensando solo alla tecnica.", scores: { ansia: 2, focus: 2, resilienza: 1 } }
        ]
    },
    {
        id: 8,
        text: "La mattina della gara ti svegli e c'è un temporale fortissimo con vento contrario.",
        category: "Adattabilità",
        answers: [
            { text: "Che sfortuna, i miei allenamenti rovinati dal meteo. Fare il tempo sarà impossibile.", scores: { ansia: -2, focus: -1, resilienza: -1 } },
            { text: "Peccato, ma sarà così per tutti. L'importante è il piazzamento oggi.", scores: { ansia: 1, focus: 1, resilienza: 1 } },
            { text: "Ottimo, il meteo terribile spaventerà gli avversari più deboli mentalmente. È la mia occasione.", scores: { ansia: 2, focus: 2, resilienza: 2 } }
        ]
    },
    {
        id: 9,
        text: "Durante il riscaldamento in campo, vedi un avversario fare delle prove straordinarie.",
        category: "Distrazioni Estere",
        answers: [
            { text: "Inizio a dubitare della mia forma fisica e mi irrigidisco un po'.", scores: { ansia: -2, focus: -2, resilienza: 0 } },
            { text: "Mi gasa tantissimo vederlo in forma, la sfida sarà ancora più bella.", scores: { ansia: 0, focus: 0, resilienza: 1 } },
            { text: "Non lo guardo neanche. Resto concentrato esclusivamente sulle mie attivazioni.", scores: { ansia: 2, focus: 2, resilienza: 0 } }
        ]
    },
    {
        id: 10,
        text: "Come gestisci solitamente i giorni di 'scarico' prima della gara?",
        category: "Disciplina e Ansia",
        answers: [
            { text: "Fatico a stare fermo, finisco sempre per fare qualche allungo o peso in più per 'sentirmi sicuro'.", scores: { ansia: -2, focus: -1, resilienza: 0 } },
            { text: "Mi rilasso, guardo serie tv e cerco di staccare completamente la mente dall'atletica.", scores: { ansia: 1, focus: 0, resilienza: 1 } },
            { text: "Seguo la tabella alla lettera. Riposo attivo, stretching e molta visualizzazione della gara.", scores: { ansia: 2, focus: 2, resilienza: 1 } }
        ]
    },
    {
        id: 11,
        text: "In tutta onestà, qual è la VERA spinta interiore per cui fai atletica?",
        category: "Motivazione Profonda",
        answers: [
            { text: "Per vincere, emergere e dimostrare agli altri (e a me stesso) quanto valgo.", scores: { fiducia: 2, ansia: -1, focus: 1 } },
            { text: "Per superare i miei limiti: è una sfida costante per vedere fin dove posso arrivare.", scores: { focus: 2, resilienza: 1, fiducia: 1 } },
            { text: "Perché mi fa stare bene. È una valvola di sfogo essenziale per il mio equilibrio mentale.", scores: { ansia: 2, fiducia: 0, resilienza: 1 } }
        ]
    },
    {
        id: 12,
        text: "Il tuo allenatore ti muove una critica molto dura davanti ai tuoi compagni. Come reagisci?",
        category: "Gestione dell'Ego",
        answers: [
            { text: "Mi chiudo a riccio o rispondo male. Odio essere umiliato e perdo subito fiducia.", scores: { fiducia: -2, resilienza: -2, ansia: -1 } },
            { text: "Incasso il colpo in silenzio e annuisco, ma poi ci sto male per giorni interi.", scores: { ansia: -2, fiducia: -1, resilienza: -1 } },
            { text: "Lo prendo come un attacco personale costruttivo. Domani spingerò il doppio per fargli rimangiare tutto.", scores: { resilienza: 2, fiducia: 1, focus: 1 } }
        ]
    },
    {
        id: 13,
        text: "Quanto la tua felicità e umore quotidiano dipendono dai risultati in pista?",
        category: "Equilibrio e Ossessione",
        answers: [
            { text: "Tantissimo. Se un allenamento va male, mi sento un fallito e mi rovina l'intera giornata.", scores: { ansia: -2, fiducia: -2, focus: 1 } },
            { text: "Abbastanza. Ci tengo moltissimo, ma fuori dalla pista riesco (quasi sempre) a staccare la spina.", scores: { ansia: 1, focus: 1, fiducia: 1 } },
            { text: "Poco. L'atletica è solo una bellissima parte della mia vita, non mi definisce come persona.", scores: { ansia: 2, fiducia: 2, focus: -1 } }
        ]
    },
    {
        id: 14,
        text: "Hai appena vinto la gara della vita, stabilendo il tuo nuovo record. Il giorno dopo:",
        category: "Uiltà vs Ego",
        answers: [
            { text: "Faccio in modo che tutti lo sappiano (social, amici). Me la godo al 100%, sono il migliore.", scores: { fiducia: 2, focus: -1, resilienza: 0 } },
            { text: "Sono stra-felice, ma la mente sta già programmando quale sarà il prossimo record da battere.", scores: { focus: 2, fiducia: 1, resilienza: 1 } },
            { text: "Mi sento quasi in imbarazzo per tutti i complimenti ricevuti. Torno subito ad allenarmi a testa bassa.", scores: { fiducia: -1, ansia: 1, resilienza: 1 } }
        ]
    },
    {
        id: 15,
        text: "Se guardi nel profondo, qual è il tuo timore più grande legato a questo sport?",
        category: "Paure Inconsce",
        answers: [
            { text: "Scoprire di non avere abbastanza talento per farcela davvero, nonostante tutto il duro lavoro.", scores: { fiducia: -2, resilienza: -1, focus: -1 } },
            { text: "Deludere le persone che credono in me e fanno sacrifici per me (coach, genitori, squadra).", scores: { ansia: -2, focus: -1, fiducia: -1 } },
            { text: "Subire un infortunio grave che mi costringa a rinunciare per sempre a correre/saltare/lanciare.", scores: { ansia: -1, resilienza: 0, focus: 0 } }
        ]
    },
    {
        id: 16,
        text: "Quanto dipendi dalla tua routine pre-gara o dalle superstizioni (calzini fortunati, gesti scaramantici)?",
        category: "Controllo e Routine",
        answers: [
            { text: "Moltissimo. Se qualcosa scombussola i miei piani o i miei rituali, vado in panico e perdo sicurezza.", scores: { ansia: -2, fiducia: -1, focus: 0 } },
            { text: "Ho una mia routine che mi fa stare bene e concentrare, ma se c'è un imprevisto so adattarmi.", scores: { focus: 2, resilienza: 1, fiducia: 1 } },
            { text: "Zero totale. Non credo a queste cose, arrivo in pista, mi scaldo e faccio quello che devo fare.", scores: { fiducia: 2, ansia: 1, resilienza: 0 } }
        ]
    },
    {
        id: 17,
        text: "Guardando i risultati e i video degli allenamenti dei tuoi avversari sui social media, cosa provi?",
        category: "Confronto Esterno",
        answers: [
            { text: "Invidia e ansia. Mi sembrano sempre tutti più forti, più veloci o più in forma di me.", scores: { fiducia: -2, ansia: -2, focus: -1 } },
            { text: "Li uso come stimolo e materiale di studio per capire i loro punti deboli e migliorare i miei.", scores: { focus: 2, resilienza: 1, fiducia: 1 } },
            { text: "Li ignoro. Non mi interessa cosa fanno gli altri, sono concentrato solo ed esclusivamente sul mio percorso.", scores: { fiducia: 2, focus: 1, ansia: 1 } }
        ]
    },
    {
        id: 18,
        text: "I tuoi amici organizzano un'uscita importante la sera prima del tuo allenamento più duro della settimana. Cosa fai?",
        category: "Vita Sociale",
        answers: [
            { text: "Vado ed esagero anche se faccio tardi. In fondo, un allenamento non mi cambierà la vita.", scores: { focus: -2, resilienza: -1, fiducia: 1 } },
            { text: "Vado ma mi do un orario rigido e non bevo. Cerco un compromesso tra vita privata e sport.", scores: { focus: 1, ansia: 1, fiducia: 0 } },
            { text: "Non ci vado e stacco il telefono. La mia priorità assoluta è recuperare per spingere domani.", scores: { focus: 2, resilienza: 1, ansia: -1 } }
        ]
    },
    {
        id: 19,
        text: "Se per un motivo qualsiasi dovessi smettere con l'atletica per sempre da domani, chi saresti?",
        category: "Identità",
        answers: [
            { text: "Sarei perso. Mi crollerebbe il mondo addosso perché l'atletica è letteralmente tutta la mia vita.", scores: { ansia: -2, resilienza: -2, fiducia: -1 } },
            { text: "Un grande appassionato di sport. Sarei triste ma troverei in fretta un'altra sfida fisica da affrontare.", scores: { resilienza: 2, fiducia: 1, focus: 0 } },
            { text: "Sarei la stessa identica persona. Ho molti altri interessi e il mio valore non si misura in medaglie.", scores: { fiducia: 2, ansia: 2, focus: -1 } }
        ]
    },
    {
        id: 20,
        text: "In un test di resistenza, quando il corpo ti urla disperatamente di fermarti, come reagisci mentalmente?",
        category: "Tolleranza al Dolore",
        answers: [
            { text: "Mi spavento e cedo quasi subito. Ascolto i segnali del corpo perché ho troppa paura di stare male.", scores: { resilienza: -2, fiducia: -1, focus: -1 } },
            { text: "Inizio a contrattare con me stesso: 'Dai, ancora 100 metri poi mollo... no, ancora un po''.", scores: { resilienza: 1, focus: 1, fiducia: 0 } },
            { text: "Entro in uno stato agonistico totale. Il bruciore diventa la conferma che mi sto allenando bene.", scores: { resilienza: 2, focus: 2, fiducia: 2 } }
        ]
    }
];

const mindsetProfiles = {
    insicuro: {
        title: "L'Insicuro Talentuoso 🥀",
        description: "Sei un atleta che probabilmente vale molto di più di quello che pensa. Il tuo problema più grande è la mancanza di fiducia in te stesso: sei ipersensibile alle critiche, ti fai condizionare dalle aspettative altrui (paura di deludere) e lehi troppo il tuo valore personale al cronometro. Questo genera un'ansia che blocca il tuo vero potenziale in gara.",
        advice: [
            "Lavora sull'identità: ricordati che tu NON sei il tuo tempo sui 100m. Trova valore in te stesso anche fuori dalla pista.",
            "Diario dei Successi: scrivi ogni sera 3 cose positive che hai fatto in allenamento, per ricostruire la tua autostima passo dopo passo."
        ],
        condition: (scores) => scores.fiducia <= -3 && scores.ansia < 0
    },
    glaciale: {
        title: "Il Glaciale 🧊",
        description: "Sei un atleta con un'altissima gestione della pressione e un focus incredibile. Non ti fai scalfire da fattori esterni e rimani lucido anche nei momenti critici. Il tuo Locus of Control è interno: sai che dipende tutto da te. Hai un ottimo equilibrio tra sport e vita privata.",
        advice: [
            "Usa l'energia emotiva: prova a inserire un po' di sana 'cattiveria agonistica' visualizzando un momento di massima esaltazione pre-gara.",
            "Tecnica di ricarica: ascolta musica ritmata prima di entrare in pista per alzare i battiti e l'ego."
        ],
        condition: (scores) => scores.ansia >= 6 && scores.focus >= 8
    },
    esplosivo: {
        title: "L'Esplosivo 🌋",
        description: "Sei alimentato dalle emozioni, dall'agonismo puro e dall'Ego. Trovi le energie migliori quando c'è scontro diretto e competizione (per dimostrare chi sei). Hai un'alta resilienza reattiva. Il rovescio della medaglia è che questa altalena emotiva può portarti a sprecare troppe energie nervose, causandoti crolli psicologici se le cose vanno male.",
        advice: [
            "Raffreddamento pre-gara: usa la tecnica del Box Breathing (inspira 4s, trattieni 4s, espira 4s, trattieni 4s) per calmare il 'fuoco'.",
            "Focus sul processo: sposta la motivazione dal 'battere l'avversario e vincere' alla perfetta esecuzione tecnica del tuo gesto."
        ],
        condition: (scores) => scores.fiducia >= 3 && scores.ansia < 5
    },
    resiliente: {
        title: "Il Guerriero Silenzioso 🛡️",
        description: "La tua vera forza è non mollare mai e la tua motivazione è puramente intrinseca (sfidare i tuoi stessi limiti). Anche se sbagli, incassi il colpo e riparti. Hai una grande capacità di sopportare le critiche e la fatica fisica. Sei il pilastro silenzioso di ogni gruppo d'allenamento.",
        advice: [
            "Sii più spavaldo: a volte hai bisogno di 'credertela' un po' di più. Mostra il petto in fuori in camera di chiamata.",
            "Celebra i traguardi: impara a goderti le vittorie senza pensare immediatamente alla prossima sfida."
        ],
        condition: (scores) => scores.resilienza >= 8 && scores.focus >= 5
    },
    animale: {
        title: "L'Animale da Gara 🦁",
        description: "In allenamento spesso fatichi a trovare le motivazioni e magari ti lamenti, ma la domenica col pettorale addosso ti trasformi. Non pensi troppo alla tecnica, vai a puro istinto e aggressività agonistica. Sei l'incubo di chi si allena da professionista e poi viene battuto dal tuo talento grezzo.",
        advice: [
            "Disciplina in allenamento: prova a darti dei mini-obiettivi tecnici ogni giorno per rendere l'allenamento stimolante quanto la gara.",
            "Canalizza l'istinto: usa il tuo enorme agonismo senza però dimenticare il ritmo; partire troppo forte può essere letale."
        ],
        condition: (scores) => scores.focus <= 2 && scores.ansia >= 3
    },
    filosofo: {
        title: "Il Filosofo della Biomeccanica 🤓",
        description: "Conosci a memoria angoli di spinta, frequenza dei passi e fisiologia. Analizzi ogni tuo errore con precisione chirurgica. Questo è fantastico per l'allenamento, ma in gara il tuo cervello lavora troppo: l'iper-analisi ti blocca i riflessi e ti toglie la naturalezza del gesto.",
        advice: [
            "Spegni il cervello in gara: prima dello sparo ripeti a te stesso 'Il lavoro è stato fatto, ora devo solo spingere'.",
            "Meno dati, più sensazioni: fai qualche allenamento senza orologio/GPS basandoti solo sulla percezione dello sforzo."
        ],
        condition: (scores) => scores.focus >= 7 && scores.ansia < 3
    },
    perfezionista: {
        title: "Il Perfezionista Ansioso 🧠",
        description: "Sei analitico e punti sempre in alto. Tuttavia, la continua ricerca della perfezione, unita alla tua identificazione totale con lo sport, ti genera forte ansia da prestazione. Se qualcosa va storto (meteo, corsia) tendi a disorientarti o a colpevolizzarti pesantemente.",
        advice: [
            "Self-Talk positivo: sostituisci pensieri come 'Non devo sbagliare' con 'Spingerò forte a ogni passo'.",
            "Accetta l'imprevisto: in allenamento simula condizioni avverse (cambia blocchi, corri con vento) per allenare l'adattabilità."
        ],
        condition: (scores) => true
    }
};
