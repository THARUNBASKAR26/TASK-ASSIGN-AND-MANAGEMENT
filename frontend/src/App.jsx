import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import TaskFormPage from './pages/TaskFormPage';

function App() {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks/new" element={<TaskFormPage />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
