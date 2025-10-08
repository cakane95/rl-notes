# Introduction

Ce livre numérique est mon carnet de bord personnel dans l'étude de l'apprentissage par renforcement, ou ***Reinforcement Learning (RL)*** en anglais, un sujet central de ma thèse de doctorat. Il est volontairement rédigé en français et propose, autant que possible, des exemples et des illustrations culturellement pertinents dans un contexte sénégalais et ouest-africain plus largement. En effet, à travers mes recherches sur le RL, je me suis rendu compte du manque de sources francophones accessibles et digestes sur le sujet. Une source principale que je recommande aux lecteurs est l'excellent cours de Philippe Preux, qui sert de guide théorique principal à mon apprentissage {cite}`preux2024rl`.

## Objectif

Mon objectif principal est de solidifier ma compréhension en appliquant le principe : **apprendre en implémentant**.

Chaque section de ce carnet correspond à un concept clé et s'accompagne d'une application web interactive simple, développée en Python avec le framework Flask. Cette approche me permet de visualiser et de tester directement les algorithmes et les idées théoriques.

## Le Cours de Référence

La majeure partie de ce projet est basée sur les notes de cours de Philippe Preux {cite}`preux2024rl`.

## Structure du Carnet

Ce carnet est organisé pour suivre la progression du cours. Chaque chapitre abordera un nouveau concept et sera généralement structuré comme suit :

1.  **Notes Théoriques** : Un résumé des points clés, des définitions et des algorithmes.
2.  **Implémentation Pratique** : Un lien vers une application web dédiée qui met en œuvre le concept étudié.

## Lancer les Applications

Les applications pratiques sont des serveurs web indépendants. Pour qu'un lien vers une application fonctionne, vous devez d'abord lancer le serveur correspondant depuis un terminal.

Par exemple, pour le jeu du dé :

```bash
# Se placer dans le bon dossier
cd flask_apps/jeu21

# Lancer le serveur Python
python app.py
```

Une fois le serveur démarré, le lien dans le chapitre correspondant deviendra fonctionnel.

```{tableofcontents}
```