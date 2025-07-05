// TaskPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskPage.css';

import { db } from '../firebase';
import { ref, get, update, remove } from 'firebase/database';

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const snapshot = await get(ref(db, `todos/${id}`));
        if (!snapshot.exists()) {
          navigate('/404');
          return;
        }
        setTask({ id, ...snapshot.val() });
        setLoading(false);
      } catch (err) {
        navigate('/404');
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleChange = (e) => {
    setTask({ ...task, title: e.target.value });
  };

  const handleSave = async () => {
    await update(ref(db, `todos/${id}`), { title: task.title });
    navigate('/list');
  };

  const handleDelete = async () => {
    await remove(ref(db, `todos/${id}`));
    navigate('/list');
  };

  if (loading || !task) return <div>Загрузка задачи...</div>;

  return (
    <div className="task-page">
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h2>
        📃{task.title.slice(0, 10)}
        {task.title.length > 10 ? '...' : ''}
      </h2>
      <textarea value={task.title} onChange={handleChange} rows={4} />
      <div>
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  );
}
