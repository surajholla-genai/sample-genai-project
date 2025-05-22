
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import QuizQuestion from '@/components/QuizQuestion';
import Timer from '@/components/Timer';
import QuizResults from '@/components/QuizResults';
import { sampleQuizzes } from '@/data/quizData';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  const quiz = sampleQuizzes.find(q => q.id === quizId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  
  // Initialize answers array with nulls
  useEffect(() => {
    if (quiz) {
      setAnswers(Array(quiz.questions.length).fill(null));
    }
  }, [quiz]);
  
  const handleSelectOption = useCallback((optionIndex: number) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = optionIndex;
      return newAnswers;
    });
  }, [currentQuestionIndex]);
  
  const goToNextQuestion = useCallback(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, quiz]);
  
  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex]);
  
  const handleSubmitQuiz = useCallback(() => {
    setQuizCompleted(true);
    setShowResults(true);
    // Record time taken (for demo we'll just use a random time)
    setTimeTaken(Math.floor(Math.random() * (quiz?.timeLimit || 10) * 60));
  }, [quiz]);
  
  const handleTimeUp = useCallback(() => {
    handleSubmitQuiz();
  }, [handleSubmitQuiz]);
  
  const handleReviewQuiz = useCallback(() => {
    setReviewMode(true);
    setShowResults(false);
    setCurrentQuestionIndex(0);
  }, []);
  
  if (!quiz) {
    return (
      <div className="min-h-screen py-12 px-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
        <p className="text-gray-600 mb-6">The quiz you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/categories">Back to Categories</Link>
        </Button>
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const selectedOption = answers[currentQuestionIndex];
  
  // Count answered questions
  const answeredCount = answers.filter(answer => answer !== null).length;
  
  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-3xl mx-auto">
        {!quizCompleted ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">{quiz.title}</h1>
                <p className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowExitDialog(true)}
              >
                Exit Quiz
              </Button>
            </div>
            
            <div className="mb-6">
              <Timer 
                durationInMinutes={quiz.timeLimit} 
                onTimeUp={handleTimeUp} 
              />
              
              <div className="flex justify-between text-sm mt-2">
                <span>Progress: {answeredCount}/{quiz.questions.length} questions answered</span>
              </div>
            </div>
            
            <QuizQuestion 
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
            />
            
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              
              {isLastQuestion ? (
                <Button 
                  onClick={handleSubmitQuiz}
                  disabled={answers.some(answer => answer === null)}
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={goToNextQuestion}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </>
        ) : showResults ? (
          <QuizResults
            quiz={quiz}
            answers={answers}
            timeTaken={timeTaken}
            onReviewQuiz={handleReviewQuiz}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Review: {quiz.title}</h1>
                <p className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
              </div>
              <Button 
                variant="outline" 
                asChild
              >
                <Link to="/">Finish Review</Link>
              </Button>
            </div>
            
            <QuizQuestion 
              question={currentQuestion}
              selectedOption={answers[currentQuestionIndex]}
              onSelectOption={handleSelectOption}
              showResults={true}
            />
            
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              
              {isLastQuestion ? (
                <Button 
                  asChild
                >
                  <Link to="/">Finish Review</Link>
                </Button>
              ) : (
                <Button onClick={goToNextQuestion}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              Exit Quiz?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost. Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={() => navigate("/")}>
                Exit Quiz
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizPage;
