// news_data.js

// Questo è il "Database" delle tue notizie.
// Aggiungi un nuovo blocco { ... } in cima per aggiungere l'ultima notizia.

const ARTICOLI_NEWS = [
    {
        id: "sun-and-smile-beky-bay",
        titolo: "☀️ Sun and Smile al Beky Bay",
        data: "1 Settembre 2026",
        categoria: "Evento",
        riassunto: "Martedì 1 settembre vi aspettiamo al Beky Bay per l'evento Sun and Smile. Clicca per i dettagli e il ritrovo.",
        contenuto: `
        <!-- ECCO IL CODICE PER L'IMMAGINE 👇 -->
        <img src="../assets/run-smile.jpg" alt="Locandina Run and Smile" class="w-full rounded-xl mb-6 shadow-md">
        
        <h3>Dettagli dell'Evento</h3>
        <p>Ciao a tutti! Martedì 1 settembre vi aspettiamo al Beky Bay per l'evento Sun and Smile.</p>
        <ul>
            <li><b>Luogo:</b> Beky Bay – Via Alfonso Pinzon, 227, Bellaria-Igea Marina (RN).</li>
            <li><b>Data:</b> Martedì 1 Settembre 2026.</li>
            <li><b>Orario / Ritrovo:</b> Ore 19:00 (come da locandina).</li>
        </ul>
        <p>Nessun ritmo, nessuna competizione. L'unico scopo è sorridere!</p>
        `
    },
    {
        id: "corsa-podistica-sagra-tituccio",
        titolo: "🏃 Corsa Podistica Sagra del Tituccio – Memorial Rocco Crincoli",
        data: "5 Settembre 2026",
        categoria: "Evento",
        riassunto: "Sabato 5 settembre torna la corsa podistica non competitiva e la camminata tra i sentieri e le colline di Corpolò in occasione della Sagra del Tituccio.",
        contenuto: `
    <h3>Dettagli dell'Evento</h3>
    <p>In occasione della tradizionale <b>Sagra del Tituccio</b>, vi aspettiamo per una serata di sport, natura e convivialità con la podistica non competitiva <i>Memorial Rocco Crincoli</i> e la camminata panoramica <i>Titucciata</i>!</p>
    <ul>
        <li><b>Luogo di ritrovo:</b> Piazza dei Bizzocchi / Piazzetta del Tituccio, Corpolò (Rimini).</li>
        <li><b>Data:</b> Sabato 5 Settembre 2026.</li>
        <li><b>Ritrovo e Iscrizioni:</b> Dalle ore 17:30 alle 18:45.</li>
        <li><b>Partenza:</b> Ore 19:00.</li>
        <li><b>Percorso:</b> Circa 7 km su percorso misto (asfalto e sterrato) panoramico tra la Valmarecchia e la splendida cornice di Tenuta Amalia.</li>
        <li><b>Tipologia:</b> Camminata ludico-motoria e corsa non competitiva aperta a tutti (podisti, camminatori e famiglie).</li>
    </ul>

    <h3>Servizi e Terzo Tempo</h3>
    <p>Lungo il tracciato e all'arrivo saranno presenti punti di ristoro. A fine corsa vi aspettano il classico <b>Pasta Party</b>, le premiazioni delle società/gruppi più numerosi e stand gastronomici con musica dal vivo per tutta la serata!</p>
    `
    }, {
        id: "la-barroccia-sant-angelo-gatteo",
        titolo: "🏃 La Barroccia – Corsa Podistica a Sant'Angelo di Gatteo",
        data: "17 Settembre 2026",
        categoria: "Sport / Evento",
        riassunto: "Giovedì 17 settembre torna La Barroccia a Sant'Angelo di Gatteo: 5 km tra gara competitiva FIDAL e camminata ludico-motoria per aprire il Barrocci Festival.",
        contenuto: `
    <!-- ECCO IL CODICE PER L'IMMAGINE 👇 -->
    <img src="../assets/la-barroccia-gatteo.jpg" alt="Locandina La Barroccia Sant'Angelo di Gatteo" class="w-full rounded-xl mb-6 shadow-md">
    
    <h3>Dettagli dell'Evento</h3>
    <p>In occasione dell'apertura del <b>Barrocci Festival</b>, l'ASD Polisportiva Sidermec Vitali organizza la 4ª edizione de <b>La Barroccia</b>, corsa serale su strada nel cuore di Sant'Angelo di Gatteo.</p>
    <ul>
        <li><b>Luogo di ritrovo:</b> Piazzale Dossetti / Campo Sportivo (Via Dossetti, 1), Sant'Angelo di Gatteo (FC).</li>
        <li><b>Data:</b> Giovedì 17 Settembre 2026.</li>
        <li><b>Ritrovo:</b> Dalle ore 19:00.</li>
        <li><b>Partenza:</b> Ore 20:00.</li>
        <li><b>Percorso:</b> Circuito pianeggiante su asfalto di circa 5 km.</li>
        <li><b>Tipologia:</b> Gara podistica competitiva (valevole calendario FIDAL) e camminata/corsa non competitiva aperta a tutti.</li>
    </ul>

    <h3>Iscrizioni</h3>
    <p>Le iscrizioni online sono aperte ufficialmente. Puoi registrarti direttamente al seguente link:</p>
    <p>
        <a href="https://www.endu.net/it/events/barroccia/book" target="_blank" rel="noopener noreferrer" class="inline-block bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg border border-gray-300 shadow-sm transition">
            Iscriviti ora su ENDU
        </a>
    </p>

    <h3>Festa e Terzo Tempo</h3>
    <p>A fine corsa la serata prosegue all'interno del Barrocci Festival con l'apertura degli <b>stand gastronomici</b> con specialità romagnole e birra, accompagnati dal concerto dal vivo della <i>Revolution Live Band</i> a partire dalle ore 21:30.</p>
    `
    }, {
        id: "cds-assoluto-parma-2026-mezzofondo-self",
        titolo: "🏃‍♂️ Report CDS Assoluti Parma: Doppio PB per De Jesus, PB di Fontana nei 1500m",
        data: "18 Maggio 2026",
        categoria: "Report Gare",
        riassunto: "Analisi dettagliata del weekend di gare a Parma per i Campionati di Società su pista: riflettori puntati sulle prestazioni del mezzofondo della Self Montanari Gruzza con Kevin De Jesus, Alice Fontana, Giulia Gazzoni, Cristian Qorri e Federico Nicosia.",
        contenuto: `
    <!-- ECCO IL CODICE PER L'IMMAGINE 👇 -->
    <img src="../assets/cds-parma-2026.jpg" alt="Campionati di Società su Pista Parma 2026 - G.S. Self Atl. Montanari Gruzza" class="w-full rounded-xl mb-6 shadow-md">
    
    <h3>Resoconto Gare: Campionato di Società Assoluto su Pista (Fase Regionale)</h3>
    <p>In occasione della fase regionale dei <b>Campionati di Società Assoluti su Pista 2026</b>, svoltasi a Parma nel fine settimana del 16-17 maggio (World Athletics Global Calendar), gli atleti del <b>G.S. Self Atl. Montanari Gruzza</b> si sono distinti in gare ad altissima densità tecnica e agonistica. Di seguito l'approfondimento completo sulle prove individuali e i riscontri cronometrici dei mezzofondisti monitorati.</p>

    <h4>🔥 Kevin De Jesus: Straordinario doppio PB e punti d'oro</h4>
    <p>È stato l'indiscusso protagonista del settore mezzofondo maschile, firmando un autentico capolavoro su due distanze estremamente competitive:</p>
    <ul>
        <li><b>1500 metri:</b> Taglia il traguardo in <b>3:59.36</b> conquistando la <b>7ª posizione assoluta</b>. Con questa prestazione abbatte per la prima volta in carriera la prestigiosa barriera psicologica e tecnica dei 4 minuti, siglando il proprio nuovo <b>Primato Personale</b>.</li>
        <li><b>5000 metri:</b> Replica con una prova di grande autorità tattica e tenuta, fermando il cronometro a <b>14:56.21</b> (<b>5° posto assoluto</b>). Anche in questo caso si tratta di un netto <b>Primato Personale</b>, polverizzando il precedente limite di 15:13.86 e scendendo per la prima volta sotto i 15 minuti.</li>
    </ul>

    <h4>⚡ Federico Nicosia: Sfortuna e ritiro nei 1500m</h4>
    <p>Gara amara per <b>Federico Nicosia</b> (cat. Senior Maschile), la cui prova sui 1500 metri si è chiusa anticipatamente con un <b>DNF</b> (Did Not Finish). Un imprevisto fisico o un contatto nelle fasi più concitate della gara non gli hanno consentito di completare la distanza e validare il lavoro svolto in allenamento.</p>

    <h4>🎯 Cristian Qorri: Gara solida e conferma cronometrica</h4>
    <p>Impegnato nella numerosa pattuglia dei 1500m maschili (oltre 70 partecipanti), <b>Cristian Qorri</b> (cat. Promesse) ha chiuso la propria prova al <b>52° posto</b> con il tempo di <b>4:35.76</b>. Una prestazione consistente e regolare nel cuore del gruppo, che lo porta a un solo secondo dal proprio primato personale (4:34.64 stabilito ad aprile), confermando il salto di qualità rispetto alle passate stagioni giovanili.</p>

    <h4>🏃‍♀️ Settore Femminile: Fontana e Gazzoni coppia d'attacco nei 1500m</h4>
    <p>I 1500 metri femminili hanno regalato un entusiasmante derby casalingo tra le due portacolori della Self, capaci di collaborare e trainarsi a vicenda lungo tutti i tre giri e mezzo di pista:</p>
    <ul>
        <li><b>Alice Fontana:</b> Conclude in <b>13ª posizione</b> con il tempo di <b>5:09.34</b>, risultando la prima atleta della società al traguardo e migliorando di circa un secondo il proprio <b>Primato Personale</b> outdoor (precedente PB: 5:10.36).</li>
        <li><b>Giulia Gazzoni:</b> Ottima spalla a pochissimi metri dalla compagna, taglia il traguardo al <b>16° posto</b> in <b>5:11.82</b> (a soli +2.48 secondi da Fontana). Pur non ritoccando il proprio PB storico di 5:02.79, porta a termine una prova di grande sostanza e concentrazione a supporto del punteggio di squadra.</li>
    </ul>

    <h3>Riepilogo Risultati e Variazioni Tecniche</h3>
    <ul>
        <li><b>Kevin De Jesus (SM):</b> 1500m in 3:59.36 (7°) — <b>Nuovo PB</b> | 5000m in 14:56.21 (5°) — <b>Nuovo PB</b></li>
        <li><b>Alice Fontana (SF):</b> 1500m in 5:09.34 (13°) — <b>Nuovo PB</b></li>
        <li><b>Cristian Qorri (PM):</b> 1500m in 4:35.76 (52°) — <i>A ridosso del PB (4:34.64)</i></li>
        <li><b>Giulia Gazzoni (PF):</b> 1500m in 5:11.82 (16°) — <i>Gara di tenuta / Prova solida</i></li>
        <li><b>Federico Nicosia (SM):</b> 1500m — <i>DNF</i></li>
    </ul>
    <p>Un bilancio complessivo eccellente per il gruppo, impreziosito da ben tre nuovi primati personali e piazzamenti di rilievo regionale che garantiscono punti fondamentali nella classifica societaria.</p>

    <h3>Risultati Ufficiali</h3>
    <p>Tutti i risultati completi e i riscontri cronometrici ufficiali della manifestazione sono consultabili sul portale FIDAL:</p>
    <p>
        <a href="https://www.fidal.it/risultati/2026/REG43168/Risultati/RisRE105.html" target="_blank" rel="noopener noreferrer" class="inline-block bg-white hover:bg-gray-50 text-gray-900 font-semibold py-2 px-4 rounded-lg border border-gray-300 shadow-sm transition">
            Consulta i Risultati FIDAL
        </a>
    </p>
    `
    }
];

