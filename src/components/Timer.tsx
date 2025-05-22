
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface TimerProps {
  durationInMinutes: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ durationInMinutes, onTimeUp }) => {
  const totalSeconds = durationInMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }
    
    if (!isPaused) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [secondsLeft, isPaused, onTimeUp]);
  
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  
  const progressValue = (secondsLeft / totalSeconds) * 100;
  
  // Define color based on remaining time
  let progressColor = "bg-green-500";
  if (progressValue < 50) progressColor = "bg-yellow-500";
  if (progressValue < 20) progressColor = "bg-red-500";
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-gray-700">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">Time Remaining:</span>
        </div>
        <div className="text-sm font-medium">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      <Progress value={progressValue} className={`h-2 ${progressColor}`} />
    </div>
  );
};

export default Timer;
