import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";

export interface TodoState {
  tasks: Todo[];
}

const initialState: TodoState = {
  tasks: sessionStorage.getItem('tasks')
    //@ts-ignore
    ? JSON.parse(sessionStorage.getItem('tasks')).map((value) => ({
        ...value,
        edit: false,
      }))
    : [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.tasks.push(action.payload);
        sessionStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          completed: false,
        } as Todo,
      }),
    },
    updateTodo: (state, action) => {
      const index = state.tasks.findIndex((todo) => todo.id === action.payload.id);
      state.tasks[index].description = action.payload.description;
      sessionStorage.setItem('tasks', JSON.stringify(state.tasks));

    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex((todo) => todo.id === action.payload);
      state.tasks.splice(index, 1);
      sessionStorage.setItem('tasks', JSON.stringify(state.tasks));

    },
    defaultTodoListAction:(state, action)=> {
      state.tasks = action.payload
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.tasks.findIndex((todo) => todo.id === action.payload.id);
      state.tasks[index].completed = action.payload.completed;
      sessionStorage.setItem('tasks', JSON.stringify(state.tasks));

    },
  },
});

export const { addTodo, removeTodo, setTodoStatus,defaultTodoListAction ,updateTodo} = todoSlice.actions;
export default todoSlice.reducer;