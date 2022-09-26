# animal-house

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

### CONVENTIONS

- Camel case for file names and directory, and pascal case for component names
- Directory structure
  - examplesDir
    - vue
      - exampleComponent.vue
    - react
      - wowComponent.jsx

# Old readme

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


## Domande da fare al prof

- Cosa e' la bacheca "eccolo qua"?

- In cosa deve consistere la bachecha "aiutatemi"? chi deve avere la possibilita' di rispondere
alle richieste d'aiuto? chi puo vedere le richieste d'aiuto? le risposte devono essere pubbliche?
puo avvenire una conversazione intera (quindi botta e risposta) tra aiutante e aiutato?

- Come possiamo fare la leaderboard dei giochi se ha detto che nei giochi non vuole che utilizziamo il database?

- Nel back office, che cosa si intende con registrazione e login nella sezione di anagrafica clienti?



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
      - ~ cuccioli (NON LO FACCIAMO PER NESSUN MOTIVO)
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


database:
- Utenti
  - Nome
  - password
  - Tipo ("azienda", "privato")
- Animali
  - Utente
  - Nome
  - razza
  - Eta
  - peso
- Post
  - Nome
  - Testo
  - id
  - risposta (0 = no, numero = id a cui sta rispondendo)
