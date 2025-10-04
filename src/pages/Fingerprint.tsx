import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FingerScan() {
    const navigate = useNavigate();
    const [scanned, setScanned] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const handleScan = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setScanned(true);
        }, 2000); // 2 seconds
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="mb-6"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Button>
                    <Card className="mb-8 shadow-card">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                                <Fingerprint className="text-white" size={24} />
                            </div>
                            <CardTitle className="text-2xl">Finger Scan</CardTitle>
                            <p className="text-muted-foreground">(Demo) Scan your finger for verification</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {!scanned ? (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                                        <Fingerprint size={64} className="text-gray-400" />
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Place your finger on the scanner.<br/>
                                        (Demo UI only. Real scan requires hardware integration.)
                                    </p>
                                    <Button
                                        variant="default"
                                        onClick={handleScan}
                                        disabled={verifying}
                                    >
                                        {verifying ? "Verifying..." : "Simulate Finger Scan"}
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-green-600 text-center font-semibold">
                                    Finger Scan Successful!
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
