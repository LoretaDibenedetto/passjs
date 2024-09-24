console.log("ou");

// Separa le costanti dalla logica di business
const nameInput = document.querySelector("#nameInput");
const surnameInput = document.querySelector("#surnameInput");
const lengthInput = document.querySelector("#lengthInput"); // Input per la lunghezza
const outputPass = document.querySelector("#outputName");
const copyBtn = document.querySelector("#copyBtn"); // Seleziona il pulsante "Copia"

let currentPassword = ""; // Variabile per memorizzare l'ultima password generata

// Seleziona il bottone e aggiungi un event listener 
document.querySelector("#submitBtn").addEventListener("click", handleSubmit);
copyBtn.addEventListener("click", copyPassword);

// Funzione per ottenere un numero intero casuale tra Min e Max (inclusi)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione per generare un carattere speciale casuale
function getRandomSpecialCharacter() {
    const specialCharacters = "123456789ABCDEFGHILMNOPQRSTKJXY!@#$%^&*()_+[]{}|;:,.<>?";
    const randomIndex = getRandomInt(0, specialCharacters.length - 1);
    return specialCharacters[randomIndex];
}

function shuffleString(str) {
    const arr = str.split(""); // Converte la stringa in un array di caratteri
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Ottiene un indice casuale
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Scambia i caratteri
    }
    return arr.join(""); // Ritorna l'array come stringa
}

// Funzione per validare l'input
function validateInput(name, surname) {
    if (!name || !surname) {
        outputPass.textContent = "I campi non possono essere vuoti";
        return false; // Restituisce false se l'input non è valido
    }
    return true; // Restituisce true se l'input è valido
}

// Funzione per ripulire il form
function cleanForm() {
    nameInput.value = "";
    surnameInput.value = "";
    lengthInput.value = 8; // Resetta la lunghezza a un valore di default
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|;:'",.<>?/\\-]).{8,}$/;
    return passwordRegex.test(password);
}

// Funzione che gestisce il submit
function handleSubmit() {
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const length = parseInt(lengthInput.value); // Ottieni la lunghezza desiderata

    if (!validateInput(name, surname)) {
        return;
    }

    // Genera una password base con nome, cognome e un carattere speciale
    currentPassword = `${name}${surname}${getRandomSpecialCharacter()}`;
    
    // Finché la password non è valida, aggiungi un carattere speciale e un numero
    while (!isValidPassword(currentPassword)) {
        currentPassword += getRandomSpecialCharacter();
        currentPassword += getRandomInt(10, 99);
    }

    // Inverti la password generata
    let currentPasswordturn = '';
    for (let i = currentPassword.length - 1; i >= 0; i--) {
        currentPasswordturn += currentPassword[i];
    }

    // Se la password è più lunga della lunghezza richiesta, tagliala
    if (currentPasswordturn.length > length) {
        currentPasswordturn = currentPasswordturn.substring(0, length);
    } 

    // Se la password è più corta della lunghezza richiesta, aggiungi caratteri speciali
    while (currentPasswordturn.length < length) {
        currentPasswordturn += getRandomSpecialCharacter();
    }

    // Aggiorna la variabile globale con la password finale
    currentPassword = currentPasswordturn;
    const shafflepass= shuffleString(currentPassword);
    // Mostra la password generata nell'output
    outputPass.innerHTML = `  <p>La tua password è: <span> ${shafflepass}</span></p>`;

    // Ripulisci il form
    cleanForm();
    
    // Mostra il pulsante "Copia"
    copyBtn.style.display = "block";
}

// Funzione per copiare la password
function copyPassword() {
    if (currentPassword) {
        navigator.clipboard.writeText(currentPassword)
            .then(() => {
                alert("Password copiata negli appunti!");
            })
            .catch(err => {
                console.error("Errore nella copia: ", err);
            });
    } else {
        alert("Genera prima una password!");
    }
}
