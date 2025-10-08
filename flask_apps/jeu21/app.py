import random
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app)

# Stockage de l'etat du jeu
game_state = {
    "current_score" : 0,
}

# Definition des routes (endpoints)
@app.route('/')
def home():
    # Cette fonction cherche 'index.html' UNIQUEMENT dans le dossier 'templates'
    return render_template('index.html')

#Route pour commencer une nouvelle partie
@app.route('/new_game', methods=["POST"])
def new_game():
    # Retourner au state initial et commencer une nouvelle partie

    #Reinitialiser le score
    game_state["current_score"] = 0

    #Communiquer au browser que tout est pret
    response_data = {
        "message" : "Nouvelle partie prête !",
        "score" : game_state["current_score"],
        "reward" : 0,
        "game_over": False,
    }

    return jsonify(response_data)

#Route pour executer une action
@app.route('/action', methods = ["POST"])
def perform_action():
    # Lancer le de ou arreter le jeu et gere les transitions

    #Recuperr les informations sur l'action ("throw or stop")
    data = request.json
    action = data.get("action")

    #Initialisation
    current_score = game_state["current_score"]
    reward = 0
    game_over = False

    #Logique du jeu: if "throw"
    if action == "throw":
        #Lancer le de
        dice_roll = random.randint(1,6)
        current_score += dice_roll

        if current_score > 21 :
            reward = -1000
            game_over = True

        else:
            reward = dice_roll
    
    elif action == "stop":
        reward = current_score
        game_over = True

    game_state["current_score"] = current_score

    response_data = {
        'message': 'Action realisee',
        'score': current_score,
        'reward': reward,
        'game_over': game_over
    }

    return jsonify(response_data)

# Lancement du serveur
if __name__ == '__main__':
    # debug=True permet de recharger le serveur automatiquement après chaque modification.
    app.run(debug=True, port=5000)