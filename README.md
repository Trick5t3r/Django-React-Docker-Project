# Projet Django - React (Vite) - Nginx - Docker

Ce projet est une implémentation d'un clone de ChatGPT, en se basant sur le modèle **Mistral**. Il combine un **backend Django** pour l'API, un **frontend React** (utilisant Vite), et une architecture de conteneurisation complète avec **Docker** et **Nginx**.

Ce projet m'a permis de :
- Apprendre à développer une application frontend en React intégrée avec un backend Django.
- Mettre en œuvre la conteneurisation avec Docker, en créant des images personnalisées pour chaque composant.
- Configurer un serveur de production avec Nginx.

---

## Fonctionnalités principales

- **Backend Django** :
  - Gestion des API pour communiquer avec le frontend.
  - Intégration avec le modèle Mistral pour répondre aux requêtes utilisateur.
  - Système de gestion des utilisateurs et des sessions.

- **Frontend React (Vite)** :
  - Interface utilisateur moderne et interactive.
  - Communication avec l'API Django via des appels HTTP.

- **Conteneurisation Docker** :
  - Images distinctes pour le backend, le frontend, et le serveur Nginx.
  - Utilisation de volumes pour gérer les fichiers statiques et médias.

- **Nginx** :
  - Proxy inverse pour servir les fichiers statiques de React et rediriger les requêtes API vers Django.

---

## Prérequis

- **Docker** et **Docker Compose** installés sur votre machine.

---

## Configuration


### Étape 1 : Cloner le projet depuis GitHub

Clonez le dépôt GitHub à l'adresse `XXX` :
   ```bash
   git clone https://github.com/Trick5t3r/Django-React-Docker-Project.git
   cd Django-React-Docker-Project
   ```

### Étape 2 : Configurer le backend

1. Copiez le fichier d'exemple `.env` :
   ```bash
   cp /backend/.env.example /backend/.env
   ```

2. Editer les variables d'environnement pour mettre vos clefs d'API et vos mots de passe du fichier `.env`


### Étape 3 : Builder le docker
  ```bash
  sudo docker-compose up --build -d
  ```

Et voilà le serveur tourne
### Commandes supplémentaires
```bash
  sudo docker-compose down
  ```
  ```bash
  sudo docker ps
  ```

  Pour mettre tous les requirements python dans le bon fichier et tout rebuild :
  ```bash
  sudo ./build_assets_force.sh
  ```

  Pour run les différents serveurs avec une conf nginx deja installé idoine
  ```bash
  ./manage.sh start/stop
  ```

  Pour juste lancer
  ```bash
  sudo docker-compose up
  ```
  et pour run en background
  ```bash
  sudo docker-compose up -d
  ```