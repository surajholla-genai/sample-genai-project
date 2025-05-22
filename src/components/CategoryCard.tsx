
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { QuizCategory } from '@/data/quizData';

interface CategoryCardProps {
  category: QuizCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/categories/${category.id}`} className="block transform hover:scale-[1.02] transition-all">
      <Card className="overflow-hidden h-full border-2 border-transparent hover:border-quiz-primary">
        <div className="relative h-40 bg-gradient-to-r from-quiz-primary to-quiz-accent">
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-white opacity-50">
            {category.name.charAt(0)}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-2">{category.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{category.description}</p>
        </CardContent>
        <CardFooter className="border-t p-4 bg-gray-50">
          <span className="text-sm text-quiz-primary font-medium">
            {category.quizCount} {category.quizCount === 1 ? 'Quiz' : 'Quizzes'} Available
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CategoryCard;
