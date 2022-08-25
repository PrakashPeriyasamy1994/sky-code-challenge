
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { removeTodo, setTodoStatus, } from "../redux/todoSlice";
import { TodoListProps } from '../models/TodoListProps'

export function TodoList({
  todoList,
  title,
  setTodoDescription,
  todoDescription,
  setStatus,
  setEditedID }: TodoListProps) {


  const dispatch = useDispatch<AppDispatch>();
  const handleEditChange = (e: any, todo: any) => {
    setStatus("edit")
    setTodoDescription(todo.description)
    setEditedID(todo.id)
    const violation: any = document.getElementById("root");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  return (
    <>

      {todoList.map((todo: any) => {
        if (title == "inTodo" ? !todo.completed : todo.completed)
          return (
            <li>
              <div className="checkboxwrapper">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    dispatch(
                      setTodoStatus({ completed: !todo.completed, id: todo.id })
                    );
                  }}
                />
                <label>{todo.description}</label>
                <input type="text" required onChange={(e) => setTodoDescription(e.target.value)}
                  value={todoDescription} />
              </div>

              <div className="button-wrapper">
                <button className="edit"
                  onClick={(e) => {
                    handleEditChange(e, todo)
                  }}>
                  <i className="fa fa-edit"></i> Edit
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    dispatch(removeTodo(todo.id));
                  }}
                >
                  <i className='fa-solid fa-trash-can'></i> Delete
                </button>
              </div>
            </li>
          );
      })}


    </>
  );
}