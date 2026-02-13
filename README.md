# Kaspersky Secure Pay - Système de Paiement Intégré

Ce projet est une solution complète de vente de logiciels (Kaspersky) intégrant le gateway de paiement **AfriPay** (Lumicash/Ecocash). Il se compose d'un frontend moderne en React et d'un backend proxy sécurisé en Node.js.

## 🏗️ Architecture du Système

Le système fonctionne en deux parties distinctes pour garantir la sécurité et contourner les restrictions CORS des APIs de paiement :

1.  **Frontend (Vite/React)** : Gère l'interface utilisateur premium, la configuration dynamique (Admin) et l'expérience d'achat.
2.  **Backend Proxy (Node.js/Express)** : Sert d'intermédiaire entre le client et l'API AfriPay. Il sécurise vos clés API (`APP_ID`, `APP_SECRET`) et gère les notifications par email via SMTP.

---

## 💻 Fonctionnement en LOCAL

En développement local, vous faites tourner deux serveurs simultanément :

### 1. Le Backend (Sur le port 5001)
- **Rôle** : Reçoit les demandes du frontend, appelle AfriPay, et vérifie les transactions.
- **Lancement** : 
  ```bash
  cd server
  npm install
  node index.js
  ```
- **Configuration** : Fichier `server/.env` contenant vos accès AfriPay et vos paramètres Email.

### 2. Le Frontend (Sur le port 8080 par défaut)
- **Rôle** : Affiche le site. Il communique avec le backend via `http://localhost:5001`.
- **Lancement** :
  ```bash
  npm install
  npm run dev
  ```

---

## 🚀 Fonctionnement en PRODUCTION

En production, le système est conçu pour être déployé sur des plateformes comme **Render.com** ou un serveur **cPanel/VPS**.

### 1. Déploiement du Backend
Le backend doit être déployé sur un serveur Node.js public. 
- L'URL de production sera par exemple : `https://votre-api.onrender.com`
- **Important** : Vous devez mettre à jour les variables d'environnement sur votre hébergeur (ne jamais uploader le fichier `.env`).

### 2. Déploiement du Frontend
Le frontend est "buildé" (compilé) en fichiers statiques (HTML/JS/CSS).
- **Commande** : `npm run build`
- **Lien avec le backend** : Le frontend doit connaître l'URL de votre backend de production. Dans le code, cela se gère via la variable `VITE_API_URL`.

---

## 🔐 Configuration & Panneau Admin

Le système inclut un panneau d'administration (`/admin`) qui vous permet de modifier dynamiquement sans toucher au code :
- Les prix et devises.
- Les textes et titres (Hero, Features, Pricing).
- **Le lien de téléchargement** après paiement.
- **Les instructions Lumicash** étape par étape.

**Accès par défaut** : `donald / donald` (modifiable dans `src/pages/Admin.tsx`).

---

## 🛠️ Variables d'Environnement (.env)

Voici les clés nécessaires dans votre fichier `server/.env` :

```env
PORT=5001
AFRIPAY_APP_ID=votre_id
AFRIPAY_APP_SECRET=votre_secret
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application
```

---

## 📧 Système de Notification
Si un paiement prend plus de 40 secondes à être validé (attente utilisateur), le système envoie automatiquement un email à votre adresse configurée pour vous prévenir qu'une transaction est en cours de finalisation manuelle.

---

**Développé avec ❤️ pour une expérience utilisateur Premium.**
