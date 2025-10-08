// 1. Références aux éléments de la page
const scoreDisplay = document.getElementById('score-display');
const rewardDisplay = document.getElementById('reward-display');
const btnThrow = document.getElementById('btn-throw');
const btnStop = document.getElementById('btn-stop');
const btnNewGame = document.getElementById('btn-new-game');

const API_URL = 'http://127.0.0.1:5000';

// 2. Fonction pour mettre à jour l'affichage
function updateUI(data) {
    scoreDisplay.textContent = data.score;
    rewardDisplay.textContent = data.reward;
    // Si la partie est finie, on désactive les boutons de jeu
    if (data.game_over) {
        btnThrow.disabled = true;
        btnStop.disabled = true;
    } else {
        btnThrow.disabled = false;
        btnStop.disabled = false;
    }
}

// 3. Fonction pour envoyer une action au serveur
async function sendAction(action) {
    try {
        const response = await fetch(`${API_URL}/action`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: action }) // On envoie "throw" ou "stop"
        });
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error("Erreur de communication avec le serveur:", error);
        alert("Impossible de contacter le serveur. Est-ce que app.py est bien lancé ?");
    }
}

// 4. On connecte les boutons aux fonctions
btnThrow.addEventListener('click', () => sendAction('throw'));
btnStop.addEventListener('click', () => sendAction('stop'));
btnNewGame.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/new_game`, { method: 'POST' });
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error("Erreur de communication:", error);
    }
});

// 5. On lance une nouvelle partie dès que la page est prête
// L'attribut 'defer' dans le HTML remplace le besoin de 'DOMContentLoaded' ici.
// Le script s'exécutera une fois la page chargée.
btnNewGame.click();