import { useState, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL + '/items/');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setError('Error fetching items');
      }
    } catch (err) {
      setError('Error fetching items');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (item) => {
    setError(null);
    try {
      const response = await fetch(API_URL + '/items/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const newItem = await response.json();
        setItems(prev => [...prev, newItem]);
        return newItem;
      } else {
        setError('Error adding item');
      }
    } catch (err) {
      setError('Error adding item');
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    setError(null);
    try {
      const response = await fetch(API_URL + '/items/' + id, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(prev => prev.filter(item => item._id !== id));
        return true;
      } else {
        setError('Error deleting item');
      }
    } catch (err) {
      setError('Error deleting item');
    }
    return false;
  }, []);

  return { items, loading, error, fetchItems, addItem, deleteItem };
} 