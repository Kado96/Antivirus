import { useConfig } from "@/context/ConfigContext";
import { useEffect, useState } from "react";

const Admin = () => {
  const { config, updateConfig } = useConfig();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("admin-auth") === "1") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "donald" && password === "donald") {
      localStorage.setItem("admin-auth", "1");
      setIsAuthenticated(true);
      setAuthError(null);
      return;
    }
    setAuthError("Identifiants incorrects. Essayez à nouveau.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    updateConfig({
      amount: Number(formData.get("amount")) || config.amount,
      currency: String(formData.get("currency") || config.currency),
      comment: String(formData.get("comment") || config.comment),
      productTitle: String(formData.get("productTitle") || config.productTitle),
      productSubtitle: String(formData.get("productSubtitle") || config.productSubtitle),
      primaryHue: Number(formData.get("primaryHue")) || config.primaryHue,
      pricingTitleLine1: String(formData.get("pricingTitleLine1") || config.pricingTitleLine1),
      pricingTitleHighlight: String(formData.get("pricingTitleHighlight") || config.pricingTitleHighlight),
      pricingSubtitle: String(formData.get("pricingSubtitle") || config.pricingSubtitle),
      pricingBadge: String(formData.get("pricingBadge") || config.pricingBadge),
      heroBadge: String(formData.get("heroBadge") || config.heroBadge),
      heroTitleLine1: String(formData.get("heroTitleLine1") || config.heroTitleLine1),
      heroTitleHighlight: String(formData.get("heroTitleHighlight") || config.heroTitleHighlight),
      heroSubtitle: String(formData.get("heroSubtitle") || config.heroSubtitle),
      whyTitle: String(formData.get("whyTitle") || config.whyTitle),
      whySubtitle: String(formData.get("whySubtitle") || config.whySubtitle),
      footerText: String(formData.get("footerText") || config.footerText),
      pricingFeatures: String(formData.get("pricingFeatures") ?? config.pricingFeatures.join("\n"))
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
      downloadUrl: String(formData.get("downloadUrl") || config.downloadUrl),
      paymentInstructions: String(formData.get("paymentInstructions") ?? config.paymentInstructions.join("\n"))
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
    });

    alert("Configuration enregistrée ✅");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-hero bg-grid text-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-card border border-primary/20 rounded-3xl p-8 shadow-card backdrop-blur-sm space-y-6">
          <h1 className="text-2xl font-bold text-center">Connexion Admin</h1>
          <p className="text-xs text-muted-foreground text-center">
            Accès réservé. Entrez vos identifiants pour modifier la configuration.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom d&apos;utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="donald"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="********"
                autoComplete="current-password"
              />
            </div>

            {authError && <p className="text-xs text-destructive">{authError}</p>}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-cyber text-primary-foreground font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:glow-primary shadow-lg shadow-primary/20"
            >
              Se connecter
            </button>

            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Identifiants par défaut&nbsp;: <strong>donald / donald</strong>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-card border border-primary/20 rounded-3xl p-8 shadow-card backdrop-blur-sm space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Panneau d&apos;administration AfriPay / Kaspersky
        </h1>

        <p className="text-sm text-muted-foreground mb-4 text-center">
          Modifiez ici le prix, les textes affichés sur la page de vente, ainsi que la couleur principale.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Montant (prix)</label>
              <input
                type="number"
                name="amount"
                defaultValue={config.amount}
                className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Devise</label>
              <input
                type="text"
                name="currency"
                defaultValue={config.currency}
                className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Titre au-dessus de la carte de prix (ligne 1)</label>
            <input
              type="text"
              name="pricingTitleLine1"
              defaultValue={config.pricingTitleLine1}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Titre au-dessus de la carte (texte en couleur)</label>
            <input
              type="text"
              name="pricingTitleHighlight"
              defaultValue={config.pricingTitleHighlight}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Texte sous le titre (section prix)</label>
            <input
              type="text"
              name="pricingSubtitle"
              defaultValue={config.pricingSubtitle}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Badge sur la carte de prix</label>
            <input
              type="text"
              name="pricingBadge"
              defaultValue={config.pricingBadge}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Titre du produit</label>
            <input
              type="text"
              name="productTitle"
              defaultValue={config.productTitle}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sous-titre / description courte</label>
            <input
              type="text"
              name="productSubtitle"
              defaultValue={config.productSubtitle}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Titre principal (ligne 1)</label>
            <input
              type="text"
              name="heroTitleLine1"
              defaultValue={config.heroTitleLine1}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Titre principal (texte en couleur)</label>
            <input
              type="text"
              name="heroTitleHighlight"
              defaultValue={config.heroTitleHighlight}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Texte sous le grand titre</label>
            <textarea
              name="heroSubtitle"
              defaultValue={config.heroSubtitle}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Liste des avantages (carte de prix)</label>
            <textarea
              name="pricingFeatures"
              defaultValue={config.pricingFeatures.join("\n")}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[120px] text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              1 ligne = 1 avantage (ex: Multi-appareils, Garantie 3 ans, etc.).
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Titre section &quot;Pourquoi choisir&quot;</label>
            <input
              type="text"
              name="whyTitle"
              defaultValue={config.whyTitle}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Texte sous le titre &quot;Pourquoi choisir&quot;</label>
            <input
              type="text"
              name="whySubtitle"
              defaultValue={config.whySubtitle}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Texte du pied de page</label>
            <input
              type="text"
              name="footerText"
              defaultValue={config.footerText}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Commentaire (envoyé à AfriPay dans le champ &quot;comment&quot;)
            </label>
            <input
              type="text"
              name="comment"
              defaultValue={config.comment}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Couleur principale (teinte HSL, 0 – 360) – change la couleur générale du site
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                name="primaryHue"
                min={0}
                max={360}
                defaultValue={config.primaryHue}
                className="flex-1"
              />
              <span className="text-sm w-12 text-right">{config.primaryHue}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Lien de téléchargement (Ex: Google Drive, OneDrive, Dropbox)
            </label>
            <input
              type="text"
              name="downloadUrl"
              defaultValue={config.downloadUrl}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Étapes d&apos;instruction de paiement (Lumicash)</label>
            <textarea
              name="paymentInstructions"
              defaultValue={config.paymentInstructions.join("\n")}
              className="w-full px-3 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[120px] text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              1 ligne = 1 étape. Les étapes seront numérotées automatiquement (ex: Composez *163#, de manière simple).
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-cyber text-primary-foreground font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:glow-primary shadow-lg shadow-primary/20"
          >
            Enregistrer la configuration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;

