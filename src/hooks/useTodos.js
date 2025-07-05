// hooks/useTodos.js
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  ref,
  onValue,
  push,
  remove,
  update as firebaseUpdate,
} from 'firebase/database';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  // Загрузка данных из Firebase
  useEffect(() => {
    const todosDbRef = ref(db, 'todos');
    const unsubscribe = onValue(
      todosDbRef,
      (snapshot) => {
        setLoading(true);
        setError(null);
        const todosData = snapshot.val();
        const loadedTodos = [];
        if (todosData) {
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
    return () => unsubscribe();
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
    .filter((todo) =>
      (todo.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByAlphabet) {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

  return {
    todos: filteredAndSortedTodos,
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
  };
}
