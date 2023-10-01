import { createContext, useContext } from "react";

export const Todocontext = createContext({
  todos: [{ id: 1, todo: "msg", completed: false, priority: "" }],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  togggleComplete: (id) => {},
});

export const Todoprovider = Todocontext.Provider;

export function useTodo() {
  return useContext(Todocontext);
}
