import React from 'react';
import './TodoList.css';

export default function TodoList({ todos, toggleTodoComplete, deleteTodo }) {
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
          <span
            className="todo-title"
            onClick={() => toggleTodoComplete(todo.id, todo.completed)}
          >
            {todo.title || todo.text}
          </span>
          <div className="todo-actions">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoComplete(todo.id, todo.completed)}
              title="Отметить как выполненное"
            />
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
