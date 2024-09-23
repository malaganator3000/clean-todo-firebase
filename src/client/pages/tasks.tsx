import React, { useEffect, useState } from "react";
import { Todo } from "../../core/entities/Todo";
import { TasksList } from "../ui//blocks/TaskList";
export interface TasksProps {
  tasks: Todo[];
}

export const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  return <TasksList tasks={tasks} />;
};
