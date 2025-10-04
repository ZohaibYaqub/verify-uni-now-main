import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import RollNumberSearch from "./pages/RollNumberSearch";
import NotFound from "./pages/NotFound";
import Facescan from "./pages/Facescan";
import CNICSearch from "./pages/CnicSearch";
import Fingerprint from "./pages/Fingerprint";
import Auth from "./pages/Auth";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Admin" element={<AdminPanel />} />
          <Route path="/verify/roll-number" element={<RollNumberSearch />} />
          <Route path="/verify/cnic" element={<CNICSearch />} />
          <Route path="/verify/face-scan" element={<Facescan />} />
          <Route path="/verify/finger" element={<Fingerprint />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
