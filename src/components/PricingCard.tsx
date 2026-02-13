import { Check, Shield } from "lucide-react";
import PaymentButton from "./PaymentButton";
import { useConfig } from "@/context/ConfigContext";

const PricingCard = () => {
  const { config } = useConfig();

  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Dynamic Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

      <div className="relative bg-[#0A0F1D]/80 border border-white/10 rounded-[40px] p-8 md:p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-primary/40">
        {/* Banner Badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          <div className="relative px-6 py-1.5 bg-primary rounded-full text-primary-foreground text-[11px] font-black uppercase tracking-widest shadow-[0_4px_20px_rgba(var(--primary),0.4)]">
            {config.pricingBadge}
            <div className="absolute top-0 left-0 w-full h-full bg-white/20 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Header Icon */}
        <div className="text-center mb-8 relative">
          <div className="w-24 h-24 mx-auto mb-6 rounded-[32px] bg-gradient-to-br from-primary/20 to-blue-500/5 p-0.5 border border-white/5 shadow-inner">
            <div className="w-full h-full bg-slate-950 rounded-[30px] flex items-center justify-center relative overflow-hidden">
              <Shield className="w-12 h-12 text-primary relative z-10" />
              <div className="absolute inset-0 bg-primary/5 blur-xl animate-pulse" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">{config.productTitle}</h3>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-[0.2em]">{config.productSubtitle}</p>
        </div>

        {/* Price Display */}
        <div className="text-center mb-10">
          <div className="inline-flex items-baseline gap-2">
            <span className="text-6xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent italic">
              {config.amount.toLocaleString("fr-FR")}
            </span>
            <span className="text-lg font-bold text-primary uppercase tracking-widest">
              {config.currency}
            </span>
          </div>
          <div className="mt-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            Paiement unique • Licence 1 an
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-4 mb-10">
          {config.pricingFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 group/item">
              <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/item:bg-primary group-hover/item:border-primary transition-all duration-300">
                <Check className="w-3 h-3 text-primary group-hover/item:text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover/item:text-white transition-colors">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button Container */}
        <div className="relative pt-4">
          <PaymentButton />
          <p className="mt-4 text-[10px] text-center text-slate-500 font-medium">
            🔒 Sécurisé par AfriPay Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
