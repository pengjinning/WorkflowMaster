import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorkflowProvider } from './context/WorkflowContext';
import { SidebarProvider, SidebarContext } from './context/SidebarContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import HomePage from './pages/HomePage';
import WorkflowsPage from './pages/WorkflowsPage';
import TasksPage from './pages/TasksPage';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <WorkflowProvider>
        <SidebarProvider>
          <Router>
            <div className="app">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </SidebarProvider>
      </WorkflowProvider>
    </AuthProvider>
  );
}

function MainLayout() {
  const { collapsed, toggleSidebar, isMobile } = useContext(SidebarContext);
  const [showBackdrop, setShowBackdrop] = useState(false);
  
  // Update backdrop visibility based on sidebar state and device
  useEffect(() => {
    setShowBackdrop(!collapsed && isMobile);
    
    // Prevent body scrolling when mobile sidebar is open
    if (!collapsed && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [collapsed, isMobile]);
  
  return (
    <div className="app-container">
      <Header />
      
      <div className="content-wrapper">
        <Sidebar />
        
        <div className={`main-content ${collapsed ? 'expanded' : ''}`}>
          <div className="container-fluid py-3">
            <div className="row">
              <div className="col-12">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/workflows" element={<WorkflowsPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile backdrop for sidebar - only shown on mobile when sidebar is open */}
        <div 
          className={`sidebar-backdrop ${showBackdrop ? 'show' : ''}`} 
          onClick={toggleSidebar}
          style={{ willChange: 'opacity' }}
        />
      </div>
    </div>
  );
}

export default App;
