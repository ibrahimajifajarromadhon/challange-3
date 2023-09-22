import { useEffect, useState } from "react";
import TodoItem from "./ToDoItem";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false)
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false)
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const filteredData =
    filter === "all"
      ? todos
      : filter === "complete"
        ? todos.filter((item) => item.complete === true)
        : filter === "todo" &&
        todos.filter((item) => item.complete === false);

  return (
    <>
      <div className="search-form">
        <h2>Search</h2>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="add-button" onClick={TodoList}>Cari</span>
      </div>
      <div className="listButton">
        <button className="filter-button" onClick={() => setFilter("all")}>All</button>
        <button className="filter-button" onClick={() => setFilter("complete")}>Done</button>
        <button className="filter-button" onClick={() => setFilter("todo")}>Todo</button>
      </div>
      <ul id="todo-list">
        {filteredData.filter((item) => {
          return search.toLowerCase() === ''
            ? item
            : item.task.toLowerCase().includes(search);
        }).map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;