import { Model } from "./Model";

export interface TodoParams {
  id: string;
  title: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Todo extends Model {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
