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
      className={`sidebar text-light ${collapsed ? 'collapsed' : ''}`} 
      id="sidebar"
    >
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
              onClick={(e) => isMobile && toggleSidebar()}
            >
              <i className={`${item.icon} ${collapsed ? '' : 'me-3'}`}></i>
              <span className={`nav-text ${collapsed ? 'd-none' : ''}`}>{item.label}</span>
            </NavLink>
          ))}
          
          <hr className={`my-3 ${collapsed ? 'mx-auto w-25' : ''}`} />
          
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
                onClick={(e) => isMobile && toggleSidebar()}
              >
                <i className={`${item.icon} ${collapsed ? '' : 'me-3'}`}></i>
                <span className={`nav-text ${collapsed ? 'd-none' : ''}`}>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
