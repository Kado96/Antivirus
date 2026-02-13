import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { useConfig } from "@/context/ConfigContext";

const PaymentButton = () => {
  const { config } = useConfig();
  const [email, setEmail] = useState("");

  const transactionId = useMemo(() => `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, []);

  const returnUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/#/paiement/result`;
  }, []);

  const handlePaymentSubmit = () => {
    // Stocker les détails de la transaction pour vérification ultérieure
    const transactionData = {
      id: transactionId,
      email: email,
      amount: config.amount,
      currency: config.currency,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    localStorage.setItem(`pending_txn_${transactionId}`, JSON.stringify(transactionData));

    // Log pour debug
    console.log("Transaction initiée:", transactionData);
  };

  return (
    <form
      action="https://www.afripay.africa/checkout/index.php"
      method="post"
      id="afripayform"
      className="w-full space-y-4"
      onSubmit={handlePaymentSubmit}
    >
      <input type="hidden" name="amount" value={config.amount} />
      <input type="hidden" name="currency" value={config.currency} />
      <input type="hidden" name="comment" value={config.comment} />
      {/* client_token est utilisé ici comme notre ID de transaction unique */}
      <input type="hidden" name="client_token" value={transactionId} />
      {/* On passe aussi l'email dans un champ personnalisé si AfriPay le permet, sinon via client_token */}
      <input type="hidden" name="return_url" value={returnUrl} />
      <input type="hidden" name="app_id" value="5b47c080a61d5652c3696cbdf2f8a8cd" />
      <input type="hidden" name="app_secret" value="JDJ5JDEwJHNPRHp3" />

      {/* Email input */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          required
          autoComplete="email"
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        📧 Le lien de téléchargement sera envoyé à cette adresse
      </p>

      <div className="bg-secondary/50 p-3 rounded-lg border border-border/50 text-xs text-muted-foreground mb-2">
        <p className="flex items-center gap-2 mb-1">
          <span className="text-yellow-500">💡</span>
          <span>
            Important : Sur la page de paiement AfriPay, vous devrez entrer votre propre numéro de téléphone
            (Lumicash/Ecocash) pour payer.
          </span>
        </p>
        <p>Le numéro doit être celui associé à votre compte de paiement mobile.</p>
      </div>

      <button
        type="submit"
        className="w-full py-4 px-8 rounded-xl bg-gradient-cyber text-primary-foreground font-bold text-lg transition-all duration-300 hover:scale-105 hover:glow-primary shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
      >
        <span>Acheter Maintenant</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-purple-900/50 text-purple-200 text-xs border border-purple-500/30">
            Lumicash
          </span>
          <span className="px-2 py-1 rounded bg-blue-900/50 text-blue-200 text-xs border border-blue-500/30">
            AfriPay
          </span>
        </div>
        <p className="text-xs text-muted-foreground">🔒 Paiement 100% sécurisé via AfriPay</p>
      </div>
    </form>
  );
};

export default PaymentButton;
