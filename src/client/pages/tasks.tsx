import React, { useState } from "react";
import { Task } from "./home";
export interface TasksProps {
  tasks: Task[];
}

export const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const [tareas, setTareas] = useState(tasks);
  const [input, setInput] = useState("");

  const getTask = (tasks: Task[], id: number): Task | null => {
    const task = tasks.find((t) => (t.id == id));
    if (!task) {
      return null;
    }

    return task;
  };
  const addTask = (tasks: Task[], title: string): Task[] => {
    const lastTask = tasks[tasks.length - 1];
    const newTask: Task = {
      id: lastTask ? lastTask.id + 1 : 1,
      title,
      completed: false,
    };
    tasks.push(newTask);
    return tasks;
  };

  const removeTask = (tasks: Task[], id: number): Task[] => {
    const task = getTask(tasks, id);
    if (task) {
      tasks.splice(tasks.indexOf(task), 1);
    }
    return tasks;
  };

  const updateTask = (tasks: Task[], id: number, status: boolean): Task[] => {
    const task = getTask(tasks, id);
    if (task) {
      task.completed = status;
    }
    return tasks;
  };

  const handleAddTask = () => {
    if (input.trim()) {
      const updatedTasks = addTask([...tareas], input);
      setTareas(updatedTasks);
      setInput("");
    }
  };

  const handleRemoveTask = (id: number) => {
    const tasks = [...tareas]
    const updatedTasks = removeTask(tasks, id);
    setTareas(updatedTasks);
  };

  const handleUpdateTask = (id: number, status: boolean) => {
    const updatedTasks = updateTask([...tareas], id, status);
    setTareas(updatedTasks);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2x1 font-bold mb-4">Listado de tareas</h1>
      <ul className="space-y-2">
        {tareas.map((t) => (
          <li
            key={t.id}
            className={`p-4 rounded ${
              t.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {t.title} {t.completed ? "✔️" : "❌"}
            <div className="mr-10">
              <button
                onClick={() => handleRemoveTask(t.id)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Remove Task
              </button>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleUpdateTask(t.id, !t.completed)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};
