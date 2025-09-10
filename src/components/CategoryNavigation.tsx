import React from 'react';
import { useMenu } from '../context/MenuContext';
import Button from './ui/Button';

const CategoryNavigation: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useMenu();

  return (
    <div className="mt-8 mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={selectedCategory === null ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="min-w-[120px]"
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="min-w-[120px]"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation;