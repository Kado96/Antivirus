import { Check, Shield } from "lucide-react";
import PaymentButton from "./PaymentButton";

const PricingCard = () => {
  const features = [
    "Licence 1 an - Multi-appareils",
    "Garantie 3 ans incluse",
    "Guide d'installation complet",
    "Vidéo tutoriel fournie",
    "Lien de téléchargement envoyé par email",
    "Protection antivirus en temps réel",
    "Blocage des ransomwares",
    "Support technique 24/7",
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-cyber rounded-3xl blur-xl opacity-30" />
      
      <div className="relative bg-gradient-card border border-border rounded-3xl p-8 shadow-card">
        {/* Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-cyber rounded-full text-primary-foreground text-sm font-semibold">
          Offre Spéciale
        </div>
        
        {/* Header */}
        <div className="text-center mb-6 pt-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-cyber flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">Kaspersky Antivirus</h3>
          <p className="text-muted-foreground">Licence 1 an - Multi-appareils</p>
        </div>
        
        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold text-gradient">30 000</span>
            <span className="text-xl font-semibold text-muted-foreground">BIF</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Paiement unique</p>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <span className="text-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Payment Button */}
        <PaymentButton />
        
        {/* Trust badge */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 Paiement 100% sécurisé via AfriPay
        </p>
      </div>
    </div>
  );
};

export default PricingCard;
