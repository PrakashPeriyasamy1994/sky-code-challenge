export interface HeaderProps {
  status: string;
  todoDescription: string;
  setStatus: (status: string) => void;
  setTodoDescription: (description: string) => void;
  editedID: string
}