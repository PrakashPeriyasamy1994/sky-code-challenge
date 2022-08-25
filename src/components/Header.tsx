import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addTodo, updateTodo } from "../redux/todoSlice";
import { HeaderProps } from '../models/HeaderProps'


export function Header({ status, setStatus, todoDescription, setTodoDescription, editedID }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <p>
        <input
          id="new-task"
          type="text"
          onChange={(e) => setTodoDescription(e.target.value)}
          value={todoDescription}
          required
        />
        <button
          onClick={() => {
            if (todoDescription && status == "add") {
              dispatch(addTodo(todoDescription));

            } else {
              dispatch(updateTodo({
                id: editedID,
                description: todoDescription
              }));
            }
            setTodoDescription("");
            setStatus("add")
          }}
        >
          {status == "add" ? "Add" : "Update"}
        </button>
      </p>

    </div>
  );
}