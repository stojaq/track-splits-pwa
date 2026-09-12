const curiositiesData = [
    // --- RECORD (5) ---
    { id: 1, category: "Record", title: "Il record più longevo", content: "Il record mondiale più antico è di Jarmila Kratochvílová negli 800m (1'53\"28), stabilito nel 1983.", icon: "⏱️", color: "from-red-500 to-rose-600" },
    { id: 2, category: "Record", title: "Oltre gli 8 metri", content: "Jesse Owens nel 1935 fu il primo uomo a superare gli 8 metri (8.13m) nel salto in lungo. Il record durò 25 anni.", icon: "📏", color: "from-indigo-500 to-violet-600" },
    { id: 3, category: "Record", title: "100 metri in 9.58", content: "Usain Bolt detiene il record mondiale sui 100m maschili dal 2009. Nessuno si è più avvicinato a quel tempo.", icon: "⚡", color: "from-blue-500 to-cyan-600" },
    { id: 4, category: "Record", title: "Il muro delle 2 ore", content: "Eliud Kipchoge ha corso una maratona in 1h59'40\" nel 2019, anche se non omologabile come record ufficiale per le condizioni speciali.", icon: "🏃", color: "from-green-500 to-emerald-600" },
    { id: 5, category: "Record", title: "Lancio oltre i 100m", content: "Uwe Hohn lanciò il giavellotto a 104,80m nel 1984. Il record portò al cambio di baricentro dell'attrezzo.", icon: "🎯", color: "from-teal-500 to-teal-700" },

    // --- STORIA (5) ---
    { id: 6, category: "Storia", title: "La maratona originale", content: "La distanza di 42,195 km fu fissata a Londra 1908 per far terminare la gara davanti al palco della Regina.", icon: "👑", color: "from-amber-500 to-yellow-600" },
    { id: 7, category: "Storia", title: "I pesi nell'Antica Grecia", content: "Nel salto in lungo gli atleti usavano gli 'Halteres', pesi di pietra slanciati in avanti per aumentare la spinta.", icon: "🏛️", color: "from-stone-500 to-stone-700" },
    { id: 8, category: "Storia", title: "Donne escluse", content: "Fino al 1928 alle donne non era permesso partecipare alle gare di atletica leggera alle Olimpiadi.", icon: "♀️", color: "from-pink-500 to-rose-500" },
    { id: 9, category: "Storia", title: "La pista in cenere", content: "Fino agli anni '60 le piste erano in terra rossa o cenere, che con la pioggia si trasformavano in vero e proprio fango.", icon: "🏟️", color: "from-orange-600 to-red-700" },
    { id: 10, category: "Storia", title: "La partenza in piedi", content: "All'inizio del '900 i velocisti partivano in piedi. Thomas Burke, nel 1896, introdusse l'uso di scavare buche per i piedi.", icon: "👟", color: "from-gray-500 to-gray-700" },

    // --- FISIOLOGIA (5) ---
    { id: 11, category: "Fisiologia", title: "Velocità massima", content: "Usain Bolt ha raggiunto una velocità di 44,72 km/h tra i 60 e gli 80 metri durante il suo record mondiale.", icon: "⚡", color: "from-cyan-500 to-blue-500" },
    { id: 12, category: "Fisiologia", title: "Cuore d'atleta", content: "I maratoneti d'élite hanno un cuore così allenato che a riposo può battere anche a soli 30-35 battiti al minuto.", icon: "❤️", color: "from-red-500 to-rose-600" },
    { id: 13, category: "Fisiologia", title: "Fibre bianche e rosse", content: "I velocisti hanno muscoli ricchi di fibre bianche (potenza esplosiva), i fondisti di fibre rosse (resistenza).", icon: "💪", color: "from-rose-500 to-pink-700" },
    { id: 14, category: "Fisiologia", title: "VO2 Max", content: "I mezzofondisti hanno i valori di massimo consumo di ossigeno (VO2 Max) tra i più alti di tutti gli sport, superati solo dai fondisti di sci.", icon: "🫁", color: "from-sky-400 to-blue-500" },
    { id: 15, category: "Fisiologia", title: "Dispersione termica", content: "In una maratona corsa al caldo, il corpo disperde così tanto sudore che l'atleta può perdere fino al 5% del peso corporeo.", icon: "💧", color: "from-blue-300 to-blue-600" },

    // --- STRANEZZE (5) ---
    { id: 16, category: "Stranezze", title: "Salto in alto da fermo", content: "Fino al 1912 esistevano gare di salti (alto, lungo, triplo) da fermo, senza rincorsa. Ray Ewry vinse 8 ori olimpici.", icon: "🦘", color: "from-purple-500 to-fuchsia-600" },
    { id: 17, category: "Stranezze", title: "Retrocorsa", content: "Christian Grollé ha stabilito il record dei 100m corsi all'indietro in 13.6 secondi.", icon: "🔄", color: "from-teal-500 to-cyan-600" },
    { id: 18, category: "Stranezze", title: "Gara contro i cavalli", content: "Jesse Owens, per guadagnare da vivere dopo Berlino '36, si esibiva correndo e battendo cavalli da corsa sui 100 metri.", icon: "🐎", color: "from-amber-600 to-orange-700" },
    { id: 19, category: "Stranezze", title: "Joggling", content: "Esiste il record mondiale di maratona corsa facendo il giocoliere con tre palline: 2h50'12\" di Michal Kapral.", icon: "🤹", color: "from-indigo-400 to-purple-500" },
    { id: 20, category: "Stranezze", title: "Corsa all'indietro in salita", content: "Alcuni ultramaratoneti affrontano le pendenze montane più ripide correndo all'indietro per non affaticare i quadricipiti.", icon: "⛰️", color: "from-lime-600 to-green-700" },

    // --- OLIMPIADI E ANEDDOTI (5) ---
    { id: 21, category: "Olimpiadi", title: "Scalzo verso l'oro", content: "Abebe Bikila vinse la maratona a Roma 1960 correndo a piedi scalzi, divenendo il primo africano oro olimpico.", icon: "🦶", color: "from-green-500 to-emerald-600" },
    { id: 22, category: "Olimpiadi", title: "Maratona con veleno", content: "A St. Louis 1904, Thomas Hicks vinse la maratona sostenuto con brandy e stricnina, un potente veleno per topi usato come stimolante.", icon: "🐀", color: "from-yellow-500 to-orange-500" },
    { id: 23, category: "Olimpiadi", title: "Il pugno chiuso", content: "A Città del Messico 1968, Tommie Smith e John Carlos alzarono il pugno guantato di nero per i diritti civili sul podio dei 200m.", icon: "✊🏿", color: "from-gray-800 to-black" },
    { id: 24, category: "Olimpiadi", title: "Corsa con i pantaloni lunghi", content: "I primi maratoneti alle olimpiadi del 1896 correvano con pesanti pantaloni di lana e scarpe di cuoio chiodate.", icon: "👖", color: "from-slate-500 to-slate-700" },
    { id: 25, category: "Olimpiadi", title: "Vittoria in auto", content: "Sempre a St. Louis 1904, Fred Lorz tagliò il traguardo per primo dopo essersi fatto dare un passaggio in auto per 15 km.", icon: "🚗", color: "from-red-500 to-red-700" },

    // --- RECORD ITALIANI (5) ---
    { id: 26, category: "Record Italiani", title: "L'argento di Nadia", content: "Nadia Battocletti ha vinto l'argento sui 10.000m a Parigi 2024 con record nazionale di 30'43\"35.", icon: "🥈", color: "from-pink-500 to-rose-600" },
    { id: 27, category: "Record Italiani", title: "Iliass Aouani", content: "Nel 2023 Iliass Aouani ha stabilito a Barcellona il record italiano di maratona in 2h07'16\", poi battuto da Yeman Crippa.", icon: "🏃‍♂️", color: "from-blue-500 to-indigo-600" },
    { id: 28, category: "Record Italiani", title: "9.80 di Jacobs", content: "Marcell Jacobs ha vinto l'oro olimpico a Tokyo 2020 con 9.80, stabilendo il record europeo sui 100m.", icon: "🥇", color: "from-yellow-400 to-amber-600" },
    { id: 29, category: "Record Italiani", title: "Il volo di Tamberi", content: "Gianmarco Tamberi detiene il record italiano di salto in alto con 2.39m, misura superata a Monaco nel 2016.", icon: "✈️", color: "from-sky-400 to-blue-500" },
    { id: 30, category: "Record Italiani", title: "Pietro Mennea", content: "Il 19.72 sui 200m di Mennea (1979) è rimasto record del mondo per 17 anni ed è tuttora record europeo.", icon: "🇮🇹", color: "from-green-600 to-green-800" },

    // --- RECORD IMBATTIBILI (5) ---
    { id: 31, category: "Record Imbattibili", title: "Il record fantasma", content: "Il 10.49 di Flo-Jo del 1988 sui 100m resiste tuttora; molti credono che il misuratore del vento fosse rotto.", icon: "🌪️", color: "from-purple-500 to-fuchsia-600" },
    { id: 32, category: "Record Imbattibili", title: "47.60 della Koch", content: "Il record dei 400m femminili di Marita Koch (47.60, 1985) è adombrato dal doping di stato della DDR.", icon: "💊", color: "from-red-600 to-red-800" },
    { id: 33, category: "Record Imbattibili", title: "Javier Sotomayor", content: "Il salto in alto a 2.45m di Sotomayor (1993) resiste da oltre 30 anni e sembra un muro invalicabile.", icon: "🧱", color: "from-slate-600 to-slate-800" },
    { id: 34, category: "Record Imbattibili", title: "Il paradosso del lungo", content: "Il record di Powell (8.95m, 1991) dura da più tempo di quanto sia durato quello di Bob Beamon (8.90m, 1968).", icon: "📊", color: "from-violet-500 to-purple-700" },
    { id: 35, category: "Record Imbattibili", title: "Il disco di Schult", content: "Jurgen Schult detiene il record del lancio del disco (74.08m) dal 1986. È stato superato solo ad aprile 2024.", icon: "🥏", color: "from-emerald-500 to-emerald-700" },

    // --- BIOMECCANICA E FISICA (5) ---
    { id: 36, category: "Biomeccanica", title: "Il volo del velocista", content: "I velocisti d'élite trascorrono quasi il 60% del tempo di corsa in aria, completamente staccati dal suolo.", icon: "🛫", color: "from-cyan-500 to-blue-500" },
    { id: 37, category: "Biomeccanica", title: "Rimbalzo elastico", content: "Il tendine d'Achille funge da vera e propria molla che accumula e restituisce energia a ogni passo.", icon: "🦿", color: "from-teal-400 to-emerald-500" },
    { id: 38, category: "Biomeccanica", title: "Tempi di contatto", content: "Un velocista top ha un tempo di contatto col suolo per ogni passo di appena 80-90 millisecondi.", icon: "⚡", color: "from-yellow-400 to-orange-500" },
    { id: 39, category: "Biomeccanica", title: "L'uso delle braccia", content: "Le braccia non spingono, ma bilanciano le torsioni del busto generate dal movimento delle gambe, stabilizzando il corpo.", icon: "⚖️", color: "from-gray-500 to-gray-700" },
    { id: 40, category: "Biomeccanica", title: "Frequenza vs Ampiezza", content: "La velocità si ottiene aumentando frequenza e ampiezza del passo. Bolt faceva 41 passi nei 100m, contro i 45-46 della media.", icon: "📏", color: "from-indigo-400 to-indigo-600" },

    // --- FALSI MITI (5) ---
    { id: 41, category: "Falsi Miti", title: "L'acido lattico innocente", content: "I dolori del giorno dopo (DOMS) non sono causati dall'acido lattico, che viene smaltito in mezz'ora, ma da micro-lesioni muscolari.", icon: "🧬", color: "from-green-500 to-teal-500" },
    { id: 42, category: "Falsi Miti", title: "Correre rovina le ginocchia", content: "Falso: studi dimostrano che i corridori amatoriali hanno meno incidenza di artrosi rispetto ai sedentari.", icon: "🦴", color: "from-rose-400 to-red-500" },
    { id: 43, category: "Falsi Miti", title: "Sudare fa dimagrire", content: "Il sudore è solo perdita di liquidi per abbassare la temperatura, non è perdita di grasso. Ci si reidrata subito dopo.", icon: "💦", color: "from-blue-300 to-cyan-500" },
    { id: 44, category: "Falsi Miti", title: "Stretching statico pre-gara", content: "Lo stretching statico tenuto a lungo prima di una gara peggiora la prestazione, togliendo reattività elastica ai muscoli.", icon: "🙅", color: "from-slate-500 to-gray-700" },
    { id: 45, category: "Falsi Miti", title: "Correre sui talloni", content: "Atterrare pesantemente sul tallone frena l'inerzia e sovraccarica le articolazioni. È meglio l'appoggio di mesopiede.", icon: "👟", color: "from-orange-400 to-orange-600" },

    // --- MATERIALI E SUPERFICI (5) ---
    { id: 46, category: "Materiali", title: "La molla nelle scarpe", content: "Le super-shoes contengono una piastra in fibra di carbonio che restituisce fino all'85% dell'energia spesa.", icon: "👟", color: "from-rose-500 to-red-500" },
    { id: 47, category: "Superfici", title: "Addio cenere, c'è il Tartan", content: "A Messico 1968 fu introdotto il poliuretano (Tartan) che garantiva grip perfetto anche col bagnato.", icon: "🏟️", color: "from-orange-600 to-red-700" },
    { id: 48, category: "Materiali", title: "Scarpe chiodate", content: "Le scarpe da sprint moderne pesano meno di 150 grammi, con piastre rigide per ottimizzare la trasmissione della forza.", icon: "🪶", color: "from-teal-300 to-teal-500" },
    { id: 49, category: "Materiali", title: "Abbigliamento aerodinamico", content: "I velocisti usano tute aderentissime testate in galleria del vento, per risparmiare preziosi centesimi.", icon: "🌬️", color: "from-sky-400 to-sky-600" },
    { id: 50, category: "Materiali", title: "Sensori smart", content: "Oggi si usano sensori nelle solette per misurare tempi di volo, cadenza e asimmetrie di spinta in tempo reale.", icon: "📱", color: "from-slate-600 to-gray-800" },

    // --- LIMITI FISIOLOGICI E ALTITUDINE (5) ---
    { id: 51, category: "Limiti Fisiologici", title: "48 ore di corsa", content: "Camille Herron ha percorso 435 km correndo su pista in 48 ore di fila senza mai dormire.", icon: "🔋", color: "from-indigo-500 to-purple-500" },
    { id: 52, category: "Altitudine", title: "Aria rarefatta a Messico '68", content: "A 2240m d'altitudine, la minore resistenza dell'aria permise record mostruosi nei salti e sprint, ma affossò i fondisti.", icon: "⛰️", color: "from-sky-500 to-blue-600" },
    { id: 53, category: "Limiti Fisiologici", title: "Sofferenza lattacida", content: "I 400m e gli 800m sono considerate le gare più massacranti perché portano l'accumulo di scorie metaboliche al limite.", icon: "🥵", color: "from-red-500 to-orange-600" },
    { id: 54, category: "Limiti Fisiologici", title: "Termoregolazione", content: "In condizioni di caldo e umidità estremi, il corpo non riesce a evaporare il sudore andando in ipertermia.", icon: "🌡️", color: "from-orange-500 to-yellow-600" },
    { id: 55, category: "Limiti Fisiologici", title: "Il limite di velocità", content: "Secondo gli studi, i tendini umani si spezzerebbero se cercassimo di superare la velocità di 50 km/h nella corsa.", icon: "🚧", color: "from-red-600 to-rose-700" },

    // --- ERRORI E SQUALIFICHE (5) ---
    { id: 56, category: "Errori e Squalifiche", title: "La falsa partenza di Bolt", content: "Ai mondiali del 2011 Bolt fu squalificato per falsa partenza nella finale dei 100m. La regola non perdona nessuno.", icon: "❌", color: "from-red-600 to-rose-700" },
    { id: 57, category: "Errori e Squalifiche", title: "Fuori corsia", content: "Basta appoggiare il piede anche solo mezza volta sulla linea interna curva per essere squalificati nei 200/400m.", icon: "🛤️", color: "from-gray-500 to-gray-700" },
    { id: 58, category: "Errori e Squalifiche", title: "Testimone a terra", content: "Se il testimone cade, può essere raccolto, ma non deve intralciare le altre corsie e va passato nell'area designata.", icon: "🏏", color: "from-yellow-600 to-amber-700" },
    { id: 59, category: "Errori e Squalifiche", title: "Ostruzionismo", content: "Tagliare la strada improvvisamente causando la caduta di un avversario porta alla squalifica.", icon: "🚧", color: "from-orange-500 to-red-500" },
    { id: 60, category: "Errori e Squalifiche", title: "Salti nulli continui", content: "Fare 3 salti nulli consecutivi comporta l'eliminazione diretta, ed è l'incubo di ogni lunghista e triplista.", icon: "🛑", color: "from-red-700 to-red-900" },

    // --- RIVALITÀ E STORIE (5) ---
    { id: 61, category: "Rivalità", title: "Coe vs Ovett", content: "Negli anni '80 i britannici Coe e Ovett si rubavano il record ripetutamente, odiandosi a tal punto da non parlarsi.", icon: "⚔️", color: "from-slate-600 to-slate-800" },
    { id: 62, category: "Rivalità", title: "Lewis vs Johnson", content: "A Seul 1988, Ben Johnson distrusse Lewis, ma fu trovato positivo al doping in una delle gare più sporche della storia.", icon: "💉", color: "from-green-600 to-teal-700" },
    { id: 63, category: "Rivalità", title: "Gatlin vs Bolt", content: "Justin Gatlin, l'antagonista oscuro e squalificato per doping, sfidò ripetutamente l'eroe pulito Bolt.", icon: "⚡", color: "from-gray-700 to-gray-900" },
    { id: 64, category: "Rivalità", title: "Ingebrigtsen vs Kerr", content: "Una recente rivalità nei 1500m dove frecciatine e provocazioni pubbliche sono diventate la norma.", icon: "🗣️", color: "from-blue-600 to-indigo-700" },
    { id: 65, category: "Rivalità", title: "El Guerrouj vs Lagat", content: "Memorabili sfide negli anni 2000 per dominare i 1500m mondiali, sfociate in epici finali ad Atene 2004.", icon: "🏃", color: "from-amber-600 to-orange-600" },

    // --- NUTRIZIONE (5) ---
    { id: 66, category: "Nutrizione", title: "I McNuggets d'oro", content: "Usain Bolt ha mangiato circa 100 Chicken McNuggets al giorno alle Olimpiadi di Pechino 2008 vincendo tre ori.", icon: "🍗", color: "from-amber-400 to-yellow-600" },
    { id: 67, category: "Nutrizione", title: "Ricarica dei carboidrati", content: "I maratoneti svuotano le scorte di glicogeno muscolare e poi fanno un carico estremo nei 3 giorni pre-gara.", icon: "🍝", color: "from-yellow-200 to-yellow-500" },
    { id: 68, category: "Nutrizione", title: "Caffeina", content: "La caffeina è uno dei pochi integratori che migliora le prestazioni del 3%, abbassando la percezione della fatica.", icon: "☕", color: "from-amber-800 to-stone-800" },
    { id: 69, category: "Nutrizione", title: "Gel energetici", content: "Durante le maratone si assumono fino a 100g di carboidrati in gel all'ora per non sbattere contro il 'muro'.", icon: "🍯", color: "from-orange-400 to-rose-500" },
    { id: 70, category: "Nutrizione", title: "Succo di barbabietola", content: "Molti atleti di resistenza bevono succo di barbabietola pre-gara, che essendo ricco di nitrati funge da vasodilatatore.", icon: "🍷", color: "from-pink-700 to-purple-800" },

    // --- REGOLAMENTI E TATTICA (5) ---
    { id: 71, category: "Regolamenti", title: "Stacco a un piede", content: "Nel salto in alto non si può staccare a due piedi (stile salto mortale), altrimenti è considerato salto nullo.", icon: "📜", color: "from-gray-500 to-gray-700" },
    { id: 72, category: "Regolamenti", title: "Niente cuffiette", content: "L'uso di auricolari in gara è vietato: la musica altera il ritmo ed è considerata doping psicologico.", icon: "🎧", color: "from-zinc-500 to-zinc-700" },
    { id: 73, category: "Tattica", title: "Il succhiaruote", content: "Il drafting (stare in scia) riduce il costo energetico del movimento fino all'8% proteggendo dall'attrito dell'aria.", icon: "💨", color: "from-teal-400 to-emerald-500" },
    { id: 74, category: "Tattica", title: "Le lepri (Pacers)", content: "Nelle gare lunghe si pagano atleti (le lepri) solo per tirare il gruppo a ritmi folli e poi ritirarsi.", icon: "🐇", color: "from-lime-500 to-green-600" },
    { id: 75, category: "Regolamenti", title: "Spessore della suola", content: "World Athletics ha fissato un limite di 40mm per lo spessore dell'intersuola delle scarpe da strada per frenare le super-shoes.", icon: "📏", color: "from-sky-500 to-indigo-600" },

    // --- PSICOLOGIA E RITUALI (5) ---
    { id: 76, category: "Psicologia", title: "Il tunnel della Isinbayeva", content: "Yelena Isinbayeva si sdraiava nascosta sotto un asciugamano tra un salto e l'altro per concentrarsi ed estraniarsi.", icon: "🧘‍♀️", color: "from-pink-400 to-rose-400" },
    { id: 77, category: "Psicologia", title: "La mezza barba", content: "Tamberi gareggiava spesso con metà volto rasato e metà con la barba come rito scaramantico.", icon: "🧔", color: "from-stone-400 to-stone-600" },
    { id: 78, category: "Psicologia", title: "Il blocco dello stacco", content: "Molti astisti soffrono di un blocco mentale (twisties) che impedisce loro improvvisamente di staccare da terra.", icon: "🧠", color: "from-indigo-400 to-purple-500" },
    { id: 79, category: "Psicologia", title: "Intimidazione pre-gara", content: "Maurice Greene tirava fuori la lingua e ululava sui blocchi di partenza per intimidire fisicamente gli avversari.", icon: "🐺", color: "from-red-600 to-red-800" },
    { id: 80, category: "Psicologia", title: "Visualizzazione motoria", content: "I saltatori mimano il salto con le mani a occhi chiusi. Questa tecnica attiva gli stessi neuroni necessari al gesto reale.", icon: "👁️", color: "from-blue-400 to-blue-700" },

    // --- STATISTICHE (5) ---
    { id: 81, category: "Statistiche", title: "Il muro dei 10 secondi", content: "Oltre 170 uomini nella storia hanno corso i 100m sotto i 10 secondi, ma pochissimi sono atleti europei o asiatici.", icon: "📉", color: "from-slate-600 to-slate-800" },
    { id: 82, category: "Statistiche", title: "Tempi perfetti", content: "Nei 100m, tra l'oro e il bronzo spesso balla una differenza di soli 2-3 centesimi di secondo, impercettibile a occhio nudo.", icon: "🤏", color: "from-orange-500 to-amber-600" },
    { id: 83, category: "Statistiche", title: "L'età dei maratoneti", content: "Le migliori prestazioni nella maratona vengono statisticamente ottenute tra i 28 e i 34 anni.", icon: "🎂", color: "from-green-500 to-emerald-600" },
    { id: 84, category: "Statistiche", title: "Record indoor vs outdoor", content: "Per via delle curve più strette (pista di 200m), i record al coperto sono nettamente superiori (più lenti) rispetto a quelli all'aperto.", icon: "🏟️", color: "from-gray-500 to-gray-700" },
    { id: 85, category: "Statistiche", title: "Dominio keniota", content: "Oltre il 70% delle migliori prestazioni all-time nella maratona e mezza maratona appartengono ad atleti del Kenya.", icon: "🇰🇪", color: "from-red-700 to-green-700" },

    // --- INGEGNERIA E INFORTUNI ASSURDI (5) ---
    { id: 86, category: "Ingegneria", title: "Giavellotto aerodinamico", content: "Il giavellotto è progettato con micro-rigature (effetto pallina da golf) per generare portanza e stabilizzare il volo.", icon: "🛸", color: "from-teal-500 to-cyan-600" },
    { id: 87, category: "Ingegneria", title: "Aste in fibra", content: "L'arrivo della fibra di carbonio/vetro ha permesso di piegare l'asta a 'U' catapultando l'atleta oltre i 6 metri.", icon: "🦯", color: "from-slate-400 to-gray-600" },
    { id: 88, category: "Infortuni Assurdi", title: "Gesso in pista", content: "Tamberi ha vinto l'oro a Tokyo 2020 poggiando in pista il gesso che portava nel 2016 per esorcizzare il vecchio infortunio.", icon: "🤕", color: "from-blue-400 to-cyan-500" },
    { id: 89, category: "Infortuni Assurdi", title: "Strappo da esultanza", content: "Alcuni atleti si sono stirati i bicipiti femorali non in gara, ma rallentando bruscamente ed esultando dopo il traguardo.", icon: "😭", color: "from-rose-500 to-pink-700" },
    { id: 90, category: "Infortuni Assurdi", title: "Catene umane", content: "Nei cross country (corsa campestre) il fango eccessivo ha causato spappolamenti di tendini ad atleti che perdevano le scarpe.", icon: "🥾", color: "from-stone-600 to-stone-800" },
    
    // --- BIOLOGIA ED EPISODI (10) ---
    { id: 91, category: "Biologia", title: "Il gene ACTN3", content: "Soprannominato 'gene della velocità', è riscontrato nella stragrande maggioranza dei velocisti d'élite e favorisce la contrazione rapida.", icon: "🧬", color: "from-fuchsia-500 to-purple-600" },
    { id: 92, category: "Biologia", title: "Vantaggio delle leve", content: "Bolt, alto 1.95m, ha compensato le difficoltà in partenza con leve lunghissime e potenti in fase lanciata.", icon: "🦒", color: "from-yellow-400 to-orange-500" },
    { id: 93, category: "Aneddoti Olimpici", title: "L'oro di Marcell Jacobs", content: "A Tokyo 2020 Jacobs è stato il primo italiano a vincere la finale dei 100m olimpici maschili, scioccando il mondo.", icon: "🥇", color: "from-amber-400 to-yellow-600" },
    { id: 94, category: "Aneddoti Olimpici", title: "Staffetta magica", content: "Sempre a Tokyo 2020, l'Italia vince l'oro nella 4x100 superando la Gran Bretagna per un solo centesimo di secondo.", icon: "🏃‍♂️", color: "from-blue-600 to-indigo-700" },
    { id: 95, category: "Biologia", title: "Crampi misteriosi", content: "I crampi in gara non sono dovuti a mancanza di potassio, ma all'esaurimento nervoso periferico causato dallo sforzo.", icon: "⚡", color: "from-teal-600 to-emerald-700" },
    { id: 96, category: "Psicologia", title: "Effetto pubblico", content: "Saltare ritmando i battiti di mano innalza l'adrenalina permettendo contrazioni muscolari fino al 2% più forti.", icon: "👏", color: "from-rose-500 to-red-600" },
    { id: 97, category: "Materiali", title: "Fotofinish moderno", content: "Le telecamere non scattano 'foto', ma leggono migliaia di linee verticali al secondo componendo l'immagine dell'arrivo.", icon: "📷", color: "from-stone-500 to-slate-700" },
    { id: 98, category: "Record", title: "Sifan Hassan", content: "Olandese, ha vinto medaglie sui 1500m, 5000m, 10000m e Maratona, sfidando ogni logica di specializzazione fisiologica.", icon: "🏅", color: "from-purple-500 to-violet-600" },
    { id: 99, category: "Limiti Fisiologici", title: "Corsa nello spazio", content: "Sulla ISS gli astronauti corrono ancorati con cinghie elastiche al tapis roulant, altrimenti fluttuerebbero ad ogni passo.", icon: "🚀", color: "from-slate-700 to-slate-900" },
    { id: 100, category: "Regolamenti", title: "Vento a favore", content: "Nelle corse di velocità e salti, i record non sono validi se il vento a favore è superiore a +2.0 metri al secondo.", icon: "💨", color: "from-sky-400 to-blue-500" }
];

// Espone i dati globalmente
window.curiositiesData = curiositiesData;
