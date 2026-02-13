import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AppConfig = {
  amount: number;
  currency: string;
  comment: string;
  productTitle: string;
  productSubtitle: string;
  primaryHue: number;
  pricingTitleLine1: string;
  pricingTitleHighlight: string;
  pricingSubtitle: string;
  pricingBadge: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  whyTitle: string;
  whySubtitle: string;
  footerText: string;
  pricingFeatures: string[];
  downloadUrl: string;
  paymentInstructions: string[];
};

type ConfigContextValue = {
  config: AppConfig;
  updateConfig: (partial: Partial<AppConfig>) => void;
};

const DEFAULT_CONFIG: AppConfig = {
  amount: 30000,
  currency: "BIF",
  comment: "Kaspersky Antivirus - Licence 1 an",
  productTitle: "Kaspersky Antivirus",
  productSubtitle: "Multi-appareils",
  primaryHue: 190,
  pricingTitleLine1: "Obtenez votre",
  pricingTitleHighlight: "Protection",
  pricingSubtitle: "Un investissement pour votre tranquillité d'esprit. Protégez-vous dès aujourd'hui.",
  pricingBadge: "Offre Spéciale",
  heroBadge: "Protection #1 Mondiale",
  heroTitleLine1: "Protégez votre",
  heroTitleHighlight: "Vie Numérique",
  heroSubtitle:
    "Kaspersky Antivirus offre une protection complète contre les virus, malwares, ransomwares et toutes les menaces en ligne. Sécurisez vos données dès maintenant.",
  whyTitle: "Pourquoi choisir Kaspersky ?",
  whySubtitle: "Une suite complète de sécurité pour protéger tous les aspects de votre vie numérique.",
  footerText: "© 2024 - REVENDEUR AGRÉÉ KASPERSKY. TOUS DROITS RÉSERVÉS.",
  pricingFeatures: [
    "Multi-appareils",
    "Garantie 3 ans incluse",
    "Guide d'installation complet",
    "Vidéo tutoriel fournie",
    "Lien de téléchargement envoyé par email",
    "Protection antivirus en temps réel",
    "Blocage des ransomwares",
    "Support technique 24/7",
  ],
  downloadUrl: "https://drive.google.com/file/d/1jk5kbmm74K6nf9OYcs03aJ0Zd1-GCY74/view?usp=drive_link",
  paymentInstructions: [
    "Composez *163#",
    "Choisissez 4 (Factures)",
    "Choisissez 2 (Approuver)",
    "Choisissez 1 (INSCRIPTION AFR)",
  ],
};

const STORAGE_KEY = "afripay-kaspersky-config";

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  // Chargement depuis localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppConfig>;
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
      }
    } catch {
      setConfig(DEFAULT_CONFIG);
    }
  }, []);

  // Appliquer la couleur principale dynamique au thème
  useEffect(() => {
    const root = document.documentElement;
    const hue = config.primaryHue;
    const primary = `${hue} 100% 45%`;

    root.style.setProperty("--primary", primary);
    root.style.setProperty("--accent", primary);
    root.style.setProperty("--ring", primary);

    // Met à jour le dégradé cyber pour suivre la couleur principale
    root.style.setProperty(
      "--gradient-cyber",
      `linear-gradient(135deg, hsl(${hue} 100% 50%) 0%, hsl(${(hue + 20) % 360} 100% 60%) 100%)`
    );
  }, [config.primaryHue]);

  const updateConfig = (partial: Partial<AppConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return <ConfigContext.Provider value={{ config, updateConfig }}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return ctx;
};


