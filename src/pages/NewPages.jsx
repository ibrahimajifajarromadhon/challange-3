import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {

  const [task, settask] = useState('');

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
      settask('');
    });
  };

  console.log(settask);
  return (
    <>
      <Container className="mt-2">
        <Row className="header-new">
          <div id="todo-header">
            <h2>TodoList</h2>
            <input type="text" value={task} onChange={(e) => settask(e.target.value)} placeholder="Add Todo..." />
            <span
              className="add-button"
              onClick={() => {
                addTodo();
                alert("Task berhasil ditambahkan");
              }}
            >
              Add
            </span>
          </div>
        </Row>

        <Row>
          <Col className="col-5"></Col>
          <Col>
            <Link to="/">
              <span className="add-back">Back to Home</span>
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
