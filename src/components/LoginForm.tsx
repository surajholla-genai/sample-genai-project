import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    if (res.ok) {
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  const handleSignup = async () => {
    setError("");
    if (signupPassword !== signupConfirm) {
      setError("Passwords do not match");
      return;
    }
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signupEmail, password: signupPassword })
    });
    if (res.ok) {
      onLogin();
    } else {
      const msg = await res.text();
      setError(msg);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <TabsContent value="login" className="space-y-4">
            <CardDescription className="text-center mb-4">
              Log in to your account to manage your quizzes and track your progress
            </CardDescription>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleLogin}>
              Log In
            </Button>
          </TabsContent>
          <TabsContent value="signup" className="space-y-4">
            <CardDescription className="text-center mb-4">
              Create a new account to get started with QuistoLearn
            </CardDescription>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="your.email@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="••••••••" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleSignup}>
              Sign Up
            </Button>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default LoginForm;
