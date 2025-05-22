import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CategoryCard from '@/components/CategoryCard';
import { quizCategories } from '@/data/quizData';

const HomePage = () => {
  const [uploadedQuizzes, setUploadedQuizzes] = useState<any[]>([]);

  useEffect(() => {
    fetch('/quizzes')
      .then(res => res.json())
      .then(data => setUploadedQuizzes(data.filter((q: any) => q.title)));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-quiz-light to-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-quiz-text">
            Learn Through Interactive <span className="text-quiz-primary">Quizzes</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Enhance your knowledge with our engaging quiz platform. Choose from a variety of topics and challenge yourself to improve your skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/categories">Explore Topics</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/create-quiz">Create a Quiz</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Popular Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizCategories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
            {/* Uploaded quizzes as categories */}
            {uploadedQuizzes.map((quiz) => (
              <CategoryCard
                key={quiz.id}
                category={{
                  id: quiz.id,
                  name: quiz.title,
                  description: `Uploaded quiz: ${quiz.title}`,
                  image: '',
                  quizCount: quiz.questions?.length || 1,
                }}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            How QuistoLearn Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-quiz-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Choose a Topic</h3>
              <p className="text-gray-600">Browse through our extensive library of topics and select the one you want to learn about.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-quiz-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Take the Quiz</h3>
              <p className="text-gray-600">Answer questions, learn from explanations, and track your progress as you go.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-quiz-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Master the Subject</h3>
              <p className="text-gray-600">Review your results, learn from your mistakes, and become an expert in your chosen field.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
