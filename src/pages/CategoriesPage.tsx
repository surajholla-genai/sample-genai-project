
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import CategoryCard from '@/components/CategoryCard';
import { quizCategories } from '@/data/quizData';
import { Search } from 'lucide-react';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCategories = searchTerm 
    ? quizCategories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : quizCategories;
  
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Quiz Categories
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Explore our diverse range of quiz categories and find the perfect topic to expand your knowledge.
        </p>
        
        <div className="relative mb-10 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No categories found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
