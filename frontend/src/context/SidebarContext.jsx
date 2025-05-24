import React, { createContext, useState, useEffect } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  // Initialize with safe defaults (will be updated in useEffect)
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Safe initialization after component mounts (client-side only)
    const checkMobile = () => window.innerWidth < 768;
    const checkTablet = () => window.innerWidth < 992;
    
    // Initial setup
    setIsMobile(checkMobile());
    setCollapsed(checkMobile() || checkTablet());
    
    const handleResize = () => {
      const mobile = checkMobile();
      const tablet = checkTablet();
      
      setIsMobile(mobile);
      
      // Auto-collapse on mobile devices
      if (mobile) {
        setCollapsed(true);
      } 
      // On tablet, collapse by default
      else if (tablet && !document.body.classList.contains('sidebar-preference-set')) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    // Mark user preference
    if (!isMobile) {
      document.body.classList.add('sidebar-preference-set');
    }
  };

  return (
    <SidebarContext.Provider value={{ 
      collapsed, 
      setCollapsed, 
      toggleSidebar,
      isMobile 
    }}>
      {children}
    </SidebarContext.Provider>
  );
};
