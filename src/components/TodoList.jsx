import React from 'react';
import { Link } from 'react-router-dom';
import './TodoList.css';

export default function TodoList({ todos, toggleTodoComplete }) {
  if (todos.length === 0) {
    return <li className="no-todos">Список дел пуст или не найдено.</li>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? 'completed' : ''}`}
        >
          <div className="todo-checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoComplete(todo.id, todo.completed)}
            />
          </div>
          <Link to={`/task/${todo.id}`} className="todo-title">
            {todo.title.length > 50
              ? todo.title.slice(0, 50) + '...'
              : todo.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
