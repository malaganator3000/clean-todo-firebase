import React from "react";
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface HomeProps {
  tasks: Task[];
}

export const Home: React.FC<HomeProps> = ({ tasks }) => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded ${
              task.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {task.title} {task.completed ? "✔️" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};
