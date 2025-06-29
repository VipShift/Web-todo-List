import React from 'react';
import './TodoControls.css';

export default function TodoControls({
  searchTerm,
  setSearchTerm,
  sortByAlphabet,
  setSortByAlphabet,
}) {
  return (
    <div className="todo-controls">
      <input
        type="text"
        placeholder="Поиск по делам..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button
        onClick={() => setSortByAlphabet(!sortByAlphabet)}
        className={`sort-button ${sortByAlphabet ? 'active' : ''}`}
      >
        Сортировать по алфавиту {sortByAlphabet ? '✓' : ''}
      </button>
    </div>
  );
}
