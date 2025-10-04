import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import universityHero from "@/assets/Uog.jpg";

type User = {
    email: string;
    password: string;
};

const Auth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("signup-email") as string;
        const password = formData.get("signup-password") as string;

        // Check if user already exists
        if (users.find((u) => u.email === email)) {
            toast.error("User already exists!");
            setLoading(false);
            return;
        }

        setUsers([...users, { email, password }]);
        toast.success("Account created successfully!");
        setLoading(false);
    };

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("signin-email") as string;
        const password = formData.get("signin-password") as string;

        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            toast.error("Invalid email or password!");
            setLoading(false);
            return;
        }

        setCurrentUser(user);
        toast.success("Signed in successfully!");
        setLoading(false);
        navigate("/admin");
    };

    if (currentUser) {
        return null;
    }

    return (
        <div
            className="min-h-screen w-screen h-screen flex items-center justify-center p-4"
            style={{
            backgroundImage: `url(${universityHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        >
            <div className="w-full max-w-md bg-white/80 rounded-lg shadow-lg backdrop-blur-md">
            <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="my-5 mx-3"
            >
                <ArrowLeft className="h-4 w-4 " />
                Back to Home
            </Button>

            <Card className="shadow-elevated">
                <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
                <CardDescription>
                    Sign in to access the student management dashboard
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                            id="signin-email"
                            name="signin-email"
                            type="email"
                            placeholder="admin@university.edu"
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input
                            id="signin-password"
                            name="signin-password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                    </TabsContent>

                    <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                            id="signup-email"
                            name="signup-email"
                            type="email"
                            placeholder="admin@university.edu"
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                            id="signup-password"
                            name="signup-password"
                            type="password"
                            placeholder="Create a password"
                            required
                            minLength={6}
                        />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>
            </div>
        </div>
    );
};

export default Auth;
