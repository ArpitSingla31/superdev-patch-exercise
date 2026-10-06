import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let current = true;
    setLoading(true);
    setError(null);

    fetchTasks({ query, status, page, pageSize, signal: controller.signal })
      .then((data) => {
        if (!current) return;
        setTasks(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (current && err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (current) setLoading(false);
      });

    return () => {
      current = false;
      controller.abort();
    };
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}
