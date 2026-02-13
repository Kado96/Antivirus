import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useConfig } from "@/context/ConfigContext";

const Download = () => {
  const { config } = useConfig();

  useEffect(() => {
    // Optionnel : auto-redirection vers le lien après 2 secondes
    // const timer = setTimeout(() => {
    //   window.open(config.downloadUrl, "_blank");
    // }, 2000);
    // return () => clearTimeout(timer);
  }, [config.downloadUrl]);

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-card border border-primary/20 rounded-3xl p-8 shadow-card backdrop-blur-sm text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Paiement réussi ✅</h1>
          <p className="text-muted-foreground mb-2">
            Merci pour votre achat. Votre paiement a été confirmé par AfriPay.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour télécharger directement votre logiciel Kaspersky Antivirus.
          </p>
        </div>

        <a
          href={config.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 mb-6 rounded-xl bg-gradient-cyber text-primary-foreground font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:glow-primary shadow-lg shadow-primary/20 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Télécharger le logiciel maintenant
        </a>

        <div className="bg-secondary/50 p-4 rounded-xl border border-border/50 mb-6 text-left">
          <p className="text-xs font-semibold text-muted-foreground mb-2">⚠️ Important :</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Ne partagez pas ce fichier publiquement</li>
            <li>Conservez bien ce lien de téléchargement</li>
            <li>Le fichier est valable uniquement pour votre usage personnel</li>
          </ul>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-secondary/50 text-foreground font-semibold text-sm transition-all duration-300 hover:bg-secondary/70"
        >
          Revenir à la page d&apos;achat
        </Link>
      </div>
    </div>
  );
};

export default Download;

