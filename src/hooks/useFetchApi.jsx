import { useState } from 'react';

export const useFetchApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = async (url) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};
