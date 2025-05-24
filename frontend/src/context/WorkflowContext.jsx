import React, { createContext, useState, useEffect, useContext } from 'react';
import { workflowService } from '../services/workflowService';
import { websocketService } from '../services/websocket';
import { AuthContext } from './AuthContext';

export const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [workflows, setWorkflows] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated, token } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && token) {
      // Load initial data
      loadWorkflows();
      loadTasks();
      
      // Connect to WebSocket
      connectWebSocket();
    } else {
      // Disconnect WebSocket if not authenticated
      disconnectWebSocket();
    }

    return () => {
      disconnectWebSocket();
    };
  }, [isAuthenticated, token]);

  const connectWebSocket = () => {
    try {
      websocketService.connect('ws://localhost:8000/ws/workflow');
      
      websocketService.onMessage((data) => {
        handleWebSocketMessage(data);
      });

      websocketService.onConnect(() => {
        setIsConnected(true);
        console.log('WebSocket connected');
      });

      websocketService.onDisconnect(() => {
        setIsConnected(false);
        console.log('WebSocket disconnected');
      });

      websocketService.onError((error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      });
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  };

  const disconnectWebSocket = () => {
    websocketService.disconnect();
    setIsConnected(false);
  };

  const handleWebSocketMessage = (data) => {
    console.log('WebSocket message received:', data);
    
    switch (data.type) {
      case 'WORKFLOW_STARTED':
        addNotification({
          type: 'info',
          message: `Workflow "${data.data.workflowName}" started`,
          timestamp: Date.now()
        });
        break;
        
      case 'WORKFLOW_COMPLETED':
        addNotification({
          type: 'success',
          message: `Workflow "${data.data.workflowName}" completed successfully`,
          timestamp: Date.now()
        });
        // Refresh workflows and tasks
        loadWorkflows();
        loadTasks();
        break;
        
      case 'WORKFLOW_FAILED':
        addNotification({
          type: 'error',
          message: `Workflow "${data.data.workflowName}" failed: ${data.data.error}`,
          timestamp: Date.now()
        });
        loadTasks();
        break;
        
      case 'TASK_COMPLETED':
        addNotification({
          type: 'info',
          message: `Task "${data.taskName}" completed with status: ${data.status}`,
          timestamp: Date.now()
        });
        loadTasks();
        break;
        
      default:
        console.log('Unknown WebSocket message type:', data.type);
    }
  };

  const loadWorkflows = async () => {
    try {
      const response = await workflowService.getWorkflows();
      setWorkflows(response);
    } catch (error) {
      console.error('Error loading workflows:', error);
      addNotification({
        type: 'error',
        message: 'Failed to load workflows',
        timestamp: Date.now()
      });
    }
  };

  const loadTasks = async () => {
    try {
      const response = await workflowService.getTasks();
      setTasks(response);
    } catch (error) {
      console.error('Error loading tasks:', error);
      addNotification({
        type: 'error',
        message: 'Failed to load tasks',
        timestamp: Date.now()
      });
    }
  };

  const createWorkflow = async (workflowData) => {
    try {
      const response = await workflowService.createWorkflow(workflowData);
      setWorkflows(prev => [...prev, response]);
      addNotification({
        type: 'success',
        message: 'Workflow created successfully',
        timestamp: Date.now()
      });
      return response;
    } catch (error) {
      console.error('Error creating workflow:', error);
      addNotification({
        type: 'error',
        message: 'Failed to create workflow',
        timestamp: Date.now()
      });
      throw error;
    }
  };

  const updateWorkflow = async (id, workflowData) => {
    try {
      const response = await workflowService.updateWorkflow(id, workflowData);
      setWorkflows(prev => prev.map(w => w.id === id ? response : w));
      addNotification({
        type: 'success',
        message: 'Workflow updated successfully',
        timestamp: Date.now()
      });
      return response;
    } catch (error) {
      console.error('Error updating workflow:', error);
      addNotification({
        type: 'error',
        message: 'Failed to update workflow',
        timestamp: Date.now()
      });
      throw error;
    }
  };

  const deleteWorkflow = async (id) => {
    try {
      await workflowService.deleteWorkflow(id);
      setWorkflows(prev => prev.filter(w => w.id !== id));
      addNotification({
        type: 'success',
        message: 'Workflow deleted successfully',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error deleting workflow:', error);
      addNotification({
        type: 'error',
        message: 'Failed to delete workflow',
        timestamp: Date.now()
      });
      throw error;
    }
  };

  const executeWorkflow = async (id) => {
    try {
      await workflowService.executeWorkflow(id);
      addNotification({
        type: 'info',
        message: 'Workflow execution started',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error executing workflow:', error);
      addNotification({
        type: 'error',
        message: 'Failed to execute workflow',
        timestamp: Date.now()
      });
      throw error;
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep last 10 notifications
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    workflows,
    tasks,
    notifications,
    isConnected,
    loadWorkflows,
    loadTasks,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    executeWorkflow,
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};
