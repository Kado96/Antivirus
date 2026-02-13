import { Shield, Zap, Lock, Eye, Globe, Headphones, CheckCircle2, XCircle } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import { useConfig } from "@/context/ConfigContext";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { config } = useConfig();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status")?.trim().toLowerCase();

  // Le succès est uniquement quand status === "success"
  const isSuccess = status === "success";
  // L'erreur est uniquement quand un status est présent MAIS n'est pas "success"
  const isError = status !== undefined && status !== null && !isSuccess;
  const features = [
    {
      icon: Shield,
      title: "Protection Totale",
      description: "Détection et suppression des virus, malwares et menaces en temps réel.",
    },
    {
      icon: Lock,
      title: "Anti-Ransomware",
      description: "Protection avancée contre les ransomwares et le cryptage malveillant de vos fichiers.",
    },
    {
      icon: Eye,
      title: "Vie Privée",
      description: "Protégez vos données personnelles et votre identité en ligne.",
    },
    {
      icon: Globe,
      title: "Navigation Sécurisée",
      description: "Bloquez les sites dangereux et les tentatives de phishing automatiquement.",
    },
    {
      icon: Zap,
      title: "Performance Optimale",
      description: "Léger et rapide, n'affecte pas les performances de votre ordinateur.",
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Assistance technique disponible à tout moment pour vous aider.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020817] bg-grid-white/[0.02] overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] opacity-40" />
      </div>

      {/* Hero Section */}
      <header className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-up">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                {config.heroBadge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter animate-fade-up leading-tight">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent italic">
                {config.heroTitleLine1}
              </span>
              <br />
              <span className="text-primary italic inline-block hover:scale-105 transition-transform cursor-default">
                {config.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-fade-up shadow-sm">
              {config.heroSubtitle}
            </p>

            {/* Trust Badges / Stats */}
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 animate-fade-up border-y border-white/5 py-10">
              {[
                { label: "Utilisateurs", value: "400M+" },
                { label: "Taux Détection", value: "99.9%" },
                { label: "Protection", value: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="text-3xl md:text-4xl font-black text-white group-hover:text-primary transition-colors italic">
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] mt-2 group-hover:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="relative py-24 md:py-32 bg-slate-950/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">
              {config.pricingTitleLine1}{" "}
              <span className="text-primary">{config.pricingTitleHighlight}</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-slate-400 max-w-xl mx-auto text-base font-medium">
              {config.pricingSubtitle}
            </p>
          </div>

          {/* Success/Error Alerts (High-end) */}
          {(isSuccess || isError) && (
            <div className="max-w-3xl mx-auto mb-20 animate-fade-up">
              {isSuccess && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-primary/20 blur-xl rounded-2xl" />
                  <div className="relative bg-[#0A1020] border border-primary/30 rounded-2xl p-8 text-center backdrop-blur-xl">
                    <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-white mb-4 uppercase italic">Paiement validé !</h2>
                    <p className="text-slate-400 mb-8 font-medium">
                      Votre licence Kaspersky est prête. Merci pour votre achat.
                    </p>
                    <a
                      href={config.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] active:scale-95"
                    >
                      Télécharger maintenant 🚀
                    </a>
                  </div>
                </div>
              )}

              {isError && (
                <div className="bg-red-950/20 border border-red-500/30 rounded-[32px] p-8 md:p-12 text-left backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <XCircle className="w-10 h-10 text-red-500" />
                    <h2 className="text-2xl font-black text-white uppercase italic">Paiement échoué</h2>
                  </div>
                  <div className="space-y-6 text-slate-300">
                    <p className="text-lg font-bold text-red-400">⚠️ Solde insuffisant détecté</p>
                    <p className="font-medium text-slate-400">
                      Votre compte mobile n&apos;a pas pu honorer la transaction de {config.amount.toLocaleString("fr-FR")} {config.currency}.
                    </p>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4 font-medium">
                      <p className="text-sm text-white uppercase tracking-widest font-black">Prochaines étapes :</p>
                      <ul className="space-y-3 text-sm">
                        <li className="flex gap-3"><span className="text-primary font-bold">01.</span> Rechargez votre compte Lumicash/Ecocash</li>
                        <li className="flex gap-3"><span className="text-primary font-bold">02.</span> Vérifiez que vous avez le montant exact + frais</li>
                        <li className="flex gap-3"><span className="text-primary font-bold">03.</span> Relancez le paiement ci-dessous</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="animate-fade-up-delay">
            <PricingCard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic leading-none">
                {config.whyTitle.includes("Kaspersky") ? (
                  <>
                    {config.whyTitle.split("Kaspersky")[0]}
                    <span className="text-primary">Kaspersky</span>
                    {config.whyTitle.split("Kaspersky")[1] ?? ""}
                  </>
                ) : (
                  config.whyTitle
                )}
              </h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">{config.whySubtitle}</p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-white/10 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 bg-[#01040D]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Branding Logo could go here */}
            <div className="text-2xl font-black text-white italic tracking-tighter">
              KASPERSKY<span className="text-primary">.</span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.5em] text-center max-w-md leading-loose">
              {config.footerText}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
