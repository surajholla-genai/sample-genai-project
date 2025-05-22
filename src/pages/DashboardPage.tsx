
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, Star, History } from 'lucide-react';

const DashboardPage = () => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your results are being downloaded as an XLS file."
    });
  };
  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        <Tabs defaultValue="hosted" className="mb-8">
          <TabsList>
            <TabsTrigger value="hosted">Hosted Quizzes</TabsTrigger>
            <TabsTrigger value="performance">My Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hosted" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Hosted Quizzes</h2>
              <Button 
                onClick={() => toast({
                  title: "Coming Soon!",
                  description: "Create Quiz feature will be available soon."
                })}
              >
                Create New Quiz
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sample hosted quiz */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle>Generative AI Fundamentals</CardTitle>
                    <Button variant="ghost" size="icon" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Hosted 3 times • 42 participants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Last session: May 12, 2023</span>
                      <span>Avg. Score: 72%</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Session #3</span>
                        <span>May 12, 2023</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <History className="h-4 w-4 mr-2" /> View Results (18 participants)
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Session #2</span>
                        <span>Apr 28, 2023</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <History className="h-4 w-4 mr-2" /> View Results (15 participants)
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Session #1</span>
                        <span>Apr 5, 2023</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <History className="h-4 w-4 mr-2" /> View Results (9 participants)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Sample hosted quiz */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle>Machine Learning Algorithms</CardTitle>
                    <Button variant="ghost" size="icon" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Hosted 1 time • 15 participants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Last session: May 5, 2023</span>
                      <span>Avg. Score: 68%</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Session #1</span>
                        <span>May 5, 2023</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <History className="h-4 w-4 mr-2" /> View Results (15 participants)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <h2 className="text-xl font-bold">Your Quiz Performance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-quiz-primary">8</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-quiz-primary">76%</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-4xl font-bold text-quiz-primary">#12</div>
                    <Star className="ml-2 h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-lg font-bold mt-8">Recent Quizzes</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Generative AI Fundamentals</CardTitle>
                    <div className="font-bold">80%</div>
                  </div>
                  <CardDescription>Completed on May 10, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={80} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>4/5 correct answers</span>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link to="/quiz/gen-ai-basics">Retake Quiz</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Machine Learning Algorithms</CardTitle>
                    <div className="font-bold">60%</div>
                  </div>
                  <CardDescription>Completed on May 5, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={60} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>3/5 correct answers</span>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link to="/quiz/ml-algorithms">Retake Quiz</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
