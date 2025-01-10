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
- Python 3.10.12 ou une version compatible pour exécuter le backend localement.
- Node.js pour développer ou tester le frontend en mode développement.

---

## Configuration

### Étape 1 : Configurer le backend

1. Copiez le fichier d'exemple `.env` :
   ```bash
   cp /backend/.env.example /backend/.env
   ```


### Étape 2 : Builder le docker
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

  Pour mettre tous les requirements python dans le bon ficheir et tout rebuild :
  ```bash
  sudo ./build_assets_force.sh
  ```

  Pour run les différents serveurs avec une conf nginx deja installé idoine
  ```bash
  ./manage.sh start/stop
  ```