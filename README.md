# Backend Node.js avec TypeScript et Drizzle

Ce projet est un backend Node.js utilisant TypeScript, Express, et Drizzle ORM pour gérer une base de données PostgreSQL.

## Technologies utilisées

**Node.js** avec **TypeScript**
**Express** pour le serveur HTTP
**Drizzle ORM** pour l'interaction avec la base de données
**PostgreSQL** comme base de données
**Winston** pour les logs
**CORS** pour la gestion des requêtes cross-origin

## Structure du projet

```
src/
├── config/         # Configuration (DB, env, migrations)
├── controllers/    # Contrôleurs Express
├── entities/       # Types TypeScript pour les entités
├── middlewares/    # Middlewares Express
├── migrations/     # Migrations de base de données
├── models/         # Modèles de données (couche d'accès aux données)
├── routes/         # Définition des routes
├── schemas/        # Schémas Drizzle
├── types/          # Types TypeScript
├── utils/          # Utilitaires
└── server.ts       # Point d'entrée du serveur
```

## Installation

1. Cloner le projet
2. Installer les dépendances :

    ```bash
    pnpm install
    ```

3. Copier le fichier d'environnement :

    ```bash
    cp env.example .env
    ```

4. Configurer les variables d'environnement dans `.env`

5. Générer les migrations :

    ```bash
    pnpm run generate
    ```

6. Appliquer les migrations :
    ```bash
    pnpm run migrate
    ```

## Scripts disponibles

-   `pnpm dev` : Démarrer en mode développement
-   `pnpm start` : Démarrer en production
-   `pnpm run generate` : Générer les migrations
-   `pnpm run migrate` : Appliquer les migrations
-   `pnpm run studio` : Ouvrir Drizzle Studio

## Entités

-   **Users** : Gestion des utilisateurs
-   **Posts** : Articles/posts du blog
-   **Comments** : Commentaires sur les posts
