import React from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../redux/store";
import { removeTodo, setTodoStatus } from "../redux/todoSlice";
import { TodoListProps } from "../models/TodoListProps";
import { Todo } from "../models/Todo";

function TodoList({
  todoList,
  title,
  setTodoDescription,
  todoDescription,
  setStatus,
  setEditedID,
}: TodoListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleEditChange = (e: any, todo: any) => {
    setStatus("edit");
    setTodoDescription(todo.description);
    setEditedID(todo.id);
    const violation: any = document.getElementById("root");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      {todoList.map((todo: Todo) => {
        if (title === "inTodo" ? !todo.completed : todo.completed) {
          return (
            <li>
              <div className="checkboxwrapper">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    dispatch(
                      setTodoStatus({
                        completed: !todo.completed,
                        id: todo.id,
                      }),
                    );
                  }}
                />
                <label htmlFor="description">{todo.description}</label>
                <input
                  id="description"
                  type="text"
                  required
                  onChange={(e) => setTodoDescription(e.target.value)}
                  value={todoDescription}
                />
              </div>

              <div className="button-wrapper">
                <button
                  type="button"
                  className="edit"
                  onClick={(e) => {
                    handleEditChange(e, todo);
                  }}
                >
                  <i className="fa fa-edit" /> Edit
                </button>
                <button
                  type="button"
                  className="delete"
                  onClick={() => {
                    dispatch(removeTodo(todo.id));
                  }}
                >
                  <i className="fa-solid fa-trash-can" /> Delete
                </button>
              </div>
            </li>
          );
        }
        return null;
      })}
    </>
  );
}

export default TodoList;
