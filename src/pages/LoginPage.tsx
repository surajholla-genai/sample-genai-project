
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = () => {
    toast({
      title: "Login Successful",
      description: "Welcome back to QuistoLearn!"
    });
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-quiz-primary">QuistoLearn</h1>
          <p className="text-gray-600">Sign in to access your quizzes</p>
        </div>
        
        <LoginForm onLogin={handleLogin} />
        
        <p className="mt-8 text-center text-sm text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
