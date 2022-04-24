# animal-house-unibo-website
 A website for a project of web tecnologies.

## Eseguire il server
Abbiamo tre container da eseguire:
- Il container di node con express (per il backend), porta `3001`
- Il container di React, porta `3000`
- Il container di vue, porta `3002`

Per runnarli, su tre terminali diversi:

Runnare React
```bash
cd client
npm start
```

Runnare Vue
```bash
cd client-vue
npm run dev
```

Runnare backend node
```bash
npm start
```

## TODOS

- [ ]
- [ ]

## Note implementative

## Cose da fare


## Appunti iniziali
Colori (per ora):
- foreground: #f6efee
- background: #004A33
- secondary: #FE2F20
- on hover change opacity.

Tecnologie utilizzate:
- Backend
  - Node
  - MongoDB
- Frontend
    - Stili: Bootstrap
    - Framework front: JQuery, React, Vue

- Game app
  - Curiosita' sugli animali come i miei
  - Curiosita' sugli animali in generale
  - Informazioni utili sanitarie e legali
  - Video buffi ed interessanti da Youtube
  - Quiz
  - ~ Memory
  - ~ Impiccato
  - ~ Scova le differenze
- Front office
  - Servizi di comunita'
    - Leaderboard dei giochi
    - bacheca eccolo qua
    - ~ bacheca cerco partner
    - ~ bacheca aiutatemi
  - e-commerce
    - catalogo di prodotti
      - cibo
      - prodotti sanitari
      - accessoristica
      - ~ cuccioli
  - Servizi in presenza
    - Veterinario
    - Dog sitter
    - ~ Toelettatura
    - ~ Pensione estiva
    - ~ psicologo
    - ~ visita a domicilio per animali soli
  - ~Servizi online
    - ~ Videoconferenza con l'esperto
    - ~ Videoconferenza con il veterinario
    - ~ Videoconferenza con l'animale in ospedale o pensione
- Back office
  - Anagrafica Clienti
    - Registrazione
    - Login
    - Cambio password
    - Reset password
    - Cancellazione
    - Preferenze e animali preferiti
    - Punteggio giochi
  - Servizi di comunita'
    - Controllare o cancellare messaggi nelle bacheche
  - Gestione e-commerce
    - Aggiungere e togliere prodotti, prezzi, descrizioni.
    - ~ Sottocategorie dei prodotti
    - Immagini dei prodotti (~ con upload)
  - Servizi in presenza
    - Prenotare servizi, modificare o cancellare prenotazioni, visualizzare disponibilita'.
    - Calendari separati dei servizi.
  - ~ Servizi online
    - ~ Prenotare servizi, modificare o cancellare prenotazioni, visualizzare disponibilita'.
