import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { AppDispatch, RootState } from "./redux/store";
import { defaultTodoListAction } from "./redux/todoSlice";

import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const todoList = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [todoDescription, setTodoDescription] = useState("");
  const [status, setStatus] = useState("add");
  const [editedID, setEditedID] = useState("");

  useEffect(() => {
    fetch("https://gorest.co.in/public/v1/todos")
      .then((res) => res.json())
      .then((responseList) => {
        if (todoList.length === 0) {
          const defaultLoadedlist: any = [];
          responseList.data.forEach((each: any) => {
            defaultLoadedlist.push({
              id: uuidv4(),
              description: each.title,
              completed: each.status === "completed",
            });
          });
          dispatch(defaultTodoListAction(defaultLoadedlist));
        }
      });
  }, [todoList.length, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="container">
      <h2>TODO LIST</h2>
      <h3>Add Item</h3>
      <Header
        {...{
          status,
          setStatus,
          setTodoDescription,
          todoDescription,
          editedID,
        }}
      />

      <h3>Todo</h3>
      <ul id="incomplete-tasks">
        <TodoList
          {...{
            todoList,
            title: "inTodo",
            todoDescription,
            setTodoDescription,
            setStatus,
            setEditedID,
          }}
        />
      </ul>

      <h3>Completed</h3>
      <ul id="completed-tasks">
        <TodoList
          {...{
            todoList,
            title: "outTodo",
            todoDescription,
            setTodoDescription,
            setStatus,
            setEditedID,
          }}
        />
      </ul>
    </div>
  );
}

export default App;
