// TodoForm.jsx
import React from 'react';
import './TodoForm.css';

export default function TodoForm({ newTodoText, setNewTodoText, addTodo }) {
  return (
    <form onSubmit={addTodo} className="todo-form">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Добавить новое дело..."
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        Добавить
      </button>
    </form>
  );
}
