const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Logger pour voir si les requêtes arrivent
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Route racine simple
app.get('/', (req, res) => {
    res.status(200).send('Proxy Backend Kaspersky : OK');
});

// Configuration du transporteur d'email (À remplir par l'utilisateur)
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou autre service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint pour vérifier le statut d'une transaction
app.get('/api/check-status/:transactionId', async (req, res) => {
    const { transactionId } = req.params;

    try {
        const response = await axios.post('https://www.afripay.africa/checkout/index.php', new URLSearchParams({
            'app_id': process.env.AFRIPAY_APP_ID,
            'app_secret': process.env.AFRIPAY_APP_SECRET,
            'client_token': transactionId,
            'action': 'check_status'
        }).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        console.log(`Verification for ${transactionId}:`, response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error checking AfriPay status:", error.message);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

// Endpoint pour envoyer un email en cas de retard ou succès
app.post('/api/notify-payment', async (req, res) => {
    const { email, transactionId, status } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log("Email credentials not configured.");
        return res.status(200).json({ message: "Simulated email sent (Config missing)" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `[Kaspersky] État de votre paiement - ${transactionId}`,
        text: `Bonjour,\n\nNous avons bien reçu votre signalement pour la transaction ${transactionId}. \nStatut actuel : ${status}. \n\nSi le paiement est confirmé, vous recevrez votre lien de téléchargement sous peu.\n\nMerci de votre confiance.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email envoyé' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend proxy running on http://localhost:${PORT}`);
});
