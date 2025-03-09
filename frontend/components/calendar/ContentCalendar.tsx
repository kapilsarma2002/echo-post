
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Post } from "@/types/post";

interface ContentCalendarProps {
  posts: Post[];
  calendarView: string;
  onChangeView: (view: string) => void;
  onDateClick: (date: number) => void;
}

const ContentCalendar = ({ posts, calendarView, onChangeView, onDateClick }: ContentCalendarProps) => {
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    // This is a simplified calendar logic
    // In a real app, you'd want to use a date library to handle actual dates
    
    // Add some empty cells for the start of the month (not in current month)
    for (let i = 0; i < 5; i++) {
      days.push({ date: 26 + i, isCurrentMonth: false, hasPost: false, isToday: false });
    }
    
    // Current month days
    for (let i = 1; i <= 31; i++) {
      // Check if date has any posts
      const hasPost = posts.some(post => {
        const postDate = post.date.toLowerCase();
        if (postDate === 'today') return i === 14; // Example: today is 14th
        if (postDate === 'tomorrow') return i === 15; // Example: tomorrow is 15th
        
        // For dates like "Jul 15"
        const match = postDate.match(/(\w+)\s+(\d+)/);
        if (match) {
          const day = parseInt(match[2]);
          return day === i;
        }
        
        return false;
      });
      
      days.push({ 
        date: i, 
        isCurrentMonth: true, 
        hasPost, 
        isToday: i === 14 // Example: today is 14th
      });
    }
    
    // Fill remaining cells for next month
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ date: i, isCurrentMonth: false, hasPost: false, isToday: false });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Content Calendar</h2>
        <div className="flex space-x-2">
          <Button 
            variant={calendarView === 'month' ? 'outline' : 'ghost'} 
            size="sm"
            onClick={() => onChangeView('month')}
          >
            Month
          </Button>
          <Button 
            variant={calendarView === 'week' ? 'outline' : 'ghost'} 
            size="sm"
            onClick={() => onChangeView('week')}
          >
            Week
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500 py-1">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            onClick={() => day.isCurrentMonth && onDateClick(day.date)}
            className={`aspect-square rounded-md flex flex-col items-center justify-start p-1
              ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'} 
              ${day.isToday ? 'ring-2 ring-indigo-500' : ''}
              ${day.isCurrentMonth ? 'cursor-pointer' : 'cursor-default'}
              border border-gray-100 hover:border-gray-300 transition-colors
            `}
          >
            {day.isCurrentMonth && (
              <>
                <span className={`text-xs font-medium ${day.isToday ? 'text-indigo-600' : 'text-gray-700'}`}>
                  {day.date}
                </span>
                {day.hasPost && (
                  <div className="mt-auto mb-1 w-full flex justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCalendar;
