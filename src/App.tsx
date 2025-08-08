import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import RollNumberSearch from "./pages/RollNumberSearch";
import NotFound from "./pages/NotFound";
import QRScanner from "./pages/QRScanner"
import EyeScanner from "./pages/EyeScanner";
import FingerprintScanner from "./pages/FingerprintScanner";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/verify/roll-number" element={<RollNumberSearch />} />
          <Route path="/verify/qr-scanner" element={<QRScanner/>} />
          <Route path="/verify/eye-scan" element={<EyeScanner/>} />
          <Route path="/verify/fingerprint" element={<FingerprintScanner/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
