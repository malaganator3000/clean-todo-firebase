import React from "react";
export const TaskItemSkeleton: React.FC = () => {
    return (
      <li className="p-4 rounded bg-gray-200 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
      </li>
    );
  };