import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './App.css';

import { useTodos } from './hooks/useTodos';

import TodoForm from './components/TodoForm';
import TodoControls from './components/TodoControls';
import TodoList from './components/TodoList';
import TaskPage from './components/TaskPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  const {
    todos,
    loading,
    error,
    newTodoText,
    setNewTodoText,
    searchTerm,
    setSearchTerm,
    sortByAlphabet,
    setSortByAlphabet,
    addTodo,
    toggleTodoComplete,
  } = useTodos();

  if (loading) return <div className="container">Загрузка списка дел...</div>;
  if (error) return <div className="container error">Ошибка: {error}</div>;

  const ExtendedLink = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'nav-link active' : ' nav-link')}
    >
      {children}
    </NavLink>
  );
  return (
    <div className="container glass-container">
      <h1 className="main-title">ToDo-List</h1>
      <nav>
        <ExtendedLink to="/">Добавить</ExtendedLink>
        <br />
        <ExtendedLink to="/list">Список-дел</ExtendedLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TodoForm
                newTodoText={newTodoText}
                setNewTodoText={setNewTodoText}
                addTodo={addTodo}
              />
            </>
          }
        />

        <Route
          path="/list"
          element={
            <>
              <TodoControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortByAlphabet={sortByAlphabet}
                setSortByAlphabet={setSortByAlphabet}
              />
              <TodoList todos={todos} toggleTodoComplete={toggleTodoComplete} />
            </>
          }
        />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
