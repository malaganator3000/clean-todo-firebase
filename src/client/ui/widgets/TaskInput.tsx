import React from "react";

export interface TaskInputProps {
  input: string;
  setInput: (input: string) => void;
  onAddTask: () => void;
}

import { Button } from "../elements/Button";

export const TaskInput: React.FC<TaskInputProps> = ({
  input,
  setInput,
  onAddTask,
}) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <Button onClick={onAddTask}>Add Task</Button>
    </div>
  );
};
