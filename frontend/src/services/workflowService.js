import { workflowApiService, taskApiService } from './api';

export const workflowService = {
  // Workflow methods
  getWorkflows: async () => {
    try {
      return await workflowApiService.getAll();
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw new Error('Failed to fetch workflows');
    }
  },

  getWorkflow: async (id) => {
    try {
      return await workflowApiService.getById(id);
    } catch (error) {
      console.error('Error fetching workflow:', error);
      throw new Error('Failed to fetch workflow');
    }
  },

  createWorkflow: async (workflowData) => {
    try {
      return await workflowApiService.create(workflowData);
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw new Error('Failed to create workflow');
    }
  },

  updateWorkflow: async (id, workflowData) => {
    try {
      return await workflowApiService.update(id, workflowData);
    } catch (error) {
      console.error('Error updating workflow:', error);
      throw new Error('Failed to update workflow');
    }
  },

  deleteWorkflow: async (id) => {
    try {
      return await workflowApiService.delete(id);
    } catch (error) {
      console.error('Error deleting workflow:', error);
      throw new Error('Failed to delete workflow');
    }
  },

  executeWorkflow: async (id) => {
    try {
      return await workflowApiService.execute(id);
    } catch (error) {
      console.error('Error executing workflow:', error);
      throw new Error('Failed to execute workflow');
    }
  },

  activateWorkflow: async (id) => {
    try {
      return await workflowApiService.activate(id);
    } catch (error) {
      console.error('Error activating workflow:', error);
      throw new Error('Failed to activate workflow');
    }
  },

  deactivateWorkflow: async (id) => {
    try {
      return await workflowApiService.deactivate(id);
    } catch (error) {
      console.error('Error deactivating workflow:', error);
      throw new Error('Failed to deactivate workflow');
    }
  },

  // Task methods
  getTasks: async () => {
    try {
      return await taskApiService.getAll();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  },

  getTask: async (id) => {
    try {
      return await taskApiService.getById(id);
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  },

  getTasksByWorkflow: async (workflowId) => {
    try {
      return await taskApiService.getByWorkflowId(workflowId);
    } catch (error) {
      console.error('Error fetching tasks by workflow:', error);
      throw new Error('Failed to fetch workflow tasks');
    }
  },

  executeTask: async (id) => {
    try {
      return await taskApiService.execute(id);
    } catch (error) {
      console.error('Error executing task:', error);
      throw new Error('Failed to execute task');
    }
  },

  cancelTask: async (id) => {
    try {
      return await taskApiService.cancel(id);
    } catch (error) {
      console.error('Error canceling task:', error);
      throw new Error('Failed to cancel task');
    }
  },

  // Utility methods
  getWorkflowStats: async () => {
    try {
      const [workflows, tasks] = await Promise.all([
        workflowApiService.getAll(),
        taskApiService.getAll()
      ]);

      const stats = {
        totalWorkflows: workflows.length,
        activeWorkflows: workflows.filter(w => w.active).length,
        totalTasks: tasks.length,
        runningTasks: tasks.filter(t => t.status === 'RUNNING').length,
        completedTasks: tasks.filter(t => t.status === 'COMPLETED').length,
        failedTasks: tasks.filter(t => t.status === 'FAILED').length,
        pendingTasks: tasks.filter(t => t.status === 'PENDING').length
      };

      return stats;
    } catch (error) {
      console.error('Error fetching workflow stats:', error);
      throw new Error('Failed to fetch workflow statistics');
    }
  },

  // Webhook helper
  getWebhookUrl: (workflowId, type = 'generic') => {
    const baseUrl = window.location.origin;
    if (type === 'n8n') {
      return `${baseUrl}/api/webhooks/n8n/trigger/${workflowId}`;
    }
    return `${baseUrl}/api/webhooks/generic/trigger/${workflowId}`;
  }
};
