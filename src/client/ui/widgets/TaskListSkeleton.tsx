import React from "react";

import { TaskItemSkeleton } from "../widgets/TaskItemSkeleton";

export const TaskListSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 w-full">
      <h1 className="text-2x1 font-bold mb-4">Cargando tareas...</h1>
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <TaskItemSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};
