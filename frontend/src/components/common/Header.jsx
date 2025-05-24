import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SidebarContext } from '../../context/SidebarContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { toggleSidebar, collapsed } = useContext(SidebarContext);
  
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark border-bottom">
      <div className="container-fluid px-3 py-0">
        <div className="d-flex align-items-center">
          <button 
            className="sidebar-toggle-btn me-3" 
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            type="button"
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          
          {/* Logo and branding */}
          <div className="d-flex align-items-center">
            <i className="fas fa-robot me-2 text-primary"></i>
            <span className="navbar-brand mb-0 h5 text-light">
              Workflow Automation
            </span>
          </div>
        </div>
        
        <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center text-light py-1"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user-circle me-1 fs-5"></i>
              <span className="small">{user?.username || 'User'}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              <li>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user me-2"></i>
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cog me-2"></i>
                  Settings
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={logout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
