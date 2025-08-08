import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, User, QrCode, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

// Mock students data with multiple records
const students = [
  {
    name: "Ahmed Ali Khan",
    rollNumber: "20CS-001",
    department: "Computer Science",
    batch: "2020-2024",
    semester: "8th Semester",
    status: "Active",
    validity: "Valid until Dec 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Sara Ahmed",
    rollNumber: "20CS-002",
    department: "Computer Science",
    batch: "2020-2024",
    semester: "8th Semester",
    status: "Active",
    validity: "Valid until Dec 2024",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Muhammad Hassan",
    rollNumber: "20CS-003",
    department: "Computer Science",
    batch: "2020-2024",
    semester: "8th Semester",
    status: "Active",
    validity: "Valid until Dec 2024",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

export default function QRScanner() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [studentFound, setStudentFound] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const html5QrCodeRef = useRef(null);

  const handleScanResult = (roll) => {
    const cleanRoll = roll.toLowerCase().replace(/[^a-z0-9]/gi, '');
    const found = students.find(
      s => s.rollNumber.toLowerCase().replace(/[^a-z0-9]/gi, '') === cleanRoll
    );
    
    setScanResult(roll);
    setSearchAttempted(true);
    if (found) {
      setStudentFound(true);
      setStudentData(found);
    } else {
      setStudentFound(false);
      setStudentData(null);
    }
  };

  useEffect(() => {
    if (scanning) {
      const qrCodeRegionId = "qr-reader";
      const html5QrCode = new Html5Qrcode(qrCodeRegionId);
      html5QrCodeRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setScanning(false);
          html5QrCode.stop();
          handleScanResult(decodedText);
        },
        (errorMessage) => {}
      );

      return () => {
        html5QrCode.stop().catch(() => {});
      };
    }
  }, [scanning]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setScanning(false);
    setSearchAttempted(false);
    setScanResult(null);

    const html5QrCode = new Html5Qrcode("qr-reader");
    try {
      const result = await html5QrCode.scanFile(file, true);
      handleScanResult(result);
    } catch (err) {
      setScanResult("Error: " + (err?.message || "Unknown error"));
      setSearchAttempted(true);
      setStudentFound(false);
      setStudentData(null);
    }
  };

  const handleRescan = () => {
    setScanResult(null);
    setScanning(true);
    setSearchAttempted(false);
    setStudentFound(false);
    setStudentData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Button>

          {/* QR Scanner Card */}
          <Card className="mb-8 shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <QrCode className="text-white" size={24} />
              </div>
              <CardTitle className="text-2xl">QR Code Scanner</CardTitle>
              <p className="text-muted-foreground">Scan student QR code to verify identity</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {scanning ? (
                <div className="flex flex-col items-center space-y-4">
                  <div id="qr-reader" style={{ width: "100%" }} />
                  <p className="text-xs text-muted-foreground text-center">
                    QR code should contain the roll number (e.g., 20CS-001)
                  </p>
                  <label className="flex flex-col items-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                    <span className="flex items-center gap-2 text-primary hover:underline mt-2">
                      <ImageIcon size={18} />
                      Upload QR Image
                    </span>
                  </label>
                </div>
              ) : (
                <Button variant="outline" className="w-full" onClick={handleRescan}>
                  Scan Again
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {searchAttempted && (
            <Card className={`shadow-card ${studentFound ? 'border-success/50' : 'border-destructive/50'}`}>
              <CardContent className="p-6">
                {studentFound && studentData ? (
                  <div className="space-y-6">
                    {/* Success Header */}
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-success">Student Verified Successfully</h3>
                    </div>

                    {/* Student Details */}
                    <div className="bg-muted/50 rounded-lg p-6">
                      <div className="flex items-center space-x-6 mb-6">
                        <img
                          src={studentData.image}
                          alt={studentData.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-success/20"
                        />
                        <div>
                          <h4 className="text-2xl font-bold text-foreground">{studentData.name}</h4>
                          <p className="text-muted-foreground">{studentData.department}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Roll Number</p>
                          <p className="font-semibold">{studentData.rollNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Batch</p>
                          <p className="font-semibold">{studentData.batch}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Current Semester</p>
                          <p className="font-semibold">{studentData.semester}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <span className="px-2 py-1 bg-success/10 text-success rounded text-sm font-medium">
                            {studentData.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-success/10 rounded border border-success/20">
                        <p className="text-sm text-success font-medium">{studentData.validity}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <User className="w-16 h-16 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold text-destructive">Student Not Found</h3>
                    <p className="text-muted-foreground">
                      No student record found for roll number: <strong>{scanResult}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please check the QR code and try again.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 