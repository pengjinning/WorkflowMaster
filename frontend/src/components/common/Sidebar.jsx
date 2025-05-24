import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarContext } from '../../context/SidebarContext';

function Sidebar() {
  const { collapsed, toggleSidebar, isMobile } = useContext(SidebarContext);

  const navItems = [
    { path: '/', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/workflows', icon: 'fas fa-project-diagram', label: 'Workflows' },
    { path: '/tasks', icon: 'fas fa-tasks', label: 'Tasks' },
  ];

  const toolItems = [
    { icon: 'fas fa-chart-bar', label: 'Analytics', href: '#' },
    { icon: 'fas fa-bell', label: 'Notifications', href: '#' },
    { icon: 'fas fa-cog', label: 'Settings', href: '#' },
  ];

  return (
    <aside 
      className={`sidebar bg-dark text-light ${collapsed ? 'collapsed' : ''}`} 
      id="sidebar"
      style={{ zIndex: 1050 }}
    >
      <div className="sidebar-header border-bottom d-flex justify-content-between align-items-center px-3">
        <div className={`logo-container ${collapsed ? 'text-center w-100 py-3' : ''}`}>
          {!collapsed ? (
            <h5 className="mb-0 d-flex align-items-center">
              <i className="fas fa-robot me-2"></i>
              <span className="logo-text">Workflow Hub</span>
            </h5>
          ) : (
            <i className="fas fa-robot fs-4"></i>
          )}
        </div>
        
        <button 
          className="btn btn-sm text-light sidebar-toggle d-none d-md-block"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i className={`fas ${collapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
        </button>
      </div>
      
      <div className="sidebar-content">
        <nav className="nav flex-column p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link rounded mb-2 ${isActive ? 'active' : ''} ${collapsed ? 'icon-only' : ''}`
              }
              end={item.path === '/'}
              title={item.label}
            >
              <i className={`${item.icon} ${collapsed ? '' : 'me-2'}`}></i>
              <span className={`nav-text ${collapsed ? 'd-none' : ''}`}>{item.label}</span>
            </NavLink>
          ))}
          
          <hr className={`my-3 ${collapsed ? 'mx-auto w-50' : ''}`} />
          
          <div className="nav-section">
            {!collapsed && (
              <h6 className="text-muted small text-uppercase mb-2">Tools</h6>
            )}
            
            {toolItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`nav-link rounded mb-2 ${collapsed ? 'icon-only' : ''}`}
                title={item.label}
              >
                <i className={`${item.icon} ${collapsed ? '' : 'me-2'}`}></i>
                <span className={`nav-text ${collapsed ? 'd-none' : ''}`}>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
      
      {/* Mobile toggle button at the bottom */}
      <div className="sidebar-footer border-top p-2 d-md-none">
        <button 
          className="btn btn-sm btn-dark w-100" 
          onClick={toggleSidebar}
        >
          <i className={`fas ${collapsed ? 'fa-angle-right' : 'fa-angle-left'} me-2`}></i>
          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
