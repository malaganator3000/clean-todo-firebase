import React from "react";

import { Button } from "../elements/Button";
import { Checkbox } from "../elements/Checkbox";
import { Todo } from "../../../core/entities/Todo";
import { Spinner } from "../elements/Spinner";
import { useRemoveTodo } from "../../core/hooks/useRemoveTodo";
import { useUpdateTodo } from "../../core/hooks/useUpdateTodo";

export interface TaskItemProps {
  task: Todo;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [{ data: dataRemove, loading: loadingRemove }, removeTodo] =
    useRemoveTodo();
  const [{ data: dataUpdate, loading: loadingUpdate }, updateTodo] =
    useUpdateTodo();

  const handleRemoveTask = (todo: Todo) => {
    removeTodo(todo);
  };

  const handleUpdateTask = (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(updatedTodo);
  };

  return (
    <li
      className={`p-4 rounded ${
        task.completed ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">{task.title}</span>
          {loadingUpdate ? <Spinner /> : task.completed ? "✔️" : "❌"}
        </div>

        <div className="mr-10 flex items-center space-x-2">
          <div className="w-32 flex justify-center">
            {loadingRemove ? (
              <Spinner />
            ) : (
              <Button
                onClick={() => handleRemoveTask(task)}
                disabled={loadingUpdate}
              >
                Remove Task
              </Button>
            )}
          </div>

          <Checkbox
            checked={task.completed}
            onChange={() => handleUpdateTask(task)}
          />
        </div>
      </div>
    </li>
  );
};
