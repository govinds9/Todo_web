import React, { useState } from "react";
import { useTodo } from "../Context";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("high");
  const { addTodo } = useTodo();

  const addit = (e) => {
    e.preventDefault();
    if (!todo) return;

    addTodo({ todo, completed: false, priority });
    setTodo("");
  };

  return (
    <form className="flex" onSubmit={addit}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <label
        htmlFor="priority"
        className=" text-white shrink-0 bg-green-600 rounded-l-lg px-3 py-1 "
      >
        Set Priority:
      </label>
      <select
        id="priority"
        name="priority"
        value={priority}
        className="block w-40 px-3 py-1 bg-white text-black font-bold focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:outline-none "
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
