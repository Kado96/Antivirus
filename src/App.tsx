import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ConfigProvider } from "./context/ConfigContext";
import Admin from "./pages/Admin";
import PaymentResult from "./pages/PaymentResult";
import Download from "./pages/Download";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* HashRouter permet de fonctionner même sur un hébergement statique simple (sans configuration serveur) */}
        <HashRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            {/* Page de téléchargement (après paiement réussi) */}
            <Route path="/telechargement" element={<Download />} />
            {/* Page résultat paiement (gère les échecs et redirige les succès) */}
            <Route path="/paiement/result" element={<PaymentResult />} />
            {/* Ancienne URL conservée en alias si nécessaire */}
            <Route path="/payment-result" element={<PaymentResult />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
