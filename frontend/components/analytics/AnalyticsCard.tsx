
import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: number;
  bgColor: string;
  progress: number;
}

const AnalyticsCard = ({ title, value, change, bgColor, progress }: AnalyticsCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{title}</span>
        <span className="text-sm font-medium text-green-600">+{change}%</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 mt-2">
        {value}
      </div>
      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ 
            width: `${progress}%`,
            backgroundColor: bgColor === 'bg-indigo-50' ? '#6366f1' : 
                            bgColor === 'bg-pink-50' ? '#ec4899' : 
                            bgColor === 'bg-blue-50' ? '#3b82f6' : 
                            '#22c55e'
          }}
        ></div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
