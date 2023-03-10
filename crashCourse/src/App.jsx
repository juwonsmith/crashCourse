import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodoRef = useRef(null);

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem("todos"));
    if (storeTodos) {
      setTodos(storeTodos);
    }
  }, []);
  const addTodo = (e) => {
    e.preventDefault();
    if (addTodoRef.current.value === "") {
      return;
    }
    const todo = {
      id: Date.now(),
      completed: false,
      title: addTodoRef.current.value,
    };
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    console.log(newTodos);

    // reset input field
    addTodoRef.current.value = "";
    addTodoRef.current.focus();
  };

  const updateList = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  const updateTodo = (id) => {
    const newTods = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    updateList(newTods);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    updateList(newTodos);
  };
  return (
    <main className="flex flex-col gap-4 w-full items-center p-4">
      <h1 className="font-bold text-4xl text-black">Things to do!</h1>

      <form className="flex gap-4">
        <input
          type="text"
          placeholder="what to do"
          autoFocus
          className="border-2 border-gray-300 p-2 rounded-md"
          ref={addTodoRef}
        />
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-md"
          type="submit"
          onClick={(e) => addTodo(e)}
        >
          Add
        </button>
        <button
          className="bg-red-500 text-white px-5 py-2 rounded-md"
          type="button"
          onClick={() => {
            clearCompleted();
          }}
        >
          Clear Done
        </button>
      </form>

      <TodoList todos={todos} updateList={updateTodo} />
    </main>
  );
}

export default App;
