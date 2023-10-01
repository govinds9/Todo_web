import { useEffect, useState } from "react";
import { Todoprovider } from "./Context";
import { Todoform } from "./Components";
import TodoItem from "./Components/Todoitem";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState(todos);

  const addTodo = (todo) => {
    // setTodos(todo)  esa krenge toh sari value update ho jsyegi issiliye hum use state se prev state lenge

    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => {
      return prev.map((prevto) => (prevto.id === id ? todo : prevto));
    });
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const togggleComplete = (id) => {
    setTodos((prev) => {
      return prev.map((prevto) => {
        return prevto.id === id
          ? { ...prevto, completed: !prevto.completed }
          : prevto;
      });
    });
  };

  // values in localstorage is in string  so we have to conver to json when getting them and convert to string while setting

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      const customPriorityOrder = ["high", "medium", "low"];

      function sortByPriority(taskA, taskB) {
        const priorityA = customPriorityOrder.indexOf(taskA.priority);
        const priorityB = customPriorityOrder.indexOf(taskB.priority);

        return priorityA - priorityB;
      }

      const sortedTasks = todos.slice().sort(sortByPriority);

      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const customPriorityOrder = ["high", "medium", "low"];

    function sortByPriority(taskA, taskB) {
      const priorityA = customPriorityOrder.indexOf(taskA.priority);
      const priorityB = customPriorityOrder.indexOf(taskB.priority);

      return priorityA - priorityB;
    }

    const sortedTasks = todos.slice().sort(sortByPriority);
    setTask(sortedTasks);
  }, [todos]);

  return (
    <Todoprovider
      value={{ todos, addTodo, updateTodo, deleteTodo, togggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <Todoform />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {task.map((todo) => (
              <div key={todo.id} className=" w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  );
}

export default App;
