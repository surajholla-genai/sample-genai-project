
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quiz } from '@/data/quizData';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  }[quiz.difficulty];
  
  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">{quiz.title}</h3>
          <Badge className={difficultyColor}>{quiz.difficulty}</Badge>
        </div>
        <p className="text-sm text-gray-500 mb-4">{quiz.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {quiz.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          <div>Questions: {quiz.questions.length}</div>
          <div>Time Limit: {quiz.timeLimit} minutes</div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 bg-gray-50">
        <div className="w-full flex justify-between items-center">
          <span className="text-xs text-gray-500">Created: {quiz.createdAt}</span>
          <Button asChild>
            <Link to={`/quiz/${quiz.id}`}>Start Quiz</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
