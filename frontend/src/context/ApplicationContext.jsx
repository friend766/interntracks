import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialApplications } from '../mockData';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // All applications across all users, persisted in localStorage
  const [allApplications, setAllApplications] = useState(() => {
    const saved = localStorage.getItem('interntrack_all_apps');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  useEffect(() => {
    localStorage.setItem('interntrack_all_apps', JSON.stringify(allApplications));
  }, [allApplications]);

  // Applications belonging strictly to the currently logged in user
  const userApplications = useMemo(() => {
    if (!currentUser) return [];
    return allApplications.filter(app => app.userId === currentUser.id);
  }, [allApplications, currentUser]);

  // Filtered applications for user dashboard (filtered by search, status, sort)
  const filteredApplications = useMemo(() => {
    let result = [...userApplications];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(app => 
        app.company.toLowerCase().includes(q) || 
        app.role.toLowerCase().includes(q)
      );
    }

    if (filterStatus !== 'All') {
      result = result.filter(app => app.status === filterStatus);
    }

    if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
    } else {
      result.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    }

    return result;
  }, [userApplications, searchQuery, filterStatus, sortOrder]);

  // Add application - automatically assigns the current user's ID
  const addApplication = (newApp) => {
    const created = {
      ...newApp,
      id: 'app-' + Date.now(),
      userId: currentUser ? currentUser.id : 'user-ammad',
      createdAt: new Date().toISOString()
    };

    if (created.status === 'Offer Received') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    setAllApplications(prev => [created, ...prev]);
  };

  // Update application in global list
  const updateApplication = (id, updatedData) => {
    if (updatedData.status === 'Offer Received') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    setAllApplications(prev => prev.map(app => app.id === id ? { ...app, ...updatedData } : app));
  };

  // Delete application from global list
  const deleteApplication = (id) => {
    setAllApplications(prev => prev.filter(app => app.id !== id));
  };

  return (
    <ApplicationContext.Provider value={{
      applications: filteredApplications,     // Strict user-only applications (filtered)
      userApplications: userApplications,     // Strict user-only applications (unfiltered)
      allApplications: allApplications,       // Global applications for Admin Overseer view
      filterStatus,
      setFilterStatus,
      searchQuery,
      setSearchQuery,
      sortOrder,
      setSortOrder,
      addApplication,
      updateApplication,
      deleteApplication
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationContext);
