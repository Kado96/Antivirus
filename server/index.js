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

// Endpoint pour envoyer un email en cas de succès ou d'échec
app.post('/api/notify-payment', async (req, res) => {
    const { email, transactionId, status } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log("Email credentials not configured.");
        return res.status(200).json({ message: "Simulated response (Config missing)" });
    }

    const isSuccess = status === 'success' || status === 'completed';
    const downloadUrl = "https://drive.google.com/file/d/1jk5kbmm74K6nf9OYcs03aJ0Zd1-GCY74/view?usp=drive_link";

    const mailOptions = {
        from: `"Kaspersky Burundi" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: isSuccess
            ? `✅ Succès : Votre licence Kaspersky est prête ! (${transactionId})`
            : `⚠️ Problème : État de votre paiement Kaspersky (${transactionId})`,
        html: isSuccess ? `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px;">
                <h2 style="color: #00a884; text-align: center;">Félicitations !</h2>
                <p>Bonjour,</p>
                <p>Nous avons le plaisir de vous informer que votre paiement pour <b>Kaspersky Antivirus</b> a été validé avec succès.</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 5px solid #00a884; margin: 20px 0;">
                    <p style="margin: 0;"><b>ID Transaction :</b> ${transactionId}</p>
                    <p style="margin: 5px 0 0 0;"><b>Produit :</b> Licence 1 an - Multi-appareils</p>
                </div>
                <p>Vous pouvez télécharger votre logiciel en cliquant sur le bouton ci-dessous :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${downloadUrl}" style="background-color: #00a884; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">TÉLÉCHARGER LE LOGICIEL</a>
                </div>
                <p style="font-size: 12px; color: #666;">Si le bouton ne fonctionne pas, copiez ce lien : ${downloadUrl}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 11px; color: #999; text-align: center;">Merci d'avoir choisi le revendeur agréé Kaspersky Burundi.</p>
            </div>
        ` : `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #f44336; border-radius: 10px; padding: 20px;">
                <h2 style="color: #f44336; text-align: center;">Attention : Paiement non complété</h2>
                <p>Bonjour,</p>
                <p>Nous avons bien reçu votre signalement pour la transaction <b>${transactionId}</b>, mais le paiement n'est pas encore confirmé.</p>
                <p><b>Statut actuel :</b> ${status}</p>
                <div style="background-color: #fffde7; padding: 15px; border-radius: 5px; border-left: 5px solid #fbc02d; margin: 20px 0;">
                    <p style="margin: 0;"><b>Conseils :</b></p>
                    <ul style="margin: 10px 0 0 0;">
                        <li>Vérifiez que votre solde Lumicash/Ecocash est suffisant.</li>
                        <li>Assurez-vous d'avoir validé la transaction sur votre téléphone.</li>
                        <li>Réessayez de cliquer sur "Acheter Maintenant" sur le site.</li>
                    </ul>
                </div>
                <p>Si vous avez été débité, n'ayez crainte. Notre support vérifie manuellement les transactions toutes les heures.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 11px; color: #999; text-align: center;">Support Technique - Kaspersky Burundi</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email envoyé avec succès' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend proxy running on http://localhost:${PORT}`);
});
