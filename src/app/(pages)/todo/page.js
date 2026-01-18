'use client';

import { useState, useEffect } from 'react';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // ローカルストレージからTodoを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Todoが変更されたらローカルストレージに保存
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Todoを追加
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Todoを削除
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Todoの完了状態をトグル
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 全ての完了したTodoを削除
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // フィルタリングされたTodoを取得
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          Todo アプリ
        </h1>

        {/* 入力フォーム */}
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="新しいタスクを入力..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              追加
            </button>
          </div>
        </form>

        {/* フィルターボタン */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'active'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            未完了
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            完了
          </button>
        </div>

        {/* Todoリスト */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {filteredTodos.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              {filter === 'all' && 'タスクがありません'}
              {filter === 'active' && '未完了のタスクがありません'}
              {filter === 'completed' && '完了したタスクがありません'}
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* フッター */}
        {todos.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>
              残り {activeCount} 件のタスク
            </span>
            {todos.some((todo) => todo.completed) && (
              <button
                onClick={clearCompleted}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                完了済みを削除
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
