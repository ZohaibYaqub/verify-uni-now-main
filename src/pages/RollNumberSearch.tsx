import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ArrowLeft, CheckCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Mock Student Data
const mockStudentData = {
  "22021519-110": {
    name: "Ahmed Ali Khan",
    rollNumber: "22021519-110",
    department: "Computer Science",
    batch: "2022-2026",
    semester: "7th Semester",
    status: "Active",
    validity: "Valid until July 2026",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  "22021519-130": {
    name: "Sara Fatima",
    rollNumber: "22021519-130",
    department: "Computer Science",
    batch: "2022-2026",
    semester: "7th Semester",
    status: "Active",
    validity: "Valid until July 2026",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  "22021519-140": {
    name: "Ali Raza",
    rollNumber: "22021519-140",
    department: "Computer Science",
    batch: "2022-2026",
    semester: "7th Semester",
    status: "Active",
    validity: "Valid until July 2026",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
};

export default function RollNumberSearch() {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [studentFound, setStudentFound] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ✅ Search Logic
  const handleSearch = async () => {
    setIsSearching(true);
    setSearchAttempted(true);

    // fake delay (API simulation)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const student = mockStudentData[rollNumber.trim()];

    if (student) {
      setSelectedStudent(student);
      setStudentFound(true);
    } else {
      setSelectedStudent(null);
      setStudentFound(false);
    }

    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* 🔙 Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Button>

          {/* 🔍 Search Card */}
          <Card className="mb-8 shadow-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Search className="text-white" size={24} />
              </div>
              <CardTitle className="text-2xl">Roll Number Search</CardTitle>
              <p className="text-muted-foreground">
                Enter student roll number to verify identity
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Student Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="e.g. 22021519-110"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="text-center text-lg"
                />
              </div>

              <Button
                variant="verification"
                className="w-full"
                onClick={handleSearch}
                disabled={!rollNumber || isSearching}
              >
                {isSearching ? "Searching..." : "Search Student"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Try: 22021519-110, 22021519-130, 22021519-140
              </p>
            </CardContent>
          </Card>

          {/* ✅ Result Card */}
          {searchAttempted && (
            <Card
              className={`shadow-card ${
                studentFound
                  ? "border-success/50"
                  : "border-destructive/50"
              }`}
            >
              <CardContent className="p-6">

                {studentFound && selectedStudent ? (
                  <div className="space-y-6">

                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-success">
                        Student Verified Successfully
                      </h3>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-6">
                      <div className="flex items-center space-x-6 mb-6">
                        <img
                          src={selectedStudent.image}
                          alt="Student"
                          className="w-20 h-20 rounded-full object-cover border-4 border-success/20"
                        />
                        <div>
                          <h4 className="text-2xl font-bold">
                            {selectedStudent.name}
                          </h4>
                          <p className="text-muted-foreground">
                            {selectedStudent.department}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Roll Number
                          </p>
                          <p className="font-semibold">
                            {selectedStudent.rollNumber}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Batch</p>
                          <p className="font-semibold">
                            {selectedStudent.batch}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Semester
                          </p>
                          <p className="font-semibold">
                            {selectedStudent.semester}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <span className="px-2 py-1 bg-success/10 text-success rounded text-sm">
                            {selectedStudent.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-success/10 rounded">
                        <p className="text-sm text-success font-medium">
                          {selectedStudent.validity}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <User className="w-16 h-16 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold text-destructive">
                      Student Not Found
                    </h3>
                    <p className="text-muted-foreground">
                      No record found for roll number:
                      <strong> {rollNumber}</strong>
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
