
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
}
import {
  Users,
  UserPlus,
  Search,
  FileText,
  Activity,
  Eye,
  Fingerprint,
  QrCode
} from "lucide-react";

const adminStats = [
  { title: "Total Students", value: "1,247", icon: Users, color: "primary" },
  { title: "Verified Today", value: "89", icon: Activity, color: "success" },
  { title: "Pending Records", value: "12", icon: FileText, color: "warning" },
  { title: "Active Scans", value: "5", icon: Search, color: "accent" }
    
];

const recentScans = [
  {
    id: "VS001",
    student: "Ahmed Ali",
    rollNo: "20CS-001",
    method: "Fingerprint",
    time: "10:30 AM",
    status: "Success",
    icon: Fingerprint
  },
  {
    id: "VS002",
    student: "Fatima Khan",
    rollNo: "20CS-045",
    method: "QR Code",
    time: "10:25 AM",
    status: "Success",
    icon: QrCode
  },
  {
    id: "VS003",
    student: "Muhammad Hassan",
    rollNo: "20CS-078",
    method: "Eye Scan",
    time: "10:20 AM",
    status: "Failed",
    icon: Eye
  }
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <header className="bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3" role="button">
              <GraduationCap size={32} />
              <div>
                <h1 className="text-xl font-bold">University of Gujrat</h1>
                <p className="text-sm opacity-90">Student Verification System</p>
              </div>
            </div>

            <nav className="flex items-center space-x-4">
              <Button
                variant={!isAdminRoute ? "secondary" : "ghost"}
                onClick={() => navigate('/')}
                className={!isAdminRoute ? "bg-white/20 text-white hover:bg-white/30" : "text-white/80 hover:text-white hover:bg-white/10"}
              >
                Logout
              </Button>

            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage student records and monitor verification activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={stat.title} className="bg-gradient-card border shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`text-${stat.color}`} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="verification" className="w-full justify-start">
                <UserPlus size={20} />
                Add New Student
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search size={20} />
                Search Records
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText size={20} />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity size={20} />
                System Logs
              </Button>
            </CardContent>
          </Card>

          {/* Recent Verification Scans */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Verification Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <scan.icon className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{scan.student}</p>
                        <p className="text-sm text-muted-foreground">
                          {scan.rollNo} • {scan.method} • {scan.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${scan.status === 'Success'
                          ? 'bg-success/10 text-success'
                          : 'bg-destructive/10 text-destructive'
                        }`}>
                        {scan.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Scans
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}