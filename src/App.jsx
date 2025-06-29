import React from 'react';
import './App.css';

import { useTodos } from './hooks/useTodos';

import TodoForm from './components/TodoForm';
import TodoControls from './components/TodoControls';
import TodoList from './components/TodoList';

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
    deleteTodo,
  } = useTodos();

  if (loading) return <div className="container">Загрузка списка дел...</div>;
  if (error) return <div className="container error">Ошибка: {error}</div>;

  return (
    <div className="container glass-container">
      <h1 className="main-title">ToDo-List (Firebase)</h1>
      <TodoForm
        newTodoText={newTodoText}
        setNewTodoText={setNewTodoText}
        addTodo={addTodo}
      />
      <TodoControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortByAlphabet={sortByAlphabet}
        setSortByAlphabet={setSortByAlphabet}
      />
      <TodoList
        todos={todos}
        toggleTodoComplete={toggleTodoComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
