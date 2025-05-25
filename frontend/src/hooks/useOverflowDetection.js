import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook to detect if content overflows its container and adjust height if needed
 * @param {number} initialHeight - Initial height in pixels
 * @param {number} increasePercentage - Percentage to increase height by if overflow is detected (default: 5)
 * @returns {Object} - Object containing ref to attach to element and calculated height
 */
const useOverflowDetection = (initialHeight, increasePercentage = 5) => {
  const elementRef = useRef(null);
  const [height, setHeight] = useState(initialHeight);
  
  useEffect(() => {
    const checkOverflow = () => {
      const element = elementRef.current;
      if (!element) return;
      
      // Check if content overflows the container
      const isOverflowing = element.scrollHeight > element.clientHeight;
      
      // If overflowing, increase height by the specified percentage
      if (isOverflowing) {
        const newHeight = initialHeight * (1 + increasePercentage / 100);
        setHeight(newHeight);
      } else {
        setHeight(initialHeight);
      }
    };
    
    // Check for overflow after render and whenever content might change
    checkOverflow();
    
    // Add resize observer to detect content changes
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
    };
  }, [initialHeight, increasePercentage]);
  
  return { ref: elementRef, height };
};

export default useOverflowDetection;