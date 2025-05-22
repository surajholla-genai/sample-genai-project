
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';
import QuizCard from '@/components/QuizCard';
import { quizCategories, sampleQuizzes } from '@/data/quizData';

const CategoryQuizzesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = useMemo(() => 
    quizCategories.find(c => c.id === categoryId), 
    [categoryId]
  );
  
  const categoryQuizzes = useMemo(() => 
    sampleQuizzes.filter(quiz => quiz.categoryId === categoryId),
    [categoryId]
  );
  
  if (!category) {
    return (
      <div className="min-h-screen py-12 px-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/categories">Back to Categories</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/categories" className="flex items-center">
              <ChevronLeft className="h-5 w-5 mr-1" /> Back to Categories
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {category.name}
        </h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          {category.description}
        </p>
        
        {categoryQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-500">No quizzes available for this category yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryQuizzesPage;
