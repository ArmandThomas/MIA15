# MIA15

## Structure du projet

- **apps/api** : Backend Express
- **apps/web** : Frontend React
- **packages/data** : Nettoyage et migration vers SQL
- **packages/dl** : Modèles Deep Learning
- **packages/ml** : Modèles Machine Learning
- **packages/scraping** : Script de scraping des images des athlètes depuis l'URL olympics.com

## Installation des applications

### Prérequis
- Version 20.12 LTS Nodejs
- Assurez-vous d'avoir installé Docker et Docker Compose.
- [pnpm](https://pnpm.io/installation)

### Étapes d'installation

1. **Copier les variables d'environnement**  
   Copiez le fichier `.env.example` vers `.env` dans le répertoire `apps/api`.

2. **Installer les dépendances**  
   Exécutez la commande suivante à la racine du projet pour installer toutes les dépendances :
   ```sh
   pnpm install
   ```

3. **Lancer Docker Compose**  
   Pour démarrer tous les services nécessaires, exécutez :
   ```sh
   docker-compose up
   ```

4. **Migrer les données nettoyées vers la base de données**  
   Exécutez le script suivant pour importer les données :
   ```sh
   ./script/import-database.sh
   ```

## Installation des scripts Python

### Prérequis
- Python 3.x

### Étapes d'installation

1. **Créer un environnement virtuel** (si nécessaire)
   ```sh
   python -m venv env
   source env/bin/activate  # Pour Windows: env\Scripts\activate
   ```

2. **Installer les librairies nécessaires**
   ```sh
   pip install pandas lxml openpyxl
   ```

## Liste des scripts

- **Script de traitement de données** : `packages/data/process-imports.ipynb`
- **Script de transformation des données nettoyées vers SQL** : `packages/data/convert-exports.ipynb`

## Commandes de base

- **Lancer le frontend**
  ```sh
  pnpm run dev:web
  ```

- **Lancer le backend**
  ```sh
  pnpm run dev:api
  ```

- **Lancer le frontend et le backend**
  ```sh
  pnpm run dev
  ```

## Liens

 - [Trello](https://trello.com/b/68HGIvBZ/hackathon-mia15)
 - [Webapp](https://thankful-ground-0b1871503.5.azurestaticapps.net/)
 - [Support de présentation](https://testipformation.sharepoint.com/:p:/s/MIA15-HACKATHON2024/ETUtBxDzEx5GrVXmsuSB-GMBJ3LuJde8jZwNrO14O3ohhA?e=XkuOkZ)