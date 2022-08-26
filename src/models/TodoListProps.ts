import { Todo } from "./Todo";

export interface TodoListProps {
  todoList: Todo[];
  title: string;
  todoDescription: string;
  setTodoDescription: (description: string) => void;
  setStatus: (status: string) => void;
  setEditedID: (status: string) => void;
}
