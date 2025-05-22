
import React, { useState } from 'react';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leaderboardData } from '@/data/quizData';

const LeaderboardPage = () => {
  const [period, setPeriod] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  
  // In a real app, this would be filtered data based on the period
  // For this demo, we'll just use the same data for all periods
  const filteredData = leaderboardData;
  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Leaderboard
        </h1>
        <p className="text-gray-600 text-center mb-8">
          See how you rank against other QuistoLearn users
        </p>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <Tabs 
              defaultValue="all-time" 
              onValueChange={(value) => setPeriod(value as any)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <LeaderboardTable entries={filteredData} />
          
          <div className="p-6 bg-gray-50 text-sm text-center text-gray-500">
            Rankings are updated daily at midnight UTC
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
