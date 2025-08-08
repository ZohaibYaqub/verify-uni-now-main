import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EyeScanner() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState(null);

  // Placeholder: In real-world, you would use a specialized iris/eye recognition library or backend
  // For now, just show camera and a message

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Button>

          {/* Eye Scanner Card */}
          <Card className="mb-8 shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Eye className="text-white" size={24} />
              </div>
              <CardTitle className="text-2xl">Eye/Iris Scanner</CardTitle>
              <p className="text-muted-foreground">(Demo) Scan your eye for verification</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {scanning ? (
                <div className="flex flex-col items-center space-y-4">
                  {/* Camera preview placeholder */}
                  <video
                    id="eye-camera"
                    autoPlay
                    playsInline
                    style={{ width: "100%", maxWidth: 400, borderRadius: 12, border: '2px solid #eee' }}
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Eye/Iris scan feature requires specialized hardware and software.<br/>
                    This is a demo UI only.
                  </p>
                </div>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => setScanning(true)}>
                  Scan Again
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 