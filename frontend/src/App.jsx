import React, {useEffect, useState} from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  // 一覧取得
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}todos/`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 新規作成(POST)
  const addTodos = async () => {
    if (newTitle.trim() === '') return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle}),
      });
      setNewTitle('');
      fetchTodos(); //一覧を更新
    } catch (err) {
      console.log('Error adding todo:', err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}todos/${todo.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_completed: !todo.is_completed}),
      });
      fetchTodos(); //再読み込み
    } catch(err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}todos/${id}/`, {
        method: 'DELETE',
      });
      fetchTodos(); // 一覧を際取得
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial"}}>
      <h1>Todo List</h1>

      {/* 入力フォーム */}
      <div style={{ marginBottom: "1rem"}}>
        <input
        type="text" 
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder='New todo'
        style={{ padding: "0.5rem", marginRight: "0.5rem"}}
        />
        <button onClick={addTodos} style={{ padding: "0.5rem 1rem"}}>
          Add
        </button>
      </div>

      {/* Todo一覧 */}
      {todos.length === 0 ? (
        <p>No todos yes.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
               type='checkbox'
               checked={todo.is_completed}
               onChange={() => toggleComplete(todo)}
               style={{ marginRight: "0.5rem"}}
               />
              <span style={{ textDecoration: todo.is_completed ? "line-through" : "none"}}>
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)} style={{ color: 'red'}}>
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App