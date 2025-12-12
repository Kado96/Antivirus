import { Shield, Zap, Lock, Eye, Globe, Headphones } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";

const Index = () => {
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
    <div className="min-h-screen bg-gradient-hero bg-grid overflow-hidden">
      {/* Hero Section */}
      <header className="relative">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-up">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Protection #1 Mondiale</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
              <span className="text-foreground">Protégez votre</span>
              <br />
              <span className="text-gradient">Vie Numérique</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay">
              Kaspersky Antivirus offre une protection complète contre les virus, malwares, 
              ransomwares et toutes les menaces en ligne. Sécurisez vos données dès maintenant.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-up-delay-2">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">400M+</div>
                <div className="text-sm text-muted-foreground">Utilisateurs Protégés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">99.9%</div>
                <div className="text-sm text-muted-foreground">Taux de Détection</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">24/7</div>
                <div className="text-sm text-muted-foreground">Protection Active</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi choisir <span className="text-gradient">Kaspersky</span> ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une suite complète de sécurité pour protéger tous les aspects de votre vie numérique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-16 md:py-24">
        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Obtenez votre <span className="text-gradient">Protection</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un investissement pour votre tranquillité d'esprit. Protégez-vous dès aujourd'hui.
            </p>
          </div>
          
          <PricingCard />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 - Revendeur Agréé Kaspersky. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
