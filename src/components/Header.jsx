import { useState } from "react";

const Header = ({ setRefresh }) => {
    const [task, setTask] = useState("");

    const addTodo = () => {
        const newTodo = { task, complete: false }
        if (task == "") {
            alert('List tidak boleh kosong,');
        } else {
            fetch('http://localhost:8000/todos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            }).then(() => {
                setTask("")
                setRefresh(true)

                setTimeout(() => {
                    alert('List berhasil ditambahkan.')
                }, 500)
            });
        }
    }

    return (
        <div id="todo-header" className="header">
            <h2>Simple Todo App</h2>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <span className="add-button" onClick={addTodo}>Add</span>
        </div>
    );
};

export default Header;