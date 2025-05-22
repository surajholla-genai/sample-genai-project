
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Quiz, QuizQuestion } from '@/data/quizData';

interface QuizResultsProps {
  quiz: Quiz;
  answers: number[];
  timeTaken: number; // in seconds
  onReviewQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quiz, answers, timeTaken, onReviewQuiz }) => {
  // Calculate score
  const correctAnswers = answers.reduce((count, answer, index) => {
    return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
  }, 0);
  
  const score = Math.round((correctAnswers / quiz.questions.length) * 100);
  
  // Format time taken
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const timeString = `${minutes}m ${seconds}s`;
  
  // Determine pass/fail status (assuming passing score is 70%)
  const isPassed = score >= 70;
  
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: isPassed ? '#8B5CF6' : '#EF4444',
                textColor: '#1A1F2C',
                trailColor: '#E5E7EB',
              })}
            />
          </div>
        </div>
        
        <div className="text-center">
          <Badge className={isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {isPassed ? 'Passed' : 'Failed'}
          </Badge>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">Correct Answers</div>
              <div className="font-bold text-lg">{correctAnswers} / {quiz.questions.length}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">Time Taken</div>
              <div className="font-bold text-lg">{timeString}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button onClick={onReviewQuiz}>Review Answers</Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
