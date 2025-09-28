import React, { useState } from "react";
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function handle(e){
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('admin_token', res.data.token);
      localStorage.setItem('admin_user', JSON.stringify(res.data.user));
      nav('/admin/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06060a] text-white p-4">
      <form onSubmit={handle} className="bg-[#0b0f1a] p-6 rounded w-full max-w-sm">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="w-full p-2 mb-4 rounded bg-gray-800" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full p-2 bg-indigo-600 rounded">Login</button>
      </form>
    </div>
  );
}
