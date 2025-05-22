
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { QuizQuestion as QuizQuestionType } from '@/data/quizData';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  showResults?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedOption,
  onSelectOption,
  showResults = false
}) => {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 disable-copy">
          {question.question}
        </h3>
        
        <RadioGroup
          value={selectedOption !== null ? selectedOption.toString() : undefined}
          className="space-y-3"
          onValueChange={(value) => onSelectOption(parseInt(value))}
        >
          {question.options.map((option, index) => {
            let optionClass = "border-2 p-4 rounded-lg";
            
            if (showResults) {
              if (index === question.correctAnswer) {
                optionClass += " bg-green-100 border-green-500";
              } else if (index === selectedOption && index !== question.correctAnswer) {
                optionClass += " bg-red-100 border-red-500";
              }
            } else if (index === selectedOption) {
              optionClass += " border-quiz-primary";
            }
            
            return (
              <div key={index} className={optionClass}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${question.id}-${index}`}
                    disabled={showResults} 
                  />
                  <Label 
                    htmlFor={`option-${question.id}-${index}`}
                    className="flex-1 cursor-pointer disable-copy"
                  >
                    {option}
                  </Label>
                </div>
              </div>
            );
          })}
        </RadioGroup>
        
        {showResults && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p className="disable-copy">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
