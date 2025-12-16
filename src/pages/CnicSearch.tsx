import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IdCard, ArrowLeft, CheckCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock CNIC data
const mockCnicData = {
  "3450231115412": {
    name: "Ahmed Ali Khan",
    rollNumber: "22021519-120",
    department: "Computer Science",
     batch: "2022-2026",
    semester: "7th Semester",
    status: "Active",
    validity: "Valid until JUly 2026",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  "3450231115415": {
    name: "Sara Fatima",
    rollNumber: "22021519-130",
    department: "Computer Science",
    batch: "2022-2026",
    semester: "7th Semester",
    status: "Active",
    validity: "Valid until JUly 2026",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  "3450231115419": {
    name: "Ali Raza",
    rollNumber: "22021519-140",
    department: "Computer Science",
   batch: "2022-2026",
    semester: "7th Semester",
    status: "Active",
    validity: "Valid until JUly 2026",
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  }
};

export default function CNICSearch() {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchAttempted(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if CNIC matches mock data
    if (mockCnicData[cnic]) {
      setStudentData(mockCnicData[cnic]);
    } else {
      setStudentData(null);
    }

    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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

          {/* Search Card */}
          <Card className="mb-8 shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <IdCard className="text-white" size={24} />
              </div>
              <CardTitle className="text-2xl">CNIC Search</CardTitle>
              <p className="text-muted-foreground">Enter student CNIC to verify identity</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cnic">Student CNIC</Label>
                <Input
                  id="cnic"
                  placeholder="Enter 13-digit CNIC"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value.replace(/\D/g, ""))}
                  onKeyPress={handleKeyPress}
                  maxLength={13}
                  className="text-center text-lg"
                />
              </div>

              <Button
                variant="verification"
                className="w-full"
                onClick={handleSearch}
                disabled={cnic.length !== 13 || isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <>
                    <IdCard size={18} />
                    Search Student
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Try "3450231115412" for a successful search.
              </p>
            </CardContent>
          </Card>

          {/* Results */}
          {searchAttempted && (
            <Card className={`shadow-card ${studentData ? 'border-success/50' : 'border-destructive/50'}`}>
              <CardContent className="p-6">
                {studentData ? (
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
                          alt="Student"
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
                      No student record found for CNIC: <strong>{cnic}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please check the CNIC and try again.
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