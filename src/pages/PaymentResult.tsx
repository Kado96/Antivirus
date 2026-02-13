import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Smartphone, CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import { useConfig } from "@/context/ConfigContext";

const PaymentResult = () => {
  const { config } = useConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const [lumicashRef, setLumicashRef] = useState("");

  const searchParams = new URLSearchParams(location.search);
  let rawStatus = searchParams.get("status")?.trim().toLowerCase() || "";

  if (!rawStatus && location.hash) {
    const hashParams = new URLSearchParams(location.hash.split("?")[1] || "");
    rawStatus = hashParams.get("status")?.trim().toLowerCase() || "";
  }

  const message = searchParams.get("message") || "";
  const transactionRef = searchParams.get("transaction_ref") || "";
  const clientToken = searchParams.get("client_token") || "";
  const amount = searchParams.get("amount") || "";
  const currency = searchParams.get("currency") || "";
  const paymentMethod = searchParams.get("payment_method") || "";

  // Analyser si c'est un vrai succès ou juste une initiation
  const isInitiated = rawStatus === "success" && message.toLowerCase().includes("sent to your phone");
  const isConfirmedSuccess = rawStatus === "success" && !isInitiated;

  const [isVerifying, setIsVerifying] = useState(isInitiated);

  const handleConfirmManual = async () => {
    if (!lumicashRef.trim()) {
      alert("Veuillez saisir votre ID de transaction Lumicash reçu par SMS.");
      return;
    }

    try {
      console.log("🔍 Vérification manuelle en cours pour ID :", lumicashRef);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const response = await fetch(`${apiUrl}/api/check-status/${clientToken}`);
      const data = await response.json();

      if (data.status === 'success' || data.response_code === '00' || data.message?.toLowerCase().includes('success')) {
        const pendingTxnKey = `pending_txn_${clientToken}`;
        const pendingTxnRaw = localStorage.getItem(pendingTxnKey);

        if (pendingTxnRaw) {
          const pendingTxn = JSON.parse(pendingTxnRaw);
          const completedTxn = {
            ...pendingTxn,
            status: 'success',
            lumicash_id: lumicashRef,
            transaction_ref: data.transaction_ref || transactionRef,
            completed_at: new Date().toISOString()
          };

          const history = JSON.parse(localStorage.getItem('payment_history') || '[]');
          history.unshift(completedTxn);
          localStorage.setItem('payment_history', JSON.stringify(history.slice(0, 50)));
          localStorage.removeItem(pendingTxnKey);
        }
        navigate("/telechargement", { replace: true });
      } else {
        alert("Paiement non encore confirmé par AfriPay. Merci de patienter ou de réessayer.");
      }
    } catch (err) {
      console.error("❌ Erreur lors de la vérification manuelle:", err);
      alert("Erreur de connexion avec le serveur de vérification.");
    }
  };

  useEffect(() => {
    // Debug ultra-détaillé
    console.log("🔍 URL de retour complète :", window.location.href);

    if (isConfirmedSuccess) {
      const pendingTxnKey = `pending_txn_${clientToken}`;
      const pendingTxnRaw = localStorage.getItem(pendingTxnKey);

      if (pendingTxnRaw) {
        const pendingTxn = JSON.parse(pendingTxnRaw);
        const completedTxn = {
          ...pendingTxn,
          status: 'success',
          transaction_ref: transactionRef,
          payment_method: paymentMethod,
          completed_at: new Date().toISOString()
        };

        const history = JSON.parse(localStorage.getItem('payment_history') || '[]');
        history.unshift(completedTxn);
        localStorage.setItem('payment_history', JSON.stringify(history.slice(0, 50)));
        localStorage.removeItem(pendingTxnKey);
      }

      const timer = setTimeout(() => {
        navigate("/telechargement", { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }

    // --- AUTOMATION : POLLING DU BACKEND ---
    let intervalId: NodeJS.Timeout;

    if (isInitiated && clientToken) {
      // Trigger Email Notification after 40 seconds if still pending
      const emailTimer = setTimeout(async () => {
        try {
          const pendingTxnRaw = localStorage.getItem(`pending_txn_${clientToken}`);
          if (pendingTxnRaw) {
            const pendingTxn = JSON.parse(pendingTxnRaw);
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
            await fetch(`${apiUrl}/api/notify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: pendingTxn.email,
                transactionId: clientToken,
                status: 'pending_delayed'
              })
            });
            console.log("📨 E-mail de rappel envoyé car le paiement tarde.");
          }
        } catch (err) {
          console.error("❌ Erreur envoi mail auto:", err);
        }
      }, 40000); // 40 secondes

      intervalId = setInterval(async () => {
        try {
          console.log("🔄 Vérification automatique du statut...");
          const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
          const response = await fetch(`${apiUrl}/api/check-status/${clientToken}`);
          const data = await response.json();

          // Si AfriPay confirme le succès, on redirige
          if (data.status === 'success' || data.response_code === '00' || data.message?.toLowerCase().includes('success')) {
            console.log("✅ Paiement confirmé par AfriPay !");
            clearInterval(intervalId);

            // On traite comme un succès confirmé
            const pendingTxnKey = `pending_txn_${clientToken}`;
            const pendingTxnRaw = localStorage.getItem(pendingTxnKey);
            if (pendingTxnRaw) {
              const pendingTxn = JSON.parse(pendingTxnRaw);
              const completedTxn = {
                ...pendingTxn,
                status: 'success',
                transaction_ref: data.transaction_ref || transactionRef,
                completed_at: new Date().toISOString()
              };
              const history = JSON.parse(localStorage.getItem('payment_history') || '[]');
              history.unshift(completedTxn);
              localStorage.setItem('payment_history', JSON.stringify(history.slice(0, 50)));
              localStorage.removeItem(pendingTxnKey);
            }

            navigate("/telechargement", { replace: true });
          }
        } catch (err) {
          console.error("❌ Erreur polling:", err);
        }
      }, 5000); // Toutes les 5 secondes
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isConfirmedSuccess, isInitiated, navigate, clientToken, transactionRef, paymentMethod]);

  // ÉTAT 1 : Requête envoyée au téléphone (OTP) - EN ATTENTE DE SAISIE MANUELLE
  if (isInitiated) {
    return (
      <div className="min-h-screen bg-[#020817] bg-grid-white/[0.02] flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Cercles de lumière dynamiques */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-xl relative group">
          {/* Border Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-500/30 rounded-[48px] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-slate-950/80 border border-white/10 rounded-[48px] p-8 md:p-12 shadow-2xl backdrop-blur-3xl text-center">
            {/* Header Icon Section */}
            <div className="relative mb-10">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl rotate-12 flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.1)] group-hover:rotate-0 transition-transform duration-500">
                <div className="-rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Smartphone className="h-12 w-12 text-primary drop-shadow-glow" />
                </div>
              </div>
              {/* Floating accents */}
              <div className="absolute top-0 right-1/4 w-3 h-3 bg-primary rounded-full blur-[2px] animate-bounce" />
              <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-blue-400 rounded-full blur-[1px] animate-pulse" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter italic">
              <span className="bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-transparent">
                Paiement en cours
              </span>
              <span className="inline-flex ml-2 w-3 h-8 bg-primary animate-pulse rounded-sm align-middle" />
            </h1>

            {/* Status Bar Container */}
            <div className="mb-10 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center gap-5 relative z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-primary/20 border-t-primary animate-spin rounded-full" />
                    <div className="absolute w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
                      Vérification en temps réel
                    </h3>
                    <p className="text-sm text-slate-400 font-medium">
                      Nous attendons la confirmation d'AfriPay...
                    </p>
                  </div>
                </div>
                {/* Subtle progress background */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-primary/30 w-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3 animate-[loading_2s_infinite_ease-in-out]" />
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 text-left relative overflow-hidden group/instr transition-all hover:bg-slate-900/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Instructions de validation
                </h3>
              </div>

              <div className="space-y-4">
                {config.paymentInstructions.map((instruction, idx) => {
                  const parts = instruction.split(" ");
                  const firstWord = parts[0];
                  const rest = parts.slice(1).join(" ");

                  return (
                    <div key={idx} className="flex items-center gap-4 group/step">
                      <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover/step:border-primary/50 group-hover/step:text-primary transition-colors">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-300">
                        {firstWord} <span className="text-white font-bold">{rest}</span>
                      </p>
                    </div>
                  );
                })}

                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-[11px] text-slate-500 italic leading-relaxed text-center">
                    🔒 Une fois la transaction validée sur votre mobile, la redirection sera instantanée.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Status */}
            <div className="mt-10 flex items-center justify-center gap-3 text-[11px] text-amber-500/70 font-bold uppercase tracking-widest animate-pulse">
              <Clock className="w-4 h-4" />
              <span>Ne fermez pas cette fenêtre</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px rgba(var(--primary), 0.5));
          }
        `}</style>
      </div>
    );
  }

  // ÉTAT 2 : Succès confirmé (Vrai succès après débit)
  if (isConfirmedSuccess) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-slate-950/40 border border-slate-800/50 rounded-[48px] p-8 md:p-12 shadow-2xl backdrop-blur-2xl text-center">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-green-400">Paiement Terminé !</h1>
          <p className="text-slate-400 mb-8">Votre achat a été validé avec succès. Redirection...</p>

          <div className="bg-slate-900/50 rounded-2xl p-6 text-left text-sm space-y-3 mb-8 border border-slate-800">
            <div className="flex justify-between font-mono"><span className="text-slate-500 uppercase text-[10px]">Réf</span> <span className="text-white">{transactionRef}</span></div>
            <div className="flex justify-between font-mono"><span className="text-slate-500 uppercase text-[10px]">Montant</span> <span className="text-white">{amount} {currency}</span></div>
          </div>

          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent animate-spin mx-auto rounded-full" />
        </div>
      </div>
    );
  }

  // ÉTAT 3 : Erreur ou Annulation
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-slate-950/40 border border-slate-800/50 rounded-[48px] p-8 md:p-12 shadow-2xl backdrop-blur-2xl text-center">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <XCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 text-red-500 uppercase italic">Paiement non validé ❌</h1>

        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 mb-8 text-left">
          <p className="text-base font-bold text-red-400 mb-2 uppercase">
            ⚠️ Raison : {rawStatus === "error" ? "Erreur réseau ou banque" : "Solde insuffisant ou annulé"}
          </p>
          <p className="text-sm text-slate-400">
            Si vous avez reçu un SMS mais n&apos;avez pas saisi votre code secret, le paiement ne peut être validé.
          </p>
        </div>

        <Link
          to="/"
          className="w-full h-16 flex items-center justify-center rounded-2xl bg-slate-800 text-white font-bold text-lg transition-all hover:bg-slate-700 active:scale-95"
        >
          Réessayer le paiement
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;