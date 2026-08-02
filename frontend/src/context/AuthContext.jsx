import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Registered users state with localStorage persistence
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('interntrack_registered_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('interntrack_user');
    return saved ? JSON.parse(saved) : null; // Default logged out
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('interntrack_theme') === 'dark';
  });

  // Cross-tab / Multi-session Realtime Storage Synchronization Listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'interntrack_registered_users' && e.newValue) {
        setUsers(JSON.parse(e.newValue));
      }
      if (e.key === 'interntrack_user') {
        setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('interntrack_registered_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('interntrack_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('interntrack_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        localStorage.setItem('interntrack_user', JSON.stringify(data.user));
        localStorage.setItem('interntrack_token', data.token);
        return data.user;
      }
    } catch (e) {
      // Fallback to local authentication logic
    }

    // Special check for primary Admin Ammad123 / friendly
    if (username.toLowerCase() === 'ammad123' && password === 'friendly') {
      const adminUser = users.find(u => u.username.toLowerCase() === 'ammad123') || initialUsers[0];
      setCurrentUser(adminUser);
      localStorage.setItem('interntrack_user', JSON.stringify(adminUser));
      return adminUser;
    }

    // Search in registered users array
    const found = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('interntrack_user', JSON.stringify(found));
      return found;
    }

    throw new Error('Invalid username or password');
  };

  const register = async (userData) => {
    // Check if username is already taken
    const existing = users.find(u => u.username.toLowerCase() === userData.username.toLowerCase());
    if (existing) {
      throw new Error('Username is already taken. Please choose another.');
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setUsers(prev => {
          const updated = [...prev, data.user];
          localStorage.setItem('interntrack_registered_users', JSON.stringify(updated));
          return updated;
        });
        localStorage.setItem('interntrack_user', JSON.stringify(data.user));
        localStorage.setItem('interntrack_token', data.token);
        return data.user;
      }
    } catch (e) {
      // Fallback to local state registration
    }

    const newUser = {
      id: 'user-' + Date.now(),
      username: userData.username,
      name: userData.name || userData.username,
      email: userData.email || `${userData.username}@example.com`,
      role: 'User', // Regular user by default
      university: userData.university || 'University Student',
      major: userData.major || 'Computer Science',
      graduationYear: userData.graduationYear || '2027'
    };

    setUsers(prev => {
      const updated = [...prev, newUser];
      localStorage.setItem('interntrack_registered_users', JSON.stringify(updated));
      return updated;
    });
    setCurrentUser(newUser);
    localStorage.setItem('interntrack_user', JSON.stringify(newUser));
    return newUser;
  };

  const deleteUser = (userId) => {
    if (userId === 'user-ammad') {
      throw new Error('Cannot delete the primary Admin account.');
    }

    setUsers(prev => {
      const updated = prev.filter(u => u.id !== userId);
      localStorage.setItem('interntrack_registered_users', JSON.stringify(updated));
      return updated;
    });

    if (currentUser?.id === userId) {
      logout();
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('interntrack_user');
    localStorage.removeItem('interntrack_token');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      isAdmin: currentUser?.role === 'Admin',
      login,
      register,
      deleteUser,
      logout,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
