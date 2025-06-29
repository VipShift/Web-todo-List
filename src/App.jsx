import React, { useState, useEffect, useCallback } from 'react';
import { db } from './firebase'; // Предполагается, что 'firebase.js' экспортирует 'db'
import {
  ref,
  onValue,
  push,
  remove,
  update as firebaseUpdate,
} from 'firebase/database'; // Импортируем 'update' как 'firebaseUpdate'
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  // --- Загрузка данных из Firebase ---
  useEffect(() => {
    const todosDbRef = ref(db, 'todos');

    // onValue возвращает функцию отписки, которую нужно вернуть из useEffect
    const unsubscribe = onValue(
      todosDbRef,
      (snapshot) => {
        setLoading(true);
        setError(null);
        const todosData = snapshot.val();
        const loadedTodos = [];
        if (todosData) {
          childSnapshot.key;
          for (let id in todosData) {
            loadedTodos.push({ id, ...todosData[id] });
          }
        }
        setTodos(loadedTodos);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      await push(ref(db, 'todos'), {
        title: newTodoText,
        completed: false,
      });
      setNewTodoText('');
    } catch (err) {
      setError(`Ошибка при добавлении: ${err.message}`);
    }
  };

  const toggleTodoComplete = async (id, currentCompleted) => {
    try {
      await firebaseUpdate(ref(db, `todos/${id}`), {
        completed: !currentCompleted,
      });
    } catch (err) {
      setError(`Ошибка при обновлении: ${err.message}`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await remove(ref(db, `todos/${id}`));
    } catch (err) {
      setError(`Ошибка при удалении: ${err.message}`);
    }
  };

  const filteredAndSortedTodos = [...todos]
    .filter(
      (todo) =>
        todo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.text?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByAlphabet) {
        const titleA = a.title || a.text || '';
        const titleB = b.title || b.text || '';
        return titleA.localeCompare(titleB);
      }

      return 0;
    });

  // --- UI компоненты ---
  if (loading) return <div className="container">Загрузка списка дел...</div>;
  if (error) return <div className="container error">Ошибка: {error}</div>;

  return (
    <div className="container glass-container">
      <h1 className="main-title">ToDo-List (Firebase)</h1>

      <form onSubmit={addTodo} className="add-todo-form form-glass">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Добавить новое дело..."
          className="add-todo-input input-glass"
        />
        <button type="submit" className="add-todo-button button-glass">
          Добавить
        </button>
      </form>

      <div className="controls form-glass">
        <input
          type="text"
          placeholder="Поиск по делам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input input-glass"
        />
        <button
          onClick={() => setSortByAlphabet(!sortByAlphabet)}
          className={`sort-button button-glass ${
            sortByAlphabet ? 'active' : ''
          }`}
        >
          Сортировать по алфавиту {sortByAlphabet ? '✓' : ''}
        </button>
      </div>

      <ul className="todo-list">
        {filteredAndSortedTodos.length === 0 ? (
          <li className="no-todos">Список дел пуст или не найдено.</li>
        ) : (
          filteredAndSortedTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item glass-item ${
                todo.completed ? 'completed' : ''
              }`}
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
                  className="delete-button button-glass"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
