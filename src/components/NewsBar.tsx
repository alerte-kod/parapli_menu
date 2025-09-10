import React, { useState, useEffect } from 'react';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { getActiveNewsEvents } from '../services/newsService';
import type { NewsEvent } from '../types';

const NewsBar: React.FC = () => {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        const events = await getActiveNewsEvents();
        setNewsEvents(events);
      } catch (error) {
        console.error('Error fetching news/events:', error);
      }
    };
    
    fetchNewsEvents();
    
    const interval = setInterval(() => {
      setCurrentIndex((current) => 
        current === newsEvents.length - 1 ? 0 : current + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [newsEvents.length]);
  
  if (newsEvents.length === 0) return null;
  
  const currentItem = newsEvents[currentIndex];
  
  const handlePrevious = () => {
    setCurrentIndex((current) => 
      current === 0 ? newsEvents.length - 1 : current - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((current) => 
      current === newsEvents.length - 1 ? 0 : current + 1
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="h-10 flex items-center justify-between">
          <button 
            onClick={handlePrevious}
            className="p-1 hover:bg-black/5 rounded-full transition-colors md:block hidden"
            aria-label="Previous news"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex items-center gap-2 flex-1 mx-2 overflow-hidden">
            <Bell size={16} className="text-primary animate-bounce shrink-0" />
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded shrink-0 ${
                currentItem.type === 'event' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {currentItem.type === 'event' ? '🎉' : '📢'}
              </span>
              {currentItem.event_date && (
                <span className="text-xs font-medium text-gray-500 shrink-0">
                  {formatDate(currentItem.event_date)}
                </span>
              )}
              <div className="overflow-hidden">
                <p className="text-sm inline-flex items-center gap-2 truncate">
                  <span className="font-medium">{currentItem.title}</span>
                  <span className="text-gray-600">-</span>
                  <span className="text-gray-600">{currentItem.content}</span>
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className="p-1 hover:bg-black/5 rounded-full transition-colors md:block hidden"
            aria-label="Next news"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsBar;