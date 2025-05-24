import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navItems = [
    { path: '/', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/workflows', icon: 'fas fa-project-diagram', label: 'Workflows' },
    { path: '/tasks', icon: 'fas fa-tasks', label: 'Tasks' },
  ];

  return (
    <div className="sidebar bg-dark text-light" style={{ width: '250px' }}>
      <div className="p-3 border-bottom">
        <h5 className="mb-0">
          <i className="fas fa-robot me-2"></i>
          Workflow Hub
        </h5>
      </div>
      
      <nav className="nav flex-column p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link rounded mb-2 ${isActive ? 'active' : ''}`
            }
            end={item.path === '/'}
          >
            <i className={`${item.icon} me-2`}></i>
            {item.label}
          </NavLink>
        ))}
        
        <hr className="my-3" />
        
        <div className="nav-section">
          <h6 className="text-muted small text-uppercase mb-2">Tools</h6>
          <a href="#" className="nav-link rounded mb-2">
            <i className="fas fa-chart-bar me-2"></i>
            Analytics
          </a>
          <a href="#" className="nav-link rounded mb-2">
            <i className="fas fa-bell me-2"></i>
            Notifications
          </a>
          <a href="#" className="nav-link rounded mb-2">
            <i className="fas fa-cog me-2"></i>
            Settings
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
