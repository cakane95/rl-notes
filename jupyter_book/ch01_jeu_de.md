# Chapitre 1 : Les Problèmes de Décision de Markov (PDM)

## Une partie de Ludo pour commencer

Imaginons une partie de Ludo. À chaque tour, vous lancez un dé. Le résultat obtenu vous offre plusieurs options (ou **actions**) :

* Sortir un nouveau pion si vous faites un `6` ;
* Avancer un pion déjà en jeu ;
* Capturer le pion d'un adversaire.

Pour décider du meilleur coup, vous observez la disposition des pions sur le plateau, c'est-à-dire l'**état** actuel du jeu. Le but n'est pas seulement de choisir le coup qui vous fait avancer le plus vite maintenant, mais celui qui maximise vos chances de gagner sur le long terme. Chaque action modifie la configuration du jeu, le faisant passer à un nouvel état (disposition des pions sur le plateau).

```{image} _static/ludo.png
:alt: ludo
:class: bg-transparent mb-1
:width: 300px
:align: center
```

Comme vous pouvez le voir, jouer au Ludo implique une suite de décisions dont les conséquences se mesurent à la fois immédiatement et sur la durée de la partie. Formellement, on parle de **problème de prise de décision séquentielle**. Pour être plus précis, il s'agit d'un problème de décision dans un environnement **incertain**, car vous ne contrôlez ni le résultat du dé, ni les actions de vos adversaires.

---

## L'Apprentissage par Renforcement à la rescousse

C'est exactement ce type de problème que l'apprentissage par renforcement (RL) cherche à résoudre. L'objectif est qu'un **agent** (ici, le joueur de Ludo) apprenne une stratégie ou politique, c'est-à-dire une manière de se comporter, pour atteindre son but (gagner la partie).

Pour modéliser formellement ce genre de situation, le RL s'appuie sur un outil mathématique fondamental : les **Processus Décisionnels de Markov**, ou *Markov Decision Processes (MDPs)* en anglais.

Dans ce chapitre, nous allons détailler les composantes d'un PDM en nous aidant d'un jeu plus simple : le "21 avec un dé".

```{tip}
Pour bien saisir les concepts qui suivront, nous vous invitons à tester le jeu dès maintenant.

<a href="https://www.google.com/url?sa=E&source=gmail&q=http://127.0.0.1:5000" target="_blank" rel="noopener noreferrer">➡️ Jouer au "21 avec un dé"</a>
```

## Les Problèmes de Décision de Markov (PDM) : 4 Pilliers

Maintenant que vous avez testé le jeu, analysons-le de façon intuitive. Pour rappel, le principe du jeu est simple :

```{note}
On joue avec un dé normal à 6 faces, numérotées de 1 à 6. On le lance et il retombe ; on note le numéro sur la face supérieure ; on le relance et on ajoute le nouveau numéro de la face supérieure ; et ainsi de suite : **il ne faut pas dépasser 21**. Avant chaque lancer, on décide de lancer à nouveau le dé ou de s’arrêter. Si on s’arrête, notre performance est le score final ; si celui-ci dépasse **21**, le score final est de **-1000**. Le but est de faire un score final maximal.
```

Nous pouvons décomposer le jeu en plusieurs éléments principaux :

- **Des instants de decision (t) :** Ce sont les moments où nous devons choisir une action, comme au tout début de la partie ou après un lancer de dé.
- **L'etat du jeu (s) :** C'est l'information cruciale dont nous disposons pour prendre notre décision. Pour un joueur rationnel, la seule information qui compte vraiment est **son score actuel**. Savoir si son score est de 12 ou de 19 change radicalement la décision à prendre. Le score est donc l'état du jeu.
- **Des actions possibles (a) :** À chaque instant de décision, les choix sont limités et clairs. On peut soit <span style="background-color:#42b72a; color:white; padding: 2px 6px; border-radius: 4px; font-family: monospace;">lancer</span> le dé à nouveau, soit <span style="background-color:#fa3e3e; color:white; padding: 2px 6px; border-radius: 4px; font-family: monospace;">arrêter</span> la partie pour valider son score.
- **L'évolution de l'état (P) :** C'est la "règle du jeu". Si on est dans l'état `score = 5` et qu'on choisit l'action <span style="background-color:#42b72a; color:white; padding: 2px 6px; border-radius: 4px; font-family: monospace;">lancer</span>, l'état suivant sera l'un des scores {6, 7, 8, 9, 10, 11}, chacun avec une probabilité de 1/6. Si on choisit d'arrêter, le jeu se termine. Dans l'exemple ci-dessous, on voit qu'à partir de l'état `score = 5` et après avoir choisi l'action <span style="background-color:#42b72a; color:white; padding: 2px 6px; border-radius: 4px; font-family: monospace;">lancer</span>, on arrive ou **transitionne** vers l'état `score = 9`.

```{image} _static/dice21_transition.png
:alt: transition
:class: bg-transparent mb-1
:width: 600px
:align: center
```

- **La fonction score (la récompense)** : Chaque action a une conséquence. Dans notre implémentation, un lancer réussi nous donne une récompense égale à la valeur du dé. Si l'on dépasse 21, on reçoit une forte pénalité (-1000). Si l'on s'arrête, la récompense est notre score final.
- **L'objectif** : L'objectif n'est pas juste de faire un bon coup, comme tirer un **6**, mais de se rapprocher autant que possible de **21** pour maximiser le score final sur l'ensemble de la partie.



## Application pratique

Pour illustrer ce concept, j'ai développé une petite application web.

<a href="https://www.google.com/url?sa=E&source=gmail&q=http://127.0.0.1:5000" target="_blank" rel="noopener noreferrer">➡️ Lancer l'application du Jeu du Dé</a>

*(N'oubliez pas de lancer le serveur `app.py` dans un terminal pour que le lien fonctionne !)*