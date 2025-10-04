import { Button } from "@/components/ui/button";
import { GraduationCap, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-col gap-2 sm:flex-row">
          <div className="flex items-center space-x-3  " onClick={() => navigate('/')} role="button">
            <GraduationCap size={32} />
            <div>
              <h1 className="text-xl font-bold">University of Gujrat</h1>
              <p className="text-sm opacity-90">Student Verification System</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4 ">
            <Button 
              variant={!isAdminRoute ? "secondary" : "ghost"} 
              onClick={() => navigate('/')}
              className={!isAdminRoute ? "bg-white/20 text-white hover:bg-white/30" : "text-white/80 hover:text-white hover:bg-white/10"}
            >
              User Portal
            </Button>
            <Button 
              variant={isAdminRoute ? "secondary" : "ghost"}
              onClick={() => navigate('/Auth')}
              className={isAdminRoute ? "bg-white/20 text-white hover:bg-white/30" : "text-white/80 hover:text-white hover:bg-white/10"}
            >
              <Settings size={16} />
              Admin Panel
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}