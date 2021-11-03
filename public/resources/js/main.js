/*
1. seleziono i nodi HTML che mi servono
2. creo una funzione per generare quadrati a seconda della difficoltà del livello
    2.1 scrivo una funzione a cui passo un parametro number a cui dovrà corrispondere il valore estrapolato dal button cliccato
    2.2 creo un ciclo for che si dovrà ripetere tante volte quanto il valore del button cliccato
    2.3 nel ciclo creo un nuovo div ed un nuovo span
    2.4 aggiungo il nuovo span al nuovo div ed il nuovo div al contenitore del gioco
        2.4.1 a seconda del valore passato alla funzione, associo al div la relativa classe in modo che i quadrati siano tutti in ordine
    2.5 assegno un evento click ad ogni quadrato
3. ad ogni button di livello assegno un evento click, e chiamo la funzione che genera i quadratini passandole come parametro il valore corrispondente al button cliccato trasformato in numero
*/

/*
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
(come detto sull’effetiva interfaccia fate voi, non ci son specifiche vincolanti, ma partite semplici)
La partita termina quando il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato un quadratino con un numero consentito. (quindi se ci pensate dovrete tenere traccia del punteggio).
*/

// DOM elements
const buttonContainer = document.getElementById('buttons');
const gameContainer = document.getElementById('game');
const squareContainer = document.querySelector('.container-square');
const levelButtons = document.querySelectorAll('button');

// global variables


// generates squares according to the value of the button clicked
// adds click event to each square generated
const generateSquares = (number) => {
    let arrBombs = generateBombs(number);
    let newSquares = [];
    let onlyBombs = [];
    console.log('arrBombs in function', arrBombs);
    for (let i = 1; i <= number; i++) {
        let newDiv = document.createElement('div');
        let newSpan = document.createElement('span');
        newSpan.append(i);
        newSpan.classList.add('hidden');
        newDiv.append(newSpan);
        newDiv.classList.add('square');
        
        if (number === 81) {
            newDiv.classList.add('square-nine');
        } else if (number === 49) {
            newDiv.classList.add('square-seven');
        }

        if (arrBombs.includes(i)) {
            onlyBombs.push(newDiv);
            newSquares.push(newDiv);
        } else {
            newSquares.push(newDiv);
        }

        squareContainer.append(newDiv);
    }

    newSquares.forEach(function(n) {
        n.addEventListener('click', function() {
            if (onlyBombs.includes(n)) {
                onlyBombs.forEach(function(x) {
                    x.classList.add('bomb');
                    x.children[0].classList.remove('hidden');
                });
            } else {
                n.classList.add('clicked-true');
                n.children[0].classList.remove('hidden');
            } 
        });
    });
}

// generates bombs
const generateBombs = (range) => {
    let arrBombs = [];
    for (let i = 1; arrBombs.length < 16; i++) {
        const bomb = Math.floor(Math.random() * range) + 1;
        if (!arrBombs.includes(bomb)) {
            arrBombs.push(bomb);
        }
    }
    console.log(arrBombs);
    return arrBombs;
}

// adds click event to each button
levelButtons.forEach(function(n) {
    n.addEventListener('click', 
        function() {
            generateSquares(Number(n.value));
            gameContainer.classList.remove('hidden');
            buttonContainer.classList.add('hidden');
        }
    )
});