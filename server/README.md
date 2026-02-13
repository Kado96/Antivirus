# Déploiement du Serveur sur Render.com

Ce guide explique comment héberger la partie Backend (serveur) de l'application Kaspersky Secure Pay sur [Render](https://render.com).

## 🏗️ Configuration de l'Architecture
- **Type de service** : Web Service
- **Runtime** : Node.js
- **Région** : Choisissez celle la plus proche de vos utilisateurs (ex: Frankfurt).

## 🚀 Étapes de Déploiement

1. **GitHub** : Poussez votre code sur un dépôt GitHub.
2. **Nouveau Web Service** : Sur Render, créez un nouveau "Web Service" et liez votre dépôt.
3. **Paramètres de Build** :
   - **Root Directory** : `server`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start` (ou `node index.js`)

## 🔑 Variables d'Environnement (Environment)
Ajoutez les variables suivantes dans l'onglet **Environment** sur Render :

| Clé | Valeur suggérée | Description |
| :--- | :--- | :--- |
| `PORT` | `10000` | Port utilisé par Render (automatique si non défini). |
| `EMAIL_USER` | `votre-email@gmail.com` | Email pour l'envoi des notifications. |
| `EMAIL_PASS` | `votre-mot-de-passe-app` | Mot de passe d'application (App Password). |

## ⚠️ Notes Importantes
- Assurez-vous que le fichier `server/index.js` écoute sur `process.env.PORT || 5001`.
- Le serveur utilise `cors`. Vérifiez que l'URL de votre frontend est autorisée si vous passez en production.

---

## 🐙 Comment pousser votre code sur GitHub

Si vous n'avez pas encore envoyé votre code sur GitHub, suivez ces commandes depuis la racine du projet :

1. **Initialisation (si ce n'est pas déjà fait)** :
   ```bash
   git init
   ```

2. **Ajouter les fichiers** :
   ```bash
   git add .
   ```

3. **Valider les changements** :
   ```bash
   git commit -m "Préparation pour le déploiement sur Render"
   ```

4. **Lier à votre dépôt distant** (remplacez l'URL) :
   ```bash
   git remote add origin https://github.com/VOTRE_PSEUDO/VOTRE_DEPOT.git
   ```

5. **Pousser sur la branche principale** :
   ```bash
   git branch -M main
   git push -u origin main
   ```

> [!TIP]
> Si vous faites des modifications plus tard, utilisez simplement `git add .`, `git commit -m "votre message"` puis `git push`.

---
*Généré par l'équipe Antigravity (Agent Développeur)*
