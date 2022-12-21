# animal-house

A website for a project of web tecnologies.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Open enviroment

```sh
npm run env
```

This will open two new terminal emulator , one with server console and the other
with fronted console, it will also start mongodb 
So just run this command and start developing

<!-- TODO: Explain how to deploy the project -->

## Conventions

- Camel case for file names and directory, and pascal case for component names
- Directory structure
  - examplesDir
    - vue
      - ExampleComponent.vue
    - react
      - WowComponent.jsx

## Technologies used

> Backend: NodeJs, EJS

> Database: MongoDB

> Frontend: React, Vue, JQuery, Bootstrap

## Todo list

- [ ] Game app
  - [ ] Curiosita' sugli animali come i miei
  - [ ] Curiosita' sugli animali in generale
  - [ ] Informazioni utili sanitarie e legali
  - [x] Video buffi ed interessanti da Youtube
  - [ ] Quiz #Ale
  - [x] OPZIONALE: Memory
  - [x] OPZIONALE: Impiccato
  - [x] OPZIONALE: Scova le differenze
- [x] Servizi di comunita' #Ale
  - [x] Leaderboard dei giochi #Ale
  - [x] bacheca eccolo qua #Ale
  - [x] OPZIONALE: bacheca cerco partner #Ale
  - [x] OPZIONALE: bacheca aiutatemi #Ale
- [x] e-commerce #Yonas
  - [x] catalogo di prodotti #Yonas
    - [x] cibo #Yonas
    - [x] prodotti sanitari #Yonas
    - [x] accessoristica #Yonas
    - [ ] OPZIONALE: cuccioli (NON LO FACCIAMO PER NESSUN MOTIVO)
- [x] Servizi in presenza #Gian
  - [X] Veterinario #Gian
  - [X] Dog sitter #Gian
  - [x] OPZIONALE: Toelettatura #Gian
  - [x] OPZIONALE: Pensione estiva #Gian
  - [x] OPZIONALE: psicologo #Gian
  - [x] OPZIONALE: visita a domicilio per animali soli #Gian
- [ ] OPZIONALE: Servizi online
  - [ ] OPZIONALE: Videoconferenza con l'esperto
  - [ ] OPZIONALE: Videoconferenza con il veterinario
  - [ ] OPZIONALE: Videoconferenza con l'animale in ospedale o pensione
- [ ] Back office
  - [x] Gestione clienti #Ale
    - [x] Anagrafica Clienti #Ale
    - [x] Profilo #Ale
    - [x] Registrazione #Ale
    - [x] Login #Ale
    - [x] Cambio password #Ale
    - [ ] Reset password #Ale (Forse non lo facciamo)
    - [x] Cancellazione #Ale
    - [ ] Preferenze e animali preferiti #Ale
    - [x] Punteggio giochi #Ale
  - [x] Servizi di comunita' #Ale
    - [x] Controllare o cancellare messaggi nelle bacheche #Ale
  - [ ] Gestione e-commerce #Yonas
    - [ ] Aggiungere e togliere prodotti, prezzi, descrizioni. #Yonas
    - [ ] OPZIONALE: Sottocategorie dei prodotti #Yonas
    - [ ] Immagini dei prodotti (OPZIONALE:  con upload) #Yonas
  - [ ] Servizi in presenza #Gian
    - [ ] Prenotare servizi, modificare o cancellare prenotazioni, visualizzare disponibilita'. #Gian
    - [ ] Calendari separati dei servizi. #Gian
    - [ ] OPZIONALE: Servizi online #Gian
    - [ ] OPZIONALE: Prenotare servizi, modificare o cancellare prenotazioni, visualizzare disponibilita'. #Gian


- I giochi non hanno la navbar
- Lo scorrimento della lista di giochi nella homepage non e' responsive (si accavallano le scritte)
- Slider input per numeri cubi non responsive
- Manca homepage per fare routing tra le varie cose, rimuoverei le varie homepage e farei tutto in uno, tipo che nella home puoi spostarti tra giochi, servizi vari e backoffice che non ho ancora capito se volete fare o no visto che a me non serve
- Bacheca cerco partner non responsive e da testare
- Gli endpoint in generale hanno dei path un po' strani, andrebbero uniformati
- Mi e' sembrato di vedere un mischione tra italiano e inglese, va tradotto tutto in inglese
- Offline nella navbar ha un "?", non so perche' quindi se non c'e' motivo lo togliamo
- Order history sfora un po' a destra in visuale da telefono
- Order details sfora un po' a destra in visuale da telefono
