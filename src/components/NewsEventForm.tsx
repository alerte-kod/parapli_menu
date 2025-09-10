import React, { useState, useEffect } from 'react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Select from './ui/Select';
import Button from './ui/Button';
import type { NewsEvent, NewsEventInput } from '../types';

interface NewsEventFormProps {
  item?: NewsEvent;
  onSubmit: (data: NewsEventInput) => Promise<void>;
  onCancel: () => void;
}

const NewsEventForm: React.FC<NewsEventFormProps> = ({
  item,
  onSubmit,
  onCancel
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NewsEventInput>({
    title: '',
    content: '',
    type: 'news',
    active: true,
    event_date: undefined
  });
  
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        content: item.content,
        type: item.type,
        active: item.active,
        event_date: item.event_date
      });
    }
  }, [item]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value as 'news' | 'event' });
  };
  
  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, active: e.target.checked });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        fullWidth
      />
      
      <TextArea
        label="Content"
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        rows={4}
        required
        fullWidth
      />
      
      <Select
        label="Type"
        id="type"
        name="type"
        value={formData.type}
        onChange={handleTypeChange}
        options={[
          { value: 'news', label: 'News' },
          { value: 'event', label: 'Event' }
        ]}
        required
        fullWidth
      />

      {formData.type === 'event' && (
        <Input
          label="Event Date"
          id="event_date"
          name="event_date"
          type="date"
          value={formData.event_date || ''}
          onChange={handleChange}
          required
          fullWidth
        />
      )}
      
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="active"
          name="active"
          checked={formData.active}
          onChange={handleActiveChange}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="active" className="text-sm text-gray-700">
          Active
        </label>
      </div>
      
      <div className="flex justify-end gap-2">
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
          {item ? 'Update' : 'Create'} {formData.type === 'news' ? 'News' : 'Event'}
        </Button>
      </div>
    </form>
  );
};

export default NewsEventForm