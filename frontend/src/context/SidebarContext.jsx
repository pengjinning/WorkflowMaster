import React, { createContext, useState, useEffect } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  // Initialize collapsed state
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Define breakpoints
  const MOBILE_BREAKPOINT = 768;
  
  useEffect(() => {
    // Check if mobile
    const checkMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
    
    // Initial setup
    const mobile = checkMobile();
    setIsMobile(mobile);
    
    // On mobile, sidebar is collapsed by default
    if (mobile) {
      setCollapsed(true);
    } else {
      // On desktop, use saved preference or default to expanded
      const savedState = localStorage.getItem('sidebarCollapsed');
      setCollapsed(savedState === 'true');
    }
    
    // Handle window resize
    const handleResize = () => {
      const isMobile = checkMobile();
      setIsMobile(isMobile);
      
      // Collapse sidebar on mobile by default
      if (isMobile && !collapsed) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    
    // Save preference on desktop
    if (!isMobile) {
      localStorage.setItem('sidebarCollapsed', newState.toString());
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
