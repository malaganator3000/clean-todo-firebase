import React from "react";
import { useState, useEffect } from "react";
import { Todo } from "../../../core/entities/Todo";
import { useGetTodos } from "../../core/hooks/useGetTodos";
import { useCreateTodo } from "../../core/hooks/useCreateTodo";
import { TaskItem } from "./TaskItem";
import { TaskItemSkeleton } from "../widgets/TaskItemSkeleton";
import { TaskInput } from "../widgets/TaskInput";
import { TaskListSkeleton } from "../widgets/TaskListSkeleton";

export interface TasksProps {
  tasks: Todo[];
}

export const TasksList: React.FC<TasksProps> = ({ tasks }) => {
  const [{ data, error, loading }, getTodos] = useGetTodos(tasks);
  const [input, setInput] = useState("");

  const [{ data: dataCreate, loading: loadingCreate }, createTodo] =
    useCreateTodo();

  useEffect(() => {
    getTodos({ query: { page: 1, pageSize: 10 }, cache: true });
  }, []);

  const handleAddTask = () => {
    if (input.trim()) {
      createTodo(input);
      setInput("");
    }
  };

  if (loading) {
    return <TaskListSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-100 w-full">
      <h1 className="text-2x1 font-bold mb-4">Listado de tareas</h1>
      <ul className="space-y-2">
        {data.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {loadingCreate && <TaskItemSkeleton />}{" "}
      </ul>
      <TaskInput input={input} setInput={setInput} onAddTask={handleAddTask} />
    </div>
  );
};
