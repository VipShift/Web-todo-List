// NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h2>Ошибка 404</h2>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
