import { Header } from "@/components/Header";
import { VerificationCard } from "@/components/VerificationCard";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  QrCode, 
  Eye, 
  Fingerprint
} from "lucide-react";
import universityHero from "@/assets/university-hero.jpg";

const verificationMethods = [
  {
    title: "Roll Number Search",
    description: "Verify student by entering their roll number",
    icon: Search,
    color: "primary" as const,
    route: "/verify/roll-number"
  },
  {
    title: "QR Code Scanner", 
    description: "Scan student ID QR code for instant verification",
    icon: QrCode,
    color: "accent" as const,
    route: "/verify/qr-scanner"
  },
  {
    title: "Face Scan",
    description: "Biometric verification using iris scanning",
    icon: Eye,
    color: "success" as const,
    route: "/verify/eye-scan"
  },
  {
    title: "Fingerprint Scan",
    description: "Secure fingerprint-based verification",
    icon: Fingerprint, 
    color: "warning" as const,
    route: "/verify/fingerprint"
  },
   {
    title: "CNIC Search",
    description: "Secure fingerprint-based verification",
    icon: Fingerprint, 
    color: "warning" as const,
    route: "/verify/fingerprint"
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${universityHero})` }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            Student Verification System
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Secure, fast, and reliable verification for University of Gujrat students using advanced biometric and digital technologies.
          </p>
        </div>
      </section>

      {/* Verification Methods */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Choose Verification Method</h3>
            <p className="text-muted-foreground">Select your preferred method to verify student identity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {verificationMethods.map((method, index) => (
              <div 
                key={method.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <VerificationCard
                  title={method.title}
                  description={method.description}
                  icon={method.icon}
                  color={method.color}
                  onClick={() => navigate(method.route)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose Our System?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Search className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold">Fast Verification</h4>
              <p className="text-muted-foreground">Instant results with multiple verification methods</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Eye className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold">Secure & Reliable</h4>
              <p className="text-muted-foreground">Advanced biometric security for accurate identification</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Fingerprint className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold">User Friendly</h4>
              <p className="text-muted-foreground">Intuitive interface designed for ease of use</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}