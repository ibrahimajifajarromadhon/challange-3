import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";
import React, { useState } from "react";

const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setnewTask] = useState(todo.task);

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then(() => {
        console.log("Task berhasil diupdate.");
        setRefresh(true);
      });
  };

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Task berhasil dihapus.");
        setRefresh(true);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    todo.task = newTask;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then(() => {
        console.log("Task berhasil diupdate.");
        setRefresh(true);
        setIsEditing(false); 
      });
  };

  const handletaskChange = (e) => {
    setnewTask(e.target.value);
  };

  return (
    <div className="todo-task">
      <li className={`${todo.complete ? "checked" : ""}`}>
        {isEditing ? (
          <div className="editTask">
            <input
              type="text"
              className="edit-task"
              value={newTask}
              onChange={handletaskChange}
            />
            <button className="btn-edit" onClick={handleSaveClick}>Simpan</button>
          </div>
        ) : (
          <div>{todo.task}</div>
        )}
        
        <input
          className="check"
          type="checkbox"
          onClick={updateTodo}
        />

        <span onClick={isEditing ? handleSaveClick : handleEditClick} className="text-warning">
          <PencilSquare className="text-warning" />
        </span>
        <span onClick={deleteTodo} className="text-danger">
          <Trash3Fill className="text-danger" />
        </span>
      </li>
    </div>
  );
};

export default TodoItem;