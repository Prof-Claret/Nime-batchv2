import { useState, useEffect } from "react";
export default function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(()=> {
    const token = localStorage.getItem('admin_token');
    if (token) setUser({ token });
  }, []);
  function login(token, userInfo) {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(userInfo));
    setUser(userInfo);
  }
  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
  }
  return { user, login, logout };
}
