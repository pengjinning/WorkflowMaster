import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SidebarContext } from '../../context/SidebarContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { toggleSidebar, collapsed } = useContext(SidebarContext);
  
  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-3">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-sm btn-outline-secondary me-3 d-md-none" 
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            type="button"
          >
            <i className="fas fa-bars"></i>
          </button>
          <span className="navbar-brand h1 mb-0 fs-5">
            <i className="fas fa-cogs me-2"></i>
            Workflow Automation
          </span>
        </div>
        
        <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user-circle me-2 fs-5"></i>
              {user?.username || 'User'}
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
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
