import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface VerificationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  color: "primary" | "accent" | "success" | "warning";
}

const colorClasses = {
  primary: "from-primary/10 to-primary/5 border-primary/20",
  accent: "from-accent/10 to-accent/5 border-accent/20", 
  success: "from-success/10 to-success/5 border-success/20",
  warning: "from-warning/10 to-warning/5 border-warning/20"
};

const iconColors = {
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success", 
  warning: "text-warning"
};

export function VerificationCard({ title, description, icon: Icon, onClick, color }: VerificationCardProps) {
  return (
    <Card className={`cursor-pointer transition-all duration-300 hover:shadow-card hover:scale-105 bg-gradient-to-br ${colorClasses[color]} border`}>
      <CardContent className="p-6 text-center space-y-4" onClick={onClick}>
        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-background to-muted flex items-center justify-center shadow-sm ${iconColors[color]}`}>
          <Icon size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button variant="verification" className="w-full">
          Start Verification
        </Button>
      </CardContent>
    </Card>
  );
}