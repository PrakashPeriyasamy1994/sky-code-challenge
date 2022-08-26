import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";

export const store = configureStore({
  reducer: todosReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
