import React, { useState, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import type { Category, CategoryInput } from '../types';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CategoryInput) => Promise<void>;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  category, 
  onSubmit,
  onCancel
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await onSubmit({ name });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Category Name"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      
      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {category ? 'Update' : 'Create'} Category
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;