import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import SelectItems from "./components/SelectItems";
import RemoveAll from './components/RemoveAll';

function App() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json());
      setTodos(result.slice(0, 5));
      setLoading(false);
    }
    fetchData();
  }, []);

  function onChange(ev) {
    const value = ev.target.value;
    setNewTodo(value);
  }

  function addTodo(ev) {
    ev.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false
    };
    setSaving(true);
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(value)
    })
      .then(res => res.json())
      .then(data => {
        setTodos(todos.concat({ ...data, id: value.id }));
        setSaving(false);
      });
  }

  function removeTodo(_id) {
    setTodos(todos.filter(t => t.id !== _id));
  }

  function updateTodo(_id) {
    const newList = todos.map(t => {
      if (t.id === _id) {
        const updatedItem = { ...t, completed: !t.completed };
        return updatedItem;
      }
      return t;
    });
    setTodos(newList);
  }

  function selectAll() {
    const newList = todos.map(t => {
      t.completed=true;
      return t;
    });
    setTodos(newList);
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json());
      setTodos(result.slice(0, 5));
      setLoading(false);
    }
    fetchData();
  }, []);

  function removeTodos() {
    setTodos([]);
  }

  return (
    <div className="App">
      <h1 className="header">My Todo List</h1>
      {loading ? "Loading..." : (
        <TodoList
          className="todoList"
          todos={todos}
          removeHandler={removeTodo}
          updateTodo={updateTodo}
          removeTodos={removeTodos}
        />
      )}

      <div className="add-todo-form">
        {saving ? "Saving..." : (
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange} />
            <button type="submit">Add New Todo</button>
          </form>
        )}
        <SelectItems handleOnClickSelectAll={selectAll} />
        <RemoveAll removeAllHandler={removeTodos} />
      </div>

    </div>
  );
}

export default App;