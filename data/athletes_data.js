// js/athletes_data.js
// Inserisci qui l'array con i dati della tua squadra.
// Puoi estrarre questi dati automaticamente col tuo script Python o aggiungerli a mano.

window.athletesData = [
  {
    id: "cristian_qorri_001",
    name: "Cristian Qorri",
    dob: "24-11-2004",
    club: "G.S. SELF ATL. MONTANARI GRUZZA",
    category: "Promesse Maschile (PM)",
    tesseramentoHistory: [
      { year: "2026", type: "Rinnovo", category: "Promesse Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2025", type: "Rinnovo", category: "Promesse Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2024", type: "Rinnovo", category: "Promesse Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2023", type: "Rinnovo", category: "Juniores Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2022", type: "Rinnovo", category: "Juniores Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2021", type: "Rinnovo", category: "Allievi", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2020", type: "Trasferimento", category: "Allievi", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2019", type: "Rinnovo", category: "Cadetti", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2018", type: "Rinnovo", category: "Cadetti", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2017", type: "Rinnovo", category: "Ragazzi Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2016", type: "Nuovo", category: "Ragazzi Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" }
    ],
    pbs: [
      { event: "500 metri", type: "Pista", performance: "1:15.17", year: "2024", city: "San Marino" },
      { event: "800 metri", type: "Pista", performance: "2:08.91", year: "2024", city: "Imola" },
      { event: "800 metri", type: "Indoor", performance: "2:21.55", year: "2022", city: "Parma" },
      { event: "1000 metri", type: "Pista", performance: "2:54.74", year: "2026", city: "San Marino" },
      { event: "1500 metri", type: "Pista", performance: "4:19.53", year: "2024", city: "Sasso Marconi" },
      { event: "1500 metri", type: "Indoor", performance: "4:44.32", year: "2022", city: "Ancona" },
      { event: "1 Miglio", type: "Pista", performance: "4:42.75", year: "2024", city: "Correggio" },
      { event: "2000 metri", type: "Pista", performance: "7:32.31", year: "2018", city: "Ravenna" },
      { event: "3000 metri", type: "Pista", performance: "9:26.17", year: "2024", city: "Imola" },
      { event: "5000 metri", type: "Pista", performance: "16:32.70", year: "2024", city: "Modena" },
      { event: "10 km", type: "Strada", performance: "35:18", year: "2024", city: "Cesenatico" },
      { event: "5 km", type: "Strada", performance: "16:50", year: "2023", city: "Sant'angelo Di Gatteo" },
      { event: "Salto in lungo", type: "Pista", performance: "3.06", year: "2018", city: "Santarcangelo Romagna" },
      { event: "Peso Kg 2.000", type: "Pista", performance: "8.76", year: "2017", city: "Rimini" },
      { event: "Peso Kg 4.000", type: "Pista", performance: "6.56", year: "2018", city: "Serravalle" },
      { event: "Disco Kg 1,500", type: "Pista", performance: "16.44", year: "2018", city: "Santarcangelo Romagna" },
      { event: "Martello Kg 4.000", type: "Pista", performance: "24.60", year: "2019", city: "Misano Adriatico" },
      { event: "Giavellotto Gr600", type: "Pista", performance: "14.70", year: "2018", city: "Santarcangelo Romagna" },
      { event: "Vortex", type: "Pista", performance: "31.50", year: "2017", city: "Santarcangelo Romagna" },
      { event: "Esathlon CM Disco", type: "Pista", performance: "519", year: "2018", city: "Santarcangelo Romagna" }
    ],
    races: {
      "500 METRI": [
        { dateStr: "13/04/2024", dateObj: new Date("2024-04-13"), type: "Pista", performance: "1:15.17", city: "San Marino", category: "PM" }
      ],
      "800 METRI": [
        { dateStr: "26/05/2024", dateObj: new Date("2024-05-26"), type: "Pista", performance: "2:08.91", city: "Imola", category: "PM" },
        { dateStr: "07/09/2023", dateObj: new Date("2023-09-07"), type: "Pista", performance: "2:08.94", city: "Modena", category: "JM" },
        { dateStr: "07/06/2023", dateObj: new Date("2023-06-07"), type: "Pista", performance: "2:09.87", city: "San Marino", category: "JM" },
        { dateStr: "05/07/2023", dateObj: new Date("2023-07-05"), type: "Pista", performance: "2:11.03", city: "Imola", category: "JM" },
        { dateStr: "07/07/2022", dateObj: new Date("2022-07-07"), type: "Pista", performance: "2:15.15", city: "Imola", category: "JM" },
        { dateStr: "15/06/2022", dateObj: new Date("2022-06-15"), type: "Pista", performance: "2:17.42", city: "San Marino", category: "JM" },
        { dateStr: "13/02/2022", dateObj: new Date("2022-02-13"), type: "Indoor", performance: "2:21.55", city: "Parma", category: "JM" },
        { dateStr: "29/01/2022", dateObj: new Date("2022-01-29"), type: "Indoor", performance: "2:22.62", city: "Ancona", category: "JM" },
        { dateStr: "23/05/2021", dateObj: new Date("2021-05-23"), type: "Pista", performance: "2:23.21", city: "Imola", category: "AM" },
        { dateStr: "04/07/2018", dateObj: new Date("2018-07-04"), type: "Pista", performance: "2:47.0", city: "Santarcangelo Romagna", category: "CM" }
      ],
      "1000 METRI": [
        { dateStr: "11/04/2026", dateObj: new Date("2026-04-11"), type: "Pista", performance: "2:54.74", city: "San Marino", category: "PM" },
        { dateStr: "11/04/2021", dateObj: new Date("2021-04-11"), type: "Pista", performance: "3:06.69", city: "Cesena", category: "AM" },
        { dateStr: "04/07/2019", dateObj: new Date("2019-07-04"), type: "Pista", performance: "3:16.68", city: "Forlì", category: "CM" },
        { dateStr: "04/09/2019", dateObj: new Date("2019-09-04"), type: "Pista", performance: "3:18.21", city: "Faenza", category: "CM" },
        { dateStr: "21/09/2019", dateObj: new Date("2019-09-21"), type: "Pista", performance: "3:18.45", city: "Misano Adriatico", category: "CM" },
        { dateStr: "25/05/2019", dateObj: new Date("2019-05-25"), type: "Pista", performance: "3:20.60", city: "Piacenza", category: "CM" },
        { dateStr: "27/04/2019", dateObj: new Date("2019-04-27"), type: "Pista", performance: "3:26.22", city: "Serravalle", category: "CM" },
        { dateStr: "11/07/2018", dateObj: new Date("2018-07-11"), type: "Pista", performance: "3:27.4", city: "Rimini", category: "CM" },
        { dateStr: "04/05/2019", dateObj: new Date("2019-05-04"), type: "Pista", performance: "3:28.5", city: "Santarcangelo Di Romagna", category: "CM" },
        { dateStr: "07/04/2018", dateObj: new Date("2018-04-07"), type: "Pista", performance: "3:35.44", city: "Serravalle", category: "CM" },
        { dateStr: "15/04/2018", dateObj: new Date("2018-04-15"), type: "Pista", performance: "3:37.1", city: "Santarcangelo Romagna", category: "CM" },
        { dateStr: "05/07/2017", dateObj: new Date("2017-07-05"), type: "Pista", performance: "3:51.7", city: "Rimini", category: "RM" },
        { dateStr: "22/04/2017", dateObj: new Date("2017-04-22"), type: "Pista", performance: "4:09.4", city: "Imola", category: "RM" }
      ],
      "1500 METRI": [
        { dateStr: "13/06/2024", dateObj: new Date("2024-06-13"), type: "Pista", performance: "4:19.53", city: "Sasso Marconi", category: "PM" },
        { dateStr: "27/04/2024", dateObj: new Date("2024-04-27"), type: "Pista", performance: "4:22.29", city: "San Marino", category: "PM" },
        { dateStr: "13/09/2023", dateObj: new Date("2023-09-13"), type: "Pista", performance: "4:23.25", city: "Faenza", category: "JM" },
        { dateStr: "01/06/2024", dateObj: new Date("2024-06-01"), type: "Pista", performance: "4:25.03", city: "Modena", category: "PM" },
        { dateStr: "27/05/2023", dateObj: new Date("2023-05-27"), type: "Pista", performance: "4:28.28", city: "Bologna", category: "JM" },
        { dateStr: "20/05/2023", dateObj: new Date("2023-05-20"), type: "Pista", performance: "4:28.90", city: "Modena", category: "JM" },
        { dateStr: "10/05/2025", dateObj: new Date("2025-05-10"), type: "Pista", performance: "4:29.17", city: "Modena", category: "PM" },
        { dateStr: "30/05/2026", dateObj: new Date("2026-05-30"), type: "Pista", performance: "4:33.76", city: "Cesena", category: "PM" },
        { dateStr: "25/04/2026", dateObj: new Date("2026-04-25"), type: "Pista", performance: "4:34.64", city: "Modena", category: "PM" },
        { dateStr: "16/05/2026", dateObj: new Date("2026-05-16"), type: "Pista", performance: "4:35.76", city: "Parma", category: "PM" },
        { dateStr: "29/04/2023", dateObj: new Date("2023-04-29"), type: "Pista", performance: "4:37.55", city: "San Marino", category: "JM" },
        { dateStr: "15/01/2022", dateObj: new Date("2022-01-15"), type: "Indoor", performance: "4:44.32", city: "Ancona", category: "JM" },
        { dateStr: "22/05/2021", dateObj: new Date("2021-05-22"), type: "Pista", performance: "4:45.99", city: "Faenza", category: "AM" },
        { dateStr: "01/05/2021", dateObj: new Date("2021-05-01"), type: "Pista", performance: "4:48.30", city: "Modena", category: "AM" },
        { dateStr: "25/08/2020", dateObj: new Date("2020-08-25"), type: "Pista", performance: "5:08.05", city: "Santarcangelo Romagna", category: "AM" }
      ],
      "1 MIGLIO": [
        { dateStr: "07/09/2024", dateObj: new Date("2024-09-07"), type: "Pista", performance: "4:42.75", city: "Correggio", category: "PM" }
      ],
      "2000 METRI": [
        { dateStr: "03/06/2018", dateObj: new Date("2018-06-03"), type: "Pista", performance: "7:32.31", city: "Ravenna", category: "CM" },
        { dateStr: "08/05/2019", dateObj: new Date("2019-05-08"), type: "Pista", performance: "7:43.1", city: "San Giovanni In Marignano", category: "CM" },
        { dateStr: "09/05/2018", dateObj: new Date("2018-05-09"), type: "Pista", performance: "7:53.7", city: "Cattolica", category: "CM" },
        { dateStr: "06/05/2018", dateObj: new Date("2018-05-06"), type: "Pista", performance: "8:03.9", city: "Ravenna", category: "CM" }
      ],
      "3000 METRI": [
        { dateStr: "03/07/2024", dateObj: new Date("2024-07-03"), type: "Pista", performance: "9:26.17", city: "Imola", category: "PM" },
        { dateStr: "28/07/2023", dateObj: new Date("2023-07-28"), type: "Pista", performance: "9:47.13", city: "Castelnovo Monti", category: "JM" }
      ],
      "5000 METRI": [
        { dateStr: "05/05/2024", dateObj: new Date("2024-05-05"), type: "Pista", performance: "16:32.70", city: "Modena", category: "PM" },
        { dateStr: "12/04/2025", dateObj: new Date("2025-04-12"), type: "Pista", performance: "17:02.79", city: "San Marino", category: "PM" },
        { dateStr: "14/07/2024", dateObj: new Date("2024-07-14"), type: "Pista", performance: "17:19.95", city: "Parma", category: "PM" },
        { dateStr: "11/05/2025", dateObj: new Date("2025-05-11"), type: "Pista", performance: "17:28.69", city: "Modena", category: "PM" },
        { dateStr: "01/10/2023", dateObj: new Date("2023-10-01"), type: "Pista", performance: "17:29.29", city: "Mariano Comense", category: "JM" }
      ],
      "5 KM": [
        { dateStr: "21/09/2023", dateObj: new Date("2023-09-21"), type: "Strada", performance: "16:50", city: "Sant'angelo Di Gatteo", category: "JM" }
      ],
      "10 KM": [
        { dateStr: "10/03/2024", dateObj: new Date("2024-03-10"), type: "Strada", performance: "35:18", city: "Cesenatico", category: "PM" },
        { dateStr: "08/03/2026", dateObj: new Date("2026-03-08"), type: "Strada", performance: "35:39", city: "Cesenatico", category: "PM" },
        { dateStr: "17/11/2024", dateObj: new Date("2024-11-17"), type: "Strada", performance: "35:40", city: "Santarcangelo Di Romagna", category: "PM" },
        { dateStr: "25/02/2024", dateObj: new Date("2024-02-25"), type: "Strada", performance: "35:52", city: "Misano Adriatico", category: "PM" },
        { dateStr: "23/02/2025", dateObj: new Date("2025-02-23"), type: "Strada", performance: "36:17", city: "Misano Adriatico", category: "PM" },
        { dateStr: "22/02/2026", dateObj: new Date("2026-02-22"), type: "Strada", performance: "36:42", city: "Misano Adriatico", category: "PM" },
        { dateStr: "19/11/2023", dateObj: new Date("2023-11-19"), type: "Strada", performance: "37:00", city: "Santarcangelo Di Romagna", category: "JM" },
        { dateStr: "16/11/2025", dateObj: new Date("2025-11-16"), type: "Strada", performance: "37:11", city: "Santarcangelo Di Romagna", category: "PM" },
        { dateStr: "26/02/2023", dateObj: new Date("2023-02-26"), type: "Strada", performance: "40:07", city: "Misano Adriatico", category: "JM" }
      ],
      "SALTO IN LUNGO": [
        { dateStr: "15/04/2018", dateObj: new Date("2018-04-15"), type: "Pista", performance: "3.06", city: "Santarcangelo Romagna", category: "CM" },
        { dateStr: "30/10/2016", dateObj: new Date("2016-10-30"), type: "Pista", performance: "2.37", city: "Santarcangelo", category: "RM" }
      ],
      "PESO 2KG": [
        { dateStr: "05/07/2017", dateObj: new Date("2017-07-05"), type: "Pista", performance: "8.76", city: "Rimini", category: "RM" },
        { dateStr: "27/05/2017", dateObj: new Date("2017-05-27"), type: "Pista", performance: "7.22", city: "Cesena", category: "RM" },
        { dateStr: "03/05/2017", dateObj: new Date("2017-05-03"), type: "Pista", performance: "6.42", city: "Misano Adriatico", category: "RM" },
        { dateStr: "30/10/2016", dateObj: new Date("2016-10-30"), type: "Pista", performance: "5.65", city: "Santarcangelo", category: "RM" }
      ],
      "PESO KG 4.000": [
        { dateStr: "07/04/2018", dateObj: new Date("2018-04-07"), type: "Pista", performance: "6.56", city: "Serravalle", category: "CM" },
        { dateStr: "11/07/2018", dateObj: new Date("2018-07-11"), type: "Pista", performance: "6.29", city: "Rimini", category: "CM" }
      ],
      "DISCO 1.5KG": [
        { dateStr: "15/04/2018", dateObj: new Date("2018-04-15"), type: "Pista", performance: "16.44", city: "Santarcangelo Romagna", category: "CM" },
        { dateStr: "06/05/2018", dateObj: new Date("2018-05-06"), type: "Pista", performance: "15.43", city: "Ravenna", category: "CM" },
        { dateStr: "09/05/2018", dateObj: new Date("2018-05-09"), type: "Pista", performance: "15.16", city: "Cattolica", category: "CM" },
        { dateStr: "02/06/2018", dateObj: new Date("2018-06-02"), type: "Pista", performance: "14.61", city: "Ravenna", category: "CM" },
        { dateStr: "11/03/2018", dateObj: new Date("2018-03-11"), type: "Pista", performance: "12.71", city: "Cattolica", category: "CM" }
      ],
      "MARTELLO 4KG": [
        { dateStr: "21/09/2019", dateObj: new Date("2019-09-21"), type: "Pista", performance: "24.60", city: "Misano Adriatico", category: "CM" },
        { dateStr: "04/05/2019", dateObj: new Date("2019-05-04"), type: "Pista", performance: "23.27", city: "Santarcangelo Di Romagna", category: "CM" },
        { dateStr: "11/03/2018", dateObj: new Date("2018-03-11"), type: "Pista", performance: "22.23", city: "Cattolica", category: "CM" },
        { dateStr: "26/05/2019", dateObj: new Date("2019-05-26"), type: "Pista", performance: "20.47", city: "Piacenza", category: "CM" },
        { dateStr: "05/05/2018", dateObj: new Date("2018-05-05"), type: "Pista", performance: "20.33", city: "Ravenna", category: "CM" }
      ],
      "GIAVELLOTTO GR600": [
        { dateStr: "04/07/2018", dateObj: new Date("2018-07-04"), type: "Pista", performance: "14.70", city: "Santarcangelo Romagna", category: "CM" },
        { dateStr: "15/04/2018", dateObj: new Date("2018-04-15"), type: "Pista", performance: "13.45", city: "Santarcangelo Romagna", category: "CM" }
      ],
      "VORTEX": [
        { dateStr: "12/07/2017", dateObj: new Date("2017-07-12"), type: "Pista", performance: "31.50", city: "Santarcangelo Romagna", category: "RM" },
        { dateStr: "22/04/2017", dateObj: new Date("2017-04-22"), type: "Pista", performance: "30.45", city: "Imola", category: "RM" },
        { dateStr: "10/05/2017", dateObj: new Date("2017-05-10"), type: "Pista", performance: "23.90", city: "Cattolica", category: "RM" }
      ],
      "ESATHLON CM DISCO": [
        { dateStr: "15/04/2018", dateObj: new Date("2018-04-15"), type: "Pista", performance: "519", city: "Santarcangelo Romagna", category: "CM" }
      ]
    }
  },
  {
    id: "kevin_de_jesus_002",
    name: "Kevin De Jesus",
    dob: "16-07-2001",
    club: "G.S. SELF ATL. MONTANARI GRUZZA",
    category: "Seniores Maschile (SM)",
    tesseramentoHistory: [
      { year: "2026", type: "Rinnovo", category: "Seniores Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2025", type: "Rinnovo", category: "Seniores Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2024", type: "Rinnovo", category: "Seniores Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2023", type: "Nuovo", category: "Promesse Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2019", type: "Rinnovo", category: "Juniores Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2018", type: "Rinnovo", category: "Allievi Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2017", type: "Trasferimento", category: "Allievi Maschile", club: "G.S. SELF ATL. MONTANARI GRUZZA" },
      { year: "2016", type: "Rinnovo", category: "Cadetti Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2015", type: "Nuovo", category: "Cadetti Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" }
    ],
    pbs: [
      { event: "500 metri", type: "Pista", performance: "1:08.65", year: "2024", city: "San Marino" },
      { event: "800 metri", type: "Indoor", performance: "2:14.69", year: "2017", city: "Ancona" },
      { event: "1000 metri", type: "Pista", performance: "2:37.44", year: "2026", city: "San Marino" },
      { event: "1000 metri", type: "Indoor", performance: "3:10.22", year: "2016", city: "Ancona" },
      { event: "1500 metri", type: "Pista", performance: "3:55.64", year: "2026", city: "Modena" },
      { event: "2000 metri", type: "Pista", performance: "6:47.6", year: "2016", city: "Cervia" },
      { event: "3000 metri", type: "Pista", performance: "8:58.06", year: "2024", city: "Imola" },
      { event: "5000 metri", type: "Pista", performance: "14:56.21", year: "2026", city: "Parma" },
      { event: "5 km", type: "Strada", performance: "15:36", year: "2025", city: "Sant'angelo Di Gatteo" },
      { event: "10 km", type: "Strada", performance: "31:46", year: "2025", city: "Cesenatico" },
      { event: "Mezza Maratona", type: "Strada", performance: "1h11:31", year: "2025", city: "Cremona" },
      { event: "1200 siepi", type: "Pista", performance: "3:41.03", year: "2016", city: "Reggio Emilia" },
      { event: "2000 siepi", type: "Pista", performance: "6:27.12", year: "2018", city: "Reggio Emilia" },
      { event: "3000 siepi", type: "Pista", performance: "9:07.89", year: "2025", city: "Modena" },
      { event: "60 Hs", type: "Indoor", performance: "11.76", year: "2016", city: "Ancona" },
      { event: "Salto in alto", type: "Indoor", performance: "1.17", year: "2016", city: "Ancona" },
      { event: "Salto in lungo", type: "Pista", performance: "4.43", year: "2016", city: "Faenza" },
      { event: "Peso Kg 4.000", type: "Indoor", performance: "6.42", year: "2016", city: "Ancona" },
      { event: "Giavellotto Gr600", type: "Pista", performance: "23.23", year: "2016", city: "Faenza" },
      { event: "Tetrathlon", type: "Indoor", performance: "1175", year: "2016", city: "Ancona" }
    ],
    races: {
      "500 METRI": [
        { dateStr: "13/04/2024", dateObj: new Date("2024-04-13"), type: "Pista", performance: "1:08.65", city: "San Marino", category: "SM" }
      ],
      "800 METRI": [
        { dateStr: "08/01/2017", dateObj: new Date("2017-01-08"), type: "Indoor", performance: "2:14.69", city: "Ancona", category: "AM" }
      ],
      "1000 METRI": [
        { dateStr: "11/04/2026", dateObj: new Date("2026-04-11"), type: "Pista", performance: "2:37.44", city: "San Marino", category: "SM" },
        { dateStr: "24/09/2016", dateObj: new Date("2016-09-24"), type: "Pista", performance: "2:55.14", city: "Reggiolo", category: "CM" },
        { dateStr: "16/10/2016", dateObj: new Date("2016-10-16"), type: "Pista", performance: "2:57.19", city: "Cattolica", category: "CM" },
        { dateStr: "09/04/2016", dateObj: new Date("2016-04-09"), type: "Pista", performance: "2:58.9", city: "Cesena", category: "CM" },
        { dateStr: "17/01/2016", dateObj: new Date("2016-01-17"), type: "Indoor", performance: "3:10.22", city: "Ancona", category: "CM" }
      ],
      "1500 METRI": [
        { dateStr: "01/05/2026", dateObj: new Date("2026-05-01"), type: "Pista", performance: "3:55.64", city: "Modena", category: "SM" },
        { dateStr: "16/05/2026", dateObj: new Date("2026-05-16"), type: "Pista", performance: "3:59.36", city: "Parma", category: "SM" },
        { dateStr: "25/04/2026", dateObj: new Date("2026-04-25"), type: "Pista", performance: "3:59.48", city: "Modena", category: "SM" },
        { dateStr: "13/06/2026", dateObj: new Date("2026-06-13"), type: "Pista", performance: "4:00.07", city: "Siena", category: "SM" },
        { dateStr: "06/07/2026", dateObj: new Date("2026-07-06"), type: "Pista", performance: "4:05.21", city: "Castelfranco Emilia", category: "SM" },
        { dateStr: "27/04/2024", dateObj: new Date("2024-04-27"), type: "Pista", performance: "4:06.12", city: "San Marino", category: "SM" },
        { dateStr: "13/09/2023", dateObj: new Date("2023-09-13"), type: "Pista", performance: "4:10.39", city: "Faenza", category: "PM" },
        { dateStr: "20/05/2023", dateObj: new Date("2023-05-20"), type: "Pista", performance: "4:17.24", city: "Modena", category: "PM" },
        { dateStr: "19/05/2018", dateObj: new Date("2018-05-19"), type: "Pista", performance: "4:22.29", city: "Cesena", category: "AM" },
        { dateStr: "29/04/2023", dateObj: new Date("2023-04-29"), type: "Pista", performance: "4:29.78", city: "San Marino", category: "PM" }
      ],
      "2000 METRI": [
        { dateStr: "14/05/2016", dateObj: new Date("2016-05-14"), type: "Pista", performance: "6:47.6", city: "Cervia", category: "CM" }
      ],
      "3000 METRI": [
        { dateStr: "03/07/2024", dateObj: new Date("2024-07-03"), type: "Pista", performance: "8:58.06", city: "Imola", category: "SM" },
        { dateStr: "28/07/2023", dateObj: new Date("2023-07-28"), type: "Pista", performance: "9:16.03", city: "Castelnovo Monti", category: "PM" },
        { dateStr: "30/09/2018", dateObj: new Date("2018-09-30"), type: "Pista", performance: "9:29.79", city: "San Benedetto Del Tronto", category: "AM" },
        { dateStr: "01/09/2018", dateObj: new Date("2018-09-01"), type: "Pista", performance: "9:32.11", city: "Modena", category: "AM" },
        { dateStr: "16/09/2018", dateObj: new Date("2018-09-16"), type: "Pista", performance: "9:33.87", city: "Modena", category: "AM" },
        { dateStr: "13/05/2018", dateObj: new Date("2018-05-13"), type: "Pista", performance: "9:36.88", city: "Reggio Emilia", category: "AM" },
        { dateStr: "01/10/2017", dateObj: new Date("2017-10-01"), type: "Pista", performance: "9:52.51", city: "Vicenza", category: "AM" },
        { dateStr: "08/04/2017", dateObj: new Date("2017-04-08"), type: "Pista", performance: "9:56.45", city: "Copparo", category: "AM" },
        { dateStr: "29/04/2017", dateObj: new Date("2017-04-29"), type: "Pista", performance: "9:56.84", city: "Serravalle", category: "AM" },
        { dateStr: "17/09/2017", dateObj: new Date("2017-09-17"), type: "Pista", performance: "10:03.06", city: "Reggio Emilia", category: "AM" }
      ],
      "5000 METRI": [
        { dateStr: "17/05/2026", dateObj: new Date("2026-05-17"), type: "Pista", performance: "14:56.21", city: "Parma", category: "SM" },
        { dateStr: "11/05/2025", dateObj: new Date("2025-05-11"), type: "Pista", performance: "15:04.42", city: "Modena", category: "SM" },
        { dateStr: "14/07/2026", dateObj: new Date("2026-07-14"), type: "Pista", performance: "15:09.11", city: "Trento", category: "SM" },
        { dateStr: "12/04/2025", dateObj: new Date("2025-04-12"), type: "Pista", performance: "15:13.86", city: "San Marino", category: "SM" },
        { dateStr: "14/06/2026", dateObj: new Date("2026-06-14"), type: "Pista", performance: "15:29.20", city: "Siena", category: "SM" },
        { dateStr: "15/06/2025", dateObj: new Date("2025-06-15"), type: "Pista", performance: "15:54.79", city: "Borgo Valbelluna", category: "SM" },
        { dateStr: "20/07/2024", dateObj: new Date("2024-07-20"), type: "Pista", performance: "16:05.53", city: "Civitanova Marche", category: "SM" },
        { dateStr: "02/05/2019", dateObj: new Date("2019-05-02"), type: "Pista", performance: "17:18.77", city: "Serravalle", category: "JM" },
        { dateStr: "22/04/2017", dateObj: new Date("2017-04-22"), type: "Pista", performance: "17:24.02", city: "Serravalle", category: "AM" }
      ],
      "5 KM": [
        { dateStr: "18/09/2025", dateObj: new Date("2025-09-18"), type: "Strada", performance: "15:36", city: "Sant'angelo Di Gatteo", category: "SM" },
        { dateStr: "21/09/2023", dateObj: new Date("2023-09-21"), type: "Strada", performance: "16:33", city: "Sant'angelo Di Gatteo", category: "PM" }
      ],
      "10 KM": [
        { dateStr: "09/03/2025", dateObj: new Date("2025-03-09"), type: "Strada", performance: "31:46", city: "Cesenatico", category: "SM" },
        { dateStr: "23/02/2025", dateObj: new Date("2025-02-23"), type: "Strada", performance: "31:53", city: "Misano Adriatico", category: "SM" },
        { dateStr: "16/11/2025", dateObj: new Date("2025-11-16"), type: "Strada", performance: "32:33", city: "Santarcangelo Di Romagna", category: "SM" },
        { dateStr: "17/02/2024", dateObj: new Date("2024-02-17"), type: "Strada", performance: "33:25", city: "Porto Recanati", category: "SM" },
        { dateStr: "19/11/2023", dateObj: new Date("2023-11-19"), type: "Strada", performance: "34:01", city: "Santarcangelo Di Romagna", category: "PM" },
        { dateStr: "10/03/2024", dateObj: new Date("2024-03-10"), type: "Strada", performance: "35:17", city: "Cesenatico", category: "SM" },
        { dateStr: "25/02/2024", dateObj: new Date("2024-02-25"), type: "Strada", performance: "36:10", city: "Misano Adriatico", category: "SM" }
      ],
      "MEZZA MARATONA": [
        { dateStr: "19/10/2025", dateObj: new Date("2025-10-19"), type: "Strada", performance: "1h11:31", city: "Cremona", category: "SM" },
        { dateStr: "05/10/2025", dateObj: new Date("2025-10-05"), type: "Strada", performance: "1h12:46", city: "Forli'", category: "SM" }
      ],
      "1200 SIEPI": [
        { dateStr: "04/09/2016", dateObj: new Date("2016-09-04"), type: "Pista", performance: "3:41.03", city: "Reggio Emilia", category: "CM" },
        { dateStr: "25/09/2016", dateObj: new Date("2016-09-25"), type: "Pista", performance: "3:43.61", city: "Reggiolo", category: "CM" }
      ],
      "2000 SIEPI": [
        { dateStr: "12/05/2018", dateObj: new Date("2018-05-12"), type: "Pista", performance: "6:27.12", city: "Reggio Emilia", category: "AM" },
        { dateStr: "15/06/2018", dateObj: new Date("2018-06-15"), type: "Pista", performance: "6:27.95", city: "Rieti", category: "AM" },
        { dateStr: "29/09/2018", dateObj: new Date("2018-09-29"), type: "Pista", performance: "6:28.08", city: "San Benedetto Del Tronto", category: "AM" },
        { dateStr: "15/09/2018", dateObj: new Date("2018-09-15"), type: "Pista", performance: "6:31.40", city: "Modena", category: "AM" },
        { dateStr: "30/09/2017", dateObj: new Date("2017-09-30"), type: "Pista", performance: "6:47.78", city: "Vicenza", category: "AM" },
        { dateStr: "16/09/2017", dateObj: new Date("2017-09-16"), type: "Pista", performance: "6:50.81", city: "Reggio Emilia", category: "AM" },
        { dateStr: "06/06/2017", dateObj: new Date("2017-06-06"), type: "Pista", performance: "6:54.94", city: "Misano Adriatico", category: "AM" }
      ],
      "3000 SIEPI": [
        { dateStr: "10/05/2025", dateObj: new Date("2025-05-10"), type: "Pista", performance: "9:07.89", city: "Modena", category: "SM" },
        { dateStr: "24/05/2025", dateObj: new Date("2025-05-24"), type: "Pista", performance: "9:13.14", city: "Cesena", category: "SM" },
        { dateStr: "14/06/2025", dateObj: new Date("2025-06-14"), type: "Pista", performance: "9:24.73", city: "Borgo Valbelluna", category: "SM" },
        { dateStr: "20/07/2025", dateObj: new Date("2025-07-20"), type: "Pista", performance: "9:25.42", city: "Conegliano", category: "SM" },
        { dateStr: "08/06/2024", dateObj: new Date("2024-06-08"), type: "Pista", performance: "9:33.33", city: "Fermo", category: "SM" },
        { dateStr: "25/05/2024", dateObj: new Date("2024-05-25"), type: "Pista", performance: "9:35.10", city: "Imola", category: "SM" },
        { dateStr: "05/07/2023", dateObj: new Date("2023-07-05"), type: "Pista", performance: "9:44.24", city: "Imola", category: "PM" },
        { dateStr: "07/09/2023", dateObj: new Date("2023-09-07"), type: "Pista", performance: "9:47.77", city: "Modena", category: "PM" },
        { dateStr: "27/05/2023", dateObj: new Date("2023-05-27"), type: "Pista", performance: "9:56.41", city: "Bologna", category: "PM" },
        { dateStr: "18/06/2023", dateObj: new Date("2023-06-18"), type: "Pista", performance: "9:57.08", city: "Agropoli", category: "PM" },
        { dateStr: "01/06/2019", dateObj: new Date("2019-06-01"), type: "Pista", performance: "9:58.73", city: "Imola", category: "JM" },
        { dateStr: "26/05/2018", dateObj: new Date("2018-05-26"), type: "Pista", performance: "10:04.83", city: "Forli", category: "AM" },
        { dateStr: "23/06/2018", dateObj: new Date("2018-06-23"), type: "Pista", performance: "10:05.41", city: "Sulmona", category: "AM" },
        { dateStr: "11/05/2019", dateObj: new Date("2019-05-11"), type: "Pista", performance: "10:12.09", city: "Modena", category: "JM" },
        { dateStr: "05/05/2018", dateObj: new Date("2018-05-05"), type: "Pista", performance: "10:28.77", city: "Modena", category: "AM" }
      ],
      "60 HS": [
        { dateStr: "17/01/2016", dateObj: new Date("2016-01-17"), type: "Indoor", performance: "11.76", city: "Ancona", category: "CM" }
      ],
      "SALTO IN ALTO": [
        { dateStr: "17/01/2016", dateObj: new Date("2016-01-17"), type: "Indoor", performance: "1.17", city: "Ancona", category: "CM" }
      ],
      "SALTO IN LUNGO": [
        { dateStr: "11/06/2016", dateObj: new Date("2016-06-11"), type: "Pista", performance: "4.43", city: "Faenza", category: "CM" }
      ],
      "PESO KG 4.000": [
        { dateStr: "17/01/2016", dateObj: new Date("2016-01-17"), type: "Indoor", performance: "6.42", city: "Ancona", category: "CM" }
      ],
      "GIAVELLOTTO GR600": [
        { dateStr: "11/06/2016", dateObj: new Date("2016-06-11"), type: "Pista", performance: "23.23", city: "Faenza", category: "CM" }
      ],
      "TETRATHLON": [
        { dateStr: "17/01/2016", dateObj: new Date("2016-01-17"), type: "Indoor", performance: "1175", city: "Ancona", category: "CM" }
      ]
    }
  },
  {
    id: "ismail_el_haissoufi_003",
    name: "Ismail El Haissoufi",
    dob: "10-12-1991",
    club: "A.S.D. DAUNIA RUNNING",
    category: "Seniores 35 Maschile (SM35)",
    tesseramentoHistory: [
      { year: "2026", type: "Trasferimento", category: "Seniores 35 Maschile", club: "A.S.D. DAUNIA RUNNING" },
      { year: "2025", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2024", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2023", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2022", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2021", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2020", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2019", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2018", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2017", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2016", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2015", type: "Rinnovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2014", type: "Nuovo", category: "Seniores Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2012", type: "Rinnovo", category: "Promesse Maschile", club: "ROMAGNA RUNNING 1994" },
      { year: "2011", type: "Trasferimento", category: "Promesse Maschile", club: "ROMAGNA RUNNING 1994" },
      { year: "2010", type: "Rinnovo", category: "Juniores Maschile", club: "ATHLETIC RIMINI ASD" },
      { year: "2009", type: "Rinnovo", category: "Juniores Maschile", club: "ATHLETIC RIMINI ASD" },
      { year: "2008", type: "Trasferimento", category: "Allievi Maschile", club: "ATHLETIC RIMINI ASD" },
      { year: "2007", type: "Rinnovo", category: "Allievi Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2006", type: "Rinnovo", category: "Cadetti Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" },
      { year: "2005", type: "Nuovo", category: "Cadetti Maschile", club: "ATL. RIMINI NORD SANTARCANGELO" }
    ],
    pbs: [
      { event: "60 metri", type: "Indoor", performance: "8.7", year: "2006", city: "Cesenatico" },
      { event: "80 metri", type: "Pista", performance: "10.4", year: "2006", city: "Rimini" },
      { event: "300 metri", type: "Pista", performance: "40.10", year: "2006", city: "Faenza" },
      { event: "400 metri", type: "Pista", performance: "55.19", year: "2009", city: "Parma" },
      { event: "800 metri", type: "Pista", performance: "2:01.27", year: "2011", city: "Imola" },
      { event: "800 metri", type: "Indoor", performance: "2:05.73", year: "2007", city: "Ancona" },
      { event: "1000 metri", type: "Pista", performance: "2:40.44", year: "2011", city: "Bologna" },
      { event: "1500 metri", type: "Pista", performance: "4:13.94", year: "2011", city: "Faenza" },
      { event: "1500 metri", type: "Indoor", performance: "4:28.02", year: "2007", city: "Ancona" },
      { event: "2000 metri", type: "Pista", performance: "6:11.25", year: "2006", city: "Scandiano" },
      { event: "3000 metri", type: "Pista", performance: "9:24.44", year: "2021", city: "Cesena" },
      { event: "5000 metri", type: "Pista", performance: "15:58.82", year: "2021", city: "Imola" },
      { event: "10000 metri", type: "Pista", performance: "33:08.16", year: "2021", city: "Rubiera" },
      { event: "5 km", type: "Strada", performance: "15:24", year: "2026", city: "Misano Adriatico" },
      { event: "10 km", type: "Strada", performance: "31:27", year: "2023", city: "Cesenatico" },
      { event: "Mezza Maratona", type: "Strada", performance: "1h08:21", year: "2022", city: "Pisa" },
      { event: "Maratona", type: "Strada", performance: "2h26:40", year: "2023", city: "Roma" },
      { event: "100hs", type: "Pista", performance: "17.8", year: "2006", city: "Marina Di Ravenna" },
      { event: "Salto in alto", type: "Pista", performance: "1.55", year: "2006", city: "Ravenna" },
      { event: "Salto in lungo", type: "Pista", performance: "4.77", year: "2006", city: "Ravenna" },
      { event: "Salto in lungo", type: "Indoor", performance: "4.45", year: "2006", city: "Cesenatico" },
      { event: "Salto triplo", type: "Pista", performance: "10.08", year: "2006", city: "Rimini" },
      { event: "Pentathlon", type: "Pista", performance: "2460", year: "2006", city: "Ravenna" }
    ],
    races: {
      "60 METRI": [
        { dateStr: "15/01/2006", dateObj: new Date("2006-01-15"), type: "Indoor", performance: "8.7", city: "Cesenatico", category: "CM" },
        { dateStr: "13/02/2005", dateObj: new Date("2005-02-13"), type: "Indoor", performance: "9.46", city: "Cesenatico", category: "CM" }
      ],
      "80 METRI": [
        { dateStr: "26/07/2006", dateObj: new Date("2006-07-26"), type: "Pista", performance: "10.4", city: "Rimini", category: "CM" },
        { dateStr: "20/05/2006", dateObj: new Date("2006-05-20"), type: "Pista", performance: "10.9", city: "San Giovanni In Marignano", category: "CM" }
      ],
      "300 METRI": [
        { dateStr: "08/10/2006", dateObj: new Date("2006-10-08"), type: "Pista", performance: "40.10", city: "Faenza", category: "CM" },
        { dateStr: "30/04/2005", dateObj: new Date("2005-04-30"), type: "Pista", performance: "43.85", city: "Ravenna", category: "CM" }
      ],
      "400 METRI": [
        { dateStr: "27/06/2009", dateObj: new Date("2009-06-27"), type: "Pista", performance: "55.19", city: "Parma", category: "JM" },
        { dateStr: "04/06/2009", dateObj: new Date("2009-06-04"), type: "Pista", performance: "55.88", city: "Ferrara", category: "JM" }
      ],
      "800 METRI": [
        { dateStr: "07/06/2011", dateObj: new Date("2011-06-07"), type: "Pista", performance: "2:01.27", city: "Imola", category: "PM" },
        { dateStr: "22/06/2011", dateObj: new Date("2011-06-22"), type: "Pista", performance: "2:02.25", city: "Serravalle", category: "PM" },
        { dateStr: "15/05/2011", dateObj: new Date("2011-05-15"), type: "Pista", performance: "2:02.61", city: "Imola", category: "PM" },
        { dateStr: "10/07/2011", dateObj: new Date("2011-07-10"), type: "Pista", performance: "2:02.73", city: "Modena", category: "PM" },
        { dateStr: "02/06/2011", dateObj: new Date("2011-06-02"), type: "Pista", performance: "2:03.11", city: "Parma", category: "PM" },
        { dateStr: "23/06/2010", dateObj: new Date("2010-06-23"), type: "Pista", performance: "2:03.19", city: "San Marino", category: "JM" },
        { dateStr: "18/06/2009", dateObj: new Date("2009-06-18"), type: "Pista", performance: "2:04.27", city: "Sasso Marconi", category: "JM" },
        { dateStr: "07/06/2007", dateObj: new Date("2007-06-07"), type: "Pista", performance: "2:05.16", city: "Imola", category: "AM" },
        { dateStr: "21/02/2007", dateObj: new Date("2007-02-21"), type: "Indoor", performance: "2:05.73", city: "Ancona", category: "AM" },
        { dateStr: "23/06/2009", dateObj: new Date("2009-06-23"), type: "Pista", performance: "2:06.26", city: "Ferrara", category: "JM" },
        { dateStr: "13/05/2007", dateObj: new Date("2007-05-13"), type: "Pista", performance: "2:06.90", city: "Imola", category: "AM" },
        { dateStr: "24/06/2007", dateObj: new Date("2007-06-24"), type: "Pista", performance: "2:07.02", city: "Forli", category: "AM" },
        { dateStr: "11/06/2009", dateObj: new Date("2009-06-11"), type: "Pista", performance: "2:07.22", city: "Imola", category: "JM" },
        { dateStr: "27/06/2007", dateObj: new Date("2007-06-27"), type: "Pista", performance: "2:07.34", city: "San Marino", category: "AM" }
      ],
      "1000 METRI": [
        { dateStr: "07/05/2011", dateObj: new Date("2011-05-07"), type: "Pista", performance: "2:40.44", city: "Bologna", category: "PM" },
        { dateStr: "15/10/2006", dateObj: new Date("2006-10-15"), type: "Pista", performance: "2:45.5", city: "Forli", category: "CM" },
        { dateStr: "09/09/2006", dateObj: new Date("2006-09-09"), type: "Pista", performance: "2:45.93", city: "Scandiano", category: "CM" },
        { dateStr: "30/08/2006", dateObj: new Date("2006-08-30"), type: "Pista", performance: "2:49.0", city: "Rimini", category: "CM" },
        { dateStr: "01/10/2006", dateObj: new Date("2006-10-01"), type: "Pista", performance: "2:50.06", city: "Ravenna", category: "CM" },
        { dateStr: "06/05/2006", dateObj: new Date("2006-05-06"), type: "Pista", performance: "2:51.2", city: "Massalombarda", category: "CM" },
        { dateStr: "28/05/2006", dateObj: new Date("2006-05-28"), type: "Pista", performance: "2:54.2", city: "Marina Di Ravenna", category: "CM" },
        { dateStr: "17/09/2005", dateObj: new Date("2005-09-17"), type: "Pista", performance: "2:57.26", city: "Reggiolo", category: "CM" },
        { dateStr: "15/05/2007", dateObj: new Date("2007-05-15"), type: "Pista", performance: "2:58.07", city: "Comacchio", category: "AM" },
        { dateStr: "23/07/2005", dateObj: new Date("2005-07-23"), type: "Pista", performance: "2:58.9", city: "Misano Adriatico", category: "CM" },
        { dateStr: "08/09/2005", dateObj: new Date("2005-09-08"), type: "Pista", performance: "3:00.4", city: "Riccione", category: "CM" },
        { dateStr: "07/05/2005", dateObj: new Date("2005-05-07"), type: "Pista", performance: "3:04.5", city: "San Marino", category: "CM" },
        { dateStr: "30/04/2005", dateObj: new Date("2005-04-30"), type: "Pista", performance: "3:05.28", city: "Ravenna", category: "CM" },
        { dateStr: "21/05/2005", dateObj: new Date("2005-05-21"), type: "Pista", performance: "3:08.3", city: "San Giovanni In Marignano", category: "CM" }
      ],
      "1500 METRI": [
        { dateStr: "14/09/2011", dateObj: new Date("2011-09-14"), type: "Pista", performance: "4:13.94", city: "Faenza", category: "PM" },
        { dateStr: "20/06/2007", dateObj: new Date("2007-06-20"), type: "Pista", performance: "4:18.37", city: "Imola", category: "AM" },
        { dateStr: "26/06/2010", dateObj: new Date("2010-06-26"), type: "Pista", performance: "4:19.94", city: "Riccione", category: "JM" },
        { dateStr: "05/06/2010", dateObj: new Date("2010-06-05"), type: "Pista", performance: "4:20.21", city: "Serravalle", category: "JM" },
        { dateStr: "14/05/2011", dateObj: new Date("2011-05-14"), type: "Pista", performance: "4:20.74", city: "Imola", category: "PM" },
        { dateStr: "12/05/2007", dateObj: new Date("2007-05-12"), type: "Pista", performance: "4:21.85", city: "Imola", category: "AM" },
        { dateStr: "28/04/2007", dateObj: new Date("2007-04-28"), type: "Pista", performance: "4:25.56", city: "San Marino", category: "AM" },
        { dateStr: "29/09/2007", dateObj: new Date("2007-09-29"), type: "Pista", performance: "4:25.70", city: "Scandiano", category: "AM" },
        { dateStr: "26/05/2007", dateObj: new Date("2007-05-26"), type: "Pista", performance: "4:27.00", city: "Reggio Emilia", category: "AM" },
        { dateStr: "21/01/2007", dateObj: new Date("2007-01-21"), type: "Indoor", performance: "4:28.02", city: "Ancona", category: "AM" },
        { dateStr: "14/04/2007", dateObj: new Date("2007-04-14"), type: "Pista", performance: "4:30.65", city: "Comacchio", category: "AM" }
      ],
      "2000 METRI": [
        { dateStr: "10/09/2006", dateObj: new Date("2006-09-10"), type: "Pista", performance: "6:11.25", city: "Scandiano", category: "CM" },
        { dateStr: "07/05/2006", dateObj: new Date("2006-05-07"), type: "Pista", performance: "6:20.7", city: "Massalombarda", category: "CM" },
        { dateStr: "14/10/2006", dateObj: new Date("2006-10-14"), type: "Pista", performance: "6:21.2", city: "Forli", category: "CM" },
        { dateStr: "25/04/2006", dateObj: new Date("2006-04-25"), type: "Pista", performance: "6:24.9", city: "Bologna", category: "CM" },
        { dateStr: "18/09/2005", dateObj: new Date("2005-09-18"), type: "Pista", performance: "6:25.96", city: "Reggiolo", category: "CM" },
        { dateStr: "09/09/2005", dateObj: new Date("2005-09-09"), type: "Pista", performance: "6:36.3", city: "Riccione", category: "CM" }
      ],
      "3000 METRI": [
        { dateStr: "11/04/2021", dateObj: new Date("2021-04-11"), type: "Pista", performance: "9:24.44", city: "Cesena", category: "SM" }
      ],
      "5000 METRI": [
        { dateStr: "23/05/2021", dateObj: new Date("2021-05-23"), type: "Pista", performance: "15:58.82", city: "Imola", category: "SM" },
        { dateStr: "28/06/2015", dateObj: new Date("2015-06-28"), type: "Pista", performance: "16:52.65", city: "Modena", category: "SM" }
      ],
      "10000 METRI": [
        { dateStr: "18/04/2021", dateObj: new Date("2021-04-18"), type: "Pista", performance: "33:08.16", city: "Rubiera", category: "SM" },
        { dateStr: "01/04/2017", dateObj: new Date("2017-04-01"), type: "Pista", performance: "35:12.22", city: "Rimini", category: "SM" }
      ],
      "5 KM": [
        { dateStr: "23/05/2026", dateObj: new Date("2026-05-23"), type: "Strada", performance: "15:24", city: "Misano Adriatico", category: "SM35" },
        { dateStr: "21/09/2023", dateObj: new Date("2023-09-21"), type: "Strada", performance: "15:43", city: "Sant'angelo Di Gatteo", category: "SM" }
      ],
      "10 KM": [
        { dateStr: "12/03/2023", dateObj: new Date("2023-03-12"), type: "Strada", performance: "31:27", city: "Cesenatico", category: "SM" },
        { dateStr: "21/11/2021", dateObj: new Date("2021-11-21"), type: "Strada", performance: "31:28", city: "Santarcangelo Di Romagna", category: "SM" },
        { dateStr: "13/03/2022", dateObj: new Date("2022-03-13"), type: "Strada", performance: "31:34", city: "Cesenatico", category: "SM" },
        { dateStr: "20/11/2022", dateObj: new Date("2022-11-20"), type: "Strada", performance: "31:42", city: "Santarcangelo Romagna", category: "SM" },
        { dateStr: "23/02/2020", dateObj: new Date("2020-02-23"), type: "Strada", performance: "31:43", city: "Misano Adriatico", category: "SM" },
        { dateStr: "01/05/2022", dateObj: new Date("2022-05-01"), type: "Strada", performance: "31:57", city: "San Mauro Pascoli", category: "SM" },
        { dateStr: "10/03/2024", dateObj: new Date("2024-03-10"), type: "Strada", performance: "32:03", city: "Cesenatico", category: "SM" },
        { dateStr: "25/02/2024", dateObj: new Date("2024-02-25"), type: "Strada", performance: "32:28", city: "Misano Adriatico", category: "SM" },
        { dateStr: "30/11/2025", dateObj: new Date("2025-11-30"), type: "Strada", performance: "32:44", city: "Firenze", category: "SM" },
        { dateStr: "17/11/2019", dateObj: new Date("2019-11-17"), type: "Strada", performance: "32:56", city: "Santarcangelo Di Romagna", category: "SM" },
        { dateStr: "01/05/2024", dateObj: new Date("2024-05-01"), type: "Strada", performance: "33:03", city: "San Mauro Pascoli", category: "SM" },
        { dateStr: "28/08/2022", dateObj: new Date("2022-08-28"), type: "Strada", performance: "33:04", city: "Sant'angelo Di Gatteo", category: "SM" },
        { dateStr: "02/05/2021", dateObj: new Date("2021-05-02"), type: "Strada", performance: "33:19", city: "Gualdicciolo", category: "SM" },
        { dateStr: "23/02/2025", dateObj: new Date("2025-02-23"), type: "Strada", performance: "33:21", city: "Misano Adriatico", category: "SM" },
        { dateStr: "27/02/2022", dateObj: new Date("2022-02-27"), type: "Strada", performance: "33:26", city: "Misano Adriatico", category: "SM" },
        { dateStr: "01/05/2025", dateObj: new Date("2025-05-01"), type: "Strada", performance: "33:38", city: "San Mauro Pascoli", category: "SM" },
        { dateStr: "21/11/2010", dateObj: new Date("2010-11-21"), type: "Strada", performance: "33:38", city: "Santarcangelo Romagna", category: "JM" },
        { dateStr: "24/02/2019", dateObj: new Date("2019-02-24"), type: "Strada", performance: "33:45", city: "Misano Adriatico", category: "SM" },
        { dateStr: "01/05/2019", dateObj: new Date("2019-05-01"), type: "Strada", performance: "33:50", city: "San Mauro Pascoli", category: "SM" },
        { dateStr: "05/03/2017", dateObj: new Date("2017-03-05"), type: "Strada", performance: "34:27", city: "Cesenatico", category: "SM" },
        { dateStr: "18/11/2018", dateObj: new Date("2018-11-18"), type: "Strada", performance: "34:35", city: "Santarcangelo Di Romagna", category: "SM" },
        { dateStr: "13/03/2016", dateObj: new Date("2016-03-13"), type: "Strada", performance: "35:15", city: "Cesenatico", category: "SM" },
        { dateStr: "26/04/2015", dateObj: new Date("2015-04-26"), type: "Strada", performance: "35:23", city: "Forli", category: "SM" },
        { dateStr: "25/10/2020", dateObj: new Date("2020-10-25"), type: "Strada", performance: "35:43", city: "Ancona", category: "SM" },
        { dateStr: "16/11/2014", dateObj: new Date("2014-11-16"), type: "Strada", performance: "36:02", city: "Santarcangelo Romagna", category: "SM" },
        { dateStr: "27/08/2017", dateObj: new Date("2017-08-27"), type: "Strada", performance: "36:35", city: "Santangelo Di Gatteo", category: "SM" },
        { dateStr: "25/02/2018", dateObj: new Date("2018-02-25"), type: "Strada", performance: "36:58", city: "Misano Adriatico", category: "SM" },
        { dateStr: "02/02/2025", dateObj: new Date("2025-02-02"), type: "Strada", performance: "36:59", city: "Serravalle", category: "SM" },
        { dateStr: "01/05/2018", dateObj: new Date("2018-05-01"), type: "Strada", performance: "37:16", city: "San Mauro Pascoli", category: "SM" },
        { dateStr: "28/08/2016", dateObj: new Date("2016-08-28"), type: "Strada", performance: "42:59", city: "Santangelo Di Gatteo", category: "SM" }
      ],
      "MARATONINA": [
        { dateStr: "09/10/2022", dateObj: new Date("2022-10-09"), type: "Strada", performance: "1h08:21", city: "Pisa", category: "SM" },
        { dateStr: "19/10/2025", dateObj: new Date("2025-10-19"), type: "Strada", performance: "1h09:01", city: "Cremona", category: "SM" },
        { dateStr: "12/11/2023", dateObj: new Date("2023-11-12"), type: "Strada", performance: "1h09:11", city: "Crema", category: "SM" },
        { dateStr: "05/03/2023", dateObj: new Date("2023-03-05"), type: "Strada", performance: "1h09:11", city: "Roma", category: "SM" },
        { dateStr: "11/09/2022", dateObj: new Date("2022-09-11"), type: "Strada", performance: "1h10:03", city: "Cesenatico", category: "SM" },
        { dateStr: "11/10/2020", dateObj: new Date("2020-10-11"), type: "Strada", performance: "1h10:11", city: "Pisa", category: "SM" },
        { dateStr: "13/04/2025", dateObj: new Date("2025-04-13"), type: "Strada", performance: "1h10:11", city: "Rimini", category: "SM" },
        { dateStr: "26/10/2025", dateObj: new Date("2025-10-26"), type: "Strada", performance: "1h10:11", city: "Venezia", category: "SM" },
        { dateStr: "10/04/2022", dateObj: new Date("2022-04-10"), type: "Strada", performance: "1h10:12", city: "San Benedetto Del Tronto", category: "SM" },
        { dateStr: "10/09/2023", dateObj: new Date("2023-09-10"), type: "Strada", performance: "1h10:17", city: "Cesenatico", category: "SM" },
        { dateStr: "14/04/2024", dateObj: new Date("2024-04-14"), type: "Strada", performance: "1h10:19", city: "Rimini", category: "SM" },
        { dateStr: "27/11/2022", dateObj: new Date("2022-11-27"), type: "Strada", performance: "1h10:22", city: "Grottammare", category: "SM" },
        { dateStr: "14/01/2024", dateObj: new Date("2024-01-14"), type: "Strada", performance: "1h10:33", city: "Terni", category: "SM" },
        { dateStr: "06/05/2023", dateObj: new Date("2023-05-06"), type: "Strada", performance: "1h10:40", city: "Comacchio", category: "SM" },
        { dateStr: "27/05/2023", dateObj: new Date("2023-05-27"), type: "Strada", performance: "1h10:40", city: "Bellaria-igea Marina", category: "SM" },
        { dateStr: "03/10/2021", dateObj: new Date("2021-10-03"), type: "Strada", performance: "1h10:57", city: "Forli", category: "SM" },
        { dateStr: "23/03/2025", dateObj: new Date("2025-03-23"), type: "Strada", performance: "1h11:06", city: "Fossombrone", category: "SM" },
        { dateStr: "24/03/2024", dateObj: new Date("2024-03-24"), type: "Strada", performance: "1h11:11", city: "Fossombrone", category: "SM" },
        { dateStr: "23/10/2022", dateObj: new Date("2022-10-23"), type: "Strada", performance: "1h11:12", city: "Forli'", category: "SM" },
        { dateStr: "18/12/2022", dateObj: new Date("2022-12-18"), type: "Strada", performance: "1h11:16", city: "Bastia Umbra", category: "SM" },
        { dateStr: "01/03/2026", dateObj: new Date("2026-03-01"), type: "Strada", performance: "1h11:18", city: "Bologna", category: "SM35" },
        { dateStr: "12/09/2021", dateObj: new Date("2021-09-12"), type: "Strada", performance: "1h11:22", city: "Cesenatico", category: "SM" },
        { dateStr: "05/10/2025", dateObj: new Date("2025-10-05"), type: "Strada", performance: "1h11:26", city: "Forli'", category: "SM" },
        { dateStr: "09/05/2021", dateObj: new Date("2021-05-09"), type: "Strada", performance: "1h11:35", city: "Orzinuovi", category: "SM" },
        { dateStr: "03/12/2023", dateObj: new Date("2023-12-03"), type: "Strada", performance: "1h11:37", city: "Cagliari", category: "SM" },
        { dateStr: "28/05/2022", dateObj: new Date("2022-05-28"), type: "Strada", performance: "1h11:45", city: "Bellaria Igea Marina", category: "SM" },
        { dateStr: "17/05/2026", dateObj: new Date("2026-05-17"), type: "Strada", performance: "1h11:52", city: "Mondolfo", category: "SM35" },
        { dateStr: "07/05/2022", dateObj: new Date("2022-05-07"), type: "Strada", performance: "1h12:02", city: "Comacchio", category: "SM" },
        { dateStr: "05/05/2024", dateObj: new Date("2024-05-05"), type: "Strada", performance: "1h12:20", city: "Olbia", category: "SM" },
        { dateStr: "29/03/2026", dateObj: new Date("2026-03-29"), type: "Strada", performance: "1h12:20", city: "Fossombrone", category: "SM35" },
        { dateStr: "15/01/2023", dateObj: new Date("2023-01-15"), type: "Strada", performance: "1h12:27", city: "Terni", category: "SM" },
        { dateStr: "07/04/2024", dateObj: new Date("2024-04-07"), type: "Strada", performance: "1h12:42", city: "San Benedetto Del Tronto", category: "SM" },
        { dateStr: "09/03/2025", dateObj: new Date("2025-03-09"), type: "Strada", performance: "1h12:44", city: "Civitanova Marche", category: "SM" },
        { dateStr: "21/09/2025", dateObj: new Date("2025-09-21"), type: "Strada", performance: "1h12:57", city: "Porto San Giorgio", category: "SM" },
        { dateStr: "20/10/2019", dateObj: new Date("2019-10-20"), type: "Pista", performance: "1h12:59", city: "Foligno", category: "SM" },
        { dateStr: "27/04/2025", dateObj: new Date("2025-04-27"), type: "Strada", performance: "1h13:02", city: "Numana", category: "SM" },
        { dateStr: "17/03/2019", dateObj: new Date("2019-03-17"), type: "Strada", performance: "1h13:41", city: "Vittorio Veneto", category: "SM" },
        { dateStr: "12/05/2019", dateObj: new Date("2019-05-12"), type: "Strada", performance: "1h14:11", city: "Bellaria-igea Marina", category: "SM" },
        { dateStr: "13/02/2011", dateObj: new Date("2011-02-13"), type: "Strada", performance: "1h14:15", city: "Fusignano", category: "PM" },
        { dateStr: "25/01/2026", dateObj: new Date("2026-01-25"), type: "Strada", performance: "1h14:28", city: "Faenza", category: "SM35" },
        { dateStr: "06/03/2011", dateObj: new Date("2011-03-06"), type: "Strada", performance: "1h14:35", city: "Ravenna", category: "PM" },
        { dateStr: "01/06/2024", dateObj: new Date("2024-06-01"), type: "Strada", performance: "1h15:01", city: "Bellaria-igea Marina", category: "SM" },
        { dateStr: "08/02/2015", dateObj: new Date("2015-02-08"), type: "Strada", performance: "1h15:09", city: "Fusignano", category: "SM" },
        { dateStr: "04/05/2025", dateObj: new Date("2025-05-04"), type: "Strada", performance: "1h16:01", city: "Mondolfo", category: "SM" },
        { dateStr: "06/04/2025", dateObj: new Date("2025-04-06"), type: "Strada", performance: "1h18:27", city: "Mondolfo", category: "SM" },
        { dateStr: "27/09/2015", dateObj: new Date("2015-09-27"), type: "Strada", performance: "1h18:39", city: "Isola Di Albarella", category: "SM" },
        { dateStr: "21/10/2018", dateObj: new Date("2018-10-21"), type: "Strada", performance: "1h18:53", city: "Foligno", category: "SM" },
        { dateStr: "08/05/2016", dateObj: new Date("2016-05-08"), type: "Strada", performance: "1h19:11", city: "Bellaria", category: "SM" },
        { dateStr: "10/05/2015", dateObj: new Date("2015-05-10"), type: "Strada", performance: "1h20:28", city: "Bellaria Igea Marina", category: "SM" },
        { dateStr: "02/06/2015", dateObj: new Date("2015-06-02"), type: "Strada", performance: "1h20:44", city: "Novafeltria", category: "SM" },
        { dateStr: "09/05/2010", dateObj: new Date("2010-05-09"), type: "Strada", performance: "1h21:39", city: "Bellaria", category: "JM" },
        { dateStr: "02/06/2016", dateObj: new Date("2016-06-02"), type: "Strada", performance: "1h23:24", city: "Novafeltria", category: "SM" },
        { dateStr: "14/02/2016", dateObj: new Date("2016-02-14"), type: "Strada", performance: "1h28:49", city: "Fusignano", category: "SM" },
        { dateStr: "14/05/2017", dateObj: new Date("2017-05-14"), type: "Strada", performance: "1h32:02", city: "Bellaria - Igea Marina", category: "SM" },
        { dateStr: "12/04/2026", dateObj: new Date("2026-04-12"), type: "Strada", performance: "1h34:38", city: "San Benedetto Del Tronto", category: "SM35" }
      ],
      "MARATONA": [
        { dateStr: "19/03/2023", dateObj: new Date("2023-03-19"), type: "Strada", performance: "2h26:40", city: "Roma", category: "SM" },
        { dateStr: "26/11/2023", dateObj: new Date("2023-11-26"), type: "Strada", performance: "2h27:41", city: "Firenze", category: "SM" },
        { dateStr: "20/03/2022", dateObj: new Date("2022-03-20"), type: "Strada", performance: "2h29:16", city: "Rimini", category: "SM" },
        { dateStr: "06/02/2022", dateObj: new Date("2022-02-06"), type: "Strada", performance: "2h33:26", city: "Terni", category: "SM" },
        { dateStr: "18/01/2026", dateObj: new Date("2026-01-18"), type: "Strada", performance: "2h34:59", city: "Ragusa", category: "SM35" },
        { dateStr: "19/02/2023", dateObj: new Date("2023-02-19"), type: "Strada", performance: "2h36:00", city: "Carrara", category: "SM" },
        { dateStr: "04/02/2024", dateObj: new Date("2024-02-04"), type: "Strada", performance: "2h36:03", city: "San Felice Circeo", category: "SM" },
        { dateStr: "03/05/2026", dateObj: new Date("2026-05-03"), type: "Strada", performance: "2h36:50", city: "Terre Roveresche", category: "SM35" },
        { dateStr: "31/03/2019", dateObj: new Date("2019-03-31"), type: "Strada", performance: "2h37:17", city: "Rimini", category: "SM" },
        { dateStr: "01/02/2026", dateObj: new Date("2026-02-01"), type: "Strada", performance: "2h37:58", city: "San Felice Circeo", category: "SM35" },
        { dateStr: "29/10/2023", dateObj: new Date("2023-10-29"), type: "Strada", performance: "2h38:34", city: "Aquileia", category: "SM" },
        { dateStr: "15/09/2019", dateObj: new Date("2019-09-15"), type: "Strada", performance: "2h39:45", city: "Cesenatico", category: "SM" }
      ],
      "SALTO IN ALTO": [
        { dateStr: "01/10/2006", dateObj: new Date("2006-10-01"), type: "Pista", performance: "1.55", city: "Ravenna", category: "CM" },
        { dateStr: "28/05/2006", dateObj: new Date("2006-05-28"), type: "Pista", performance: "1.40", city: "Marina Di Ravenna", category: "CM" }
      ],
      "SALTO IN LUNGO": [
        { dateStr: "01/10/2006", dateObj: new Date("2006-10-01"), type: "Pista", performance: "4.77", city: "Ravenna", category: "CM" },
        { dateStr: "20/05/2006", dateObj: new Date("2006-05-20"), type: "Pista", performance: "4.76", city: "San Giovanni In Marignano", category: "CM" },
        { dateStr: "25/04/2006", dateObj: new Date("2006-04-25"), type: "Pista", performance: "4.65", city: "Bologna", category: "CM" },
        { dateStr: "15/01/2006", dateObj: new Date("2006-01-15"), type: "Indoor", performance: "4.45", city: "Cesenatico", category: "CM" },
        { dateStr: "02/09/2006", dateObj: new Date("2006-09-02"), type: "Pista", performance: "4.44", city: "Bellaria", category: "CM" },
        { dateStr: "28/05/2006", dateObj: new Date("2006-05-28"), type: "Pista", performance: "4.23", city: "Marina Di Ravenna", category: "CM" },
        { dateStr: "13/02/2005", dateObj: new Date("2005-02-13"), type: "Indoor", performance: "4.01", city: "Cesenatico", category: "CM" }
      ],
      "SALTO TRIPLO": [
        { dateStr: "26/07/2006", dateObj: new Date("2006-07-26"), type: "Pista", performance: "10.08", city: "Rimini", category: "CM" }
      ],
      "100 OSTACOLI": [
        { dateStr: "28/05/2006", dateObj: new Date("2006-05-28"), type: "Pista", performance: "17.8", city: "Marina Di Ravenna", category: "CM" },
        { dateStr: "01/10/2006", dateObj: new Date("2006-10-01"), type: "Pista", performance: "18.39", city: "Ravenna", category: "CM" }
      ],
      "PENTATHLON": [
        { dateStr: "01/10/2006", dateObj: new Date("2006-10-01"), type: "Pista", performance: "2460", city: "Ravenna", category: "CM" },
        { dateStr: "28/05/2006", dateObj: new Date("2006-05-28"), type: "Pista", performance: "2037", city: "Marina Di Ravenna", category: "CM" }
      ]
    }
  }
];