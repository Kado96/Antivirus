import { useState } from "react";
import { Mail } from "lucide-react";

const PaymentButton = () => {
  const [email, setEmail] = useState("");

  return (
    <form 
      action="https://www.afripay.africa/checkout/index.php" 
      method="post" 
      id="afripayform"
      className="w-full space-y-4"
    >
      <input type="hidden" name="amount" value="30000" />
      <input type="hidden" name="currency" value="BIF" />
      <input type="hidden" name="comment" value="Kaspersky Antivirus - Licence 1 an" />
      <input type="hidden" name="client_token" value={email} />
      <input type="hidden" name="return_url" value="" />
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
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        📧 Le lien de téléchargement sera envoyé à cette adresse
      </p>
      
      <button
        type="submit"
        className="w-full py-4 px-8 rounded-xl bg-gradient-cyber text-primary-foreground font-bold text-lg transition-all duration-300 hover:scale-105 hover:glow-primary animate-pulse-glow flex items-center justify-center gap-3"
      >
        <span>Acheter Maintenant</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
      
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <img 
          src="https://www.afripay.africa/logos/pay_with_afripay.png" 
          alt="Pay with AfriPay" 
          className="h-8 opacity-80"
        />
      </div>
    </form>
  );
};

export default PaymentButton;
