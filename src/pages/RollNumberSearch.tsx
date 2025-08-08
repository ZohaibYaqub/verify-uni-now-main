import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ArrowLeft, CheckCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock student data
const mockStudentData = {
  name: "Ahmed Ali Khan",
  rollNumber: "20CS-001",
  department: "Computer Science", 
  batch: "2020-2024",
  semester: "8th Semester",
  status: "Active",
  validity: "Valid until Dec 2024",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
};

export default function RollNumberSearch() {
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [studentFound, setStudentFound] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchAttempted(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if roll number matches mock data
    if (rollNumber.toLowerCase() === "20cs-001" || rollNumber.toLowerCase() === "20cs001") {
      setStudentFound(true);
    } else {
      setStudentFound(false);
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
                <Search className="text-white" size={24} />
              </div>
              <CardTitle className="text-2xl">Roll Number Search</CardTitle>
              <p className="text-muted-foreground">Enter student roll number to verify identity</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Student Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter roll number (e.g., 20CS-001)"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-center text-lg"
                />
              </div>
              
              <Button 
                variant="verification" 
                className="w-full"
                onClick={handleSearch}
                disabled={!rollNumber || isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <>
                    <Search size={18} />
                    Search Student
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Try "20CS-001" for demo purposes
              </p>
            </CardContent>
          </Card>

          {/* Results */}
          {searchAttempted && (
            <Card className={`shadow-card ${studentFound ? 'border-success/50' : 'border-destructive/50'}`}>
              <CardContent className="p-6">
                {studentFound ? (
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
                          src={mockStudentData.image} 
                          alt="Student"
                          className="w-20 h-20 rounded-full object-cover border-4 border-success/20"
                        />
                        <div>
                          <h4 className="text-2xl font-bold text-foreground">{mockStudentData.name}</h4>
                          <p className="text-muted-foreground">{mockStudentData.department}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Roll Number</p>
                          <p className="font-semibold">{mockStudentData.rollNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Batch</p>
                          <p className="font-semibold">{mockStudentData.batch}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Current Semester</p>
                          <p className="font-semibold">{mockStudentData.semester}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <span className="px-2 py-1 bg-success/10 text-success rounded text-sm font-medium">
                            {mockStudentData.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-success/10 rounded border border-success/20">
                        <p className="text-sm text-success font-medium">{mockStudentData.validity}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <User className="w-16 h-16 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold text-destructive">Student Not Found</h3>
                    <p className="text-muted-foreground">
                      No student record found for roll number: <strong>{rollNumber}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please check the roll number and try again.
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