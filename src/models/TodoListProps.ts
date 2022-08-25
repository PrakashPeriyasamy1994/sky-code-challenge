export interface TodoListProps {
  todoList: any,
  title: string,
  todoDescription: string;
  setTodoDescription: (description: string) => void;
  setStatus: (status: string) => void;
  setEditedID: (status: string) => void;
}