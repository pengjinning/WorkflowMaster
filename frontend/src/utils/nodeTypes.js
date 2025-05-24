import { NODE_TYPES, TRIGGER_TYPES, ACTION_TYPES } from './constants';

export const nodeTypeConfig = {
  [NODE_TYPES.TRIGGER]: {
    label: 'Trigger',
    icon: 'fas fa-play',
    color: '#28a745',
    description: 'Start workflow execution',
    maxInstances: 1,
    canHaveMultipleOutputs: false,
    canHaveMultipleInputs: false,
    requiredInputs: 0,
    category: 'trigger',
    configSchema: {
      triggerType: {
        type: 'select',
        label: 'Trigger Type',
        required: true,
        options: [
          { value: TRIGGER_TYPES.MANUAL, label: 'Manual' },
          { value: TRIGGER_TYPES.WEBHOOK, label: 'Webhook' },
          { value: TRIGGER_TYPES.SCHEDULE, label: 'Schedule' },
          { value: TRIGGER_TYPES.FORM, label: 'Form Submission' },
          { value: TRIGGER_TYPES.EMAIL, label: 'Email' }
        ]
      },
      webhookUrl: {
        type: 'text',
        label: 'Webhook URL',
        dependsOn: { triggerType: TRIGGER_TYPES.WEBHOOK }
      },
      cronExpression: {
        type: 'text',
        label: 'Cron Expression',
        dependsOn: { triggerType: TRIGGER_TYPES.SCHEDULE },
        placeholder: '0 0 12 * * ?'
      },
      formId: {
        type: 'text',
        label: 'Form ID',
        dependsOn: { triggerType: TRIGGER_TYPES.FORM }
      }
    }
  },

  [NODE_TYPES.CONDITION]: {
    label: 'Condition',
    icon: 'fas fa-question',
    color: '#ffc107',
    description: 'Branch based on conditions',
    maxInstances: null,
    canHaveMultipleOutputs: true,
    canHaveMultipleInputs: true,
    requiredInputs: 1,
    category: 'logic',
    configSchema: {
      field: {
        type: 'text',
        label: 'Field Path',
        required: true,
        placeholder: 'e.g., user.role, data.amount'
      },
      operator: {
        type: 'select',
        label: 'Operator',
        required: true,
        options: [
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' },
          { value: 'is_empty', label: 'Is Empty' },
          { value: 'is_not_empty', label: 'Is Not Empty' }
        ]
      },
      value: {
        type: 'text',
        label: 'Comparison Value',
        placeholder: 'Value to compare against'
      },
      caseSensitive: {
        type: 'checkbox',
        label: 'Case Sensitive',
        defaultValue: false
      }
    }
  },

  [NODE_TYPES.ACTION]: {
    label: 'Action',
    icon: 'fas fa-cog',
    color: '#007bff',
    description: 'Perform an action',
    maxInstances: null,
    canHaveMultipleOutputs: false,
    canHaveMultipleInputs: true,
    requiredInputs: 1,
    category: 'action',
    configSchema: {
      actionType: {
        type: 'select',
        label: 'Action Type',
        required: true,
        options: [
          { value: ACTION_TYPES.EMAIL, label: 'Send Email' },
          { value: ACTION_TYPES.WEBHOOK, label: 'Call Webhook' },
          { value: ACTION_TYPES.DELAY, label: 'Add Delay' },
          { value: ACTION_TYPES.SCRIPT, label: 'Run Script' }
        ]
      },
      // Email specific fields
      toEmail: {
        type: 'email',
        label: 'To Email',
        dependsOn: { actionType: ACTION_TYPES.EMAIL },
        required: true
      },
      subject: {
        type: 'text',
        label: 'Subject',
        dependsOn: { actionType: ACTION_TYPES.EMAIL }
      },
      body: {
        type: 'textarea',
        label: 'Email Body',
        dependsOn: { actionType: ACTION_TYPES.EMAIL }
      },
      // Webhook specific fields
      webhookUrl: {
        type: 'url',
        label: 'Webhook URL',
        dependsOn: { actionType: ACTION_TYPES.WEBHOOK },
        required: true
      },
      webhookMethod: {
        type: 'select',
        label: 'HTTP Method',
        dependsOn: { actionType: ACTION_TYPES.WEBHOOK },
        options: [
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'PATCH', label: 'PATCH' }
        ],
        defaultValue: 'POST'
      },
      // Delay specific fields
      delayMinutes: {
        type: 'number',
        label: 'Delay (minutes)',
        dependsOn: { actionType: ACTION_TYPES.DELAY },
        min: 1,
        defaultValue: 5
      },
      // Script specific fields
      script: {
        type: 'textarea',
        label: 'Script Code',
        dependsOn: { actionType: ACTION_TYPES.SCRIPT },
        placeholder: 'JavaScript code to execute'
      }
    }
  },

  [NODE_TYPES.APPROVAL]: {
    label: 'Approval',
    icon: 'fas fa-check',
    color: '#17a2b8',
    description: 'Wait for approval',
    maxInstances: null,
    canHaveMultipleOutputs: true,
    canHaveMultipleInputs: true,
    requiredInputs: 1,
    category: 'human',
    configSchema: {
      approver: {
        type: 'email',
        label: 'Approver Email',
        required: true
      },
      timeout: {
        type: 'number',
        label: 'Timeout (hours)',
        min: 1,
        max: 168, // 1 week
        defaultValue: 24
      },
      title: {
        type: 'text',
        label: 'Approval Title',
        placeholder: 'Approval request title'
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'Additional context for the approver'
      },
      autoApprove: {
        type: 'checkbox',
        label: 'Auto-approve after timeout',
        defaultValue: false
      }
    }
  },

  [NODE_TYPES.END]: {
    label: 'End',
    icon: 'fas fa-stop',
    color: '#dc3545',
    description: 'End workflow',
    maxInstances: null,
    canHaveMultipleOutputs: false,
    canHaveMultipleInputs: true,
    requiredInputs: 1,
    category: 'control',
    configSchema: {
      status: {
        type: 'select',
        label: 'End Status',
        options: [
          { value: 'success', label: 'Success' },
          { value: 'failure', label: 'Failure' },
          { value: 'cancelled', label: 'Cancelled' }
        ],
        defaultValue: 'success'
      },
      message: {
        type: 'textarea',
        label: 'End Message',
        placeholder: 'Optional message to log when workflow ends'
      }
    }
  }
};

export const getNodeConfig = (nodeType) => {
  return nodeTypeConfig[nodeType] || null;
};

export const getNodeCategories = () => {
  const categories = {};
  Object.entries(nodeTypeConfig).forEach(([type, config]) => {
    const category = config.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push({ type, ...config });
  });
  return categories;
};

export const validateNodeConfig = (nodeType, config) => {
  const nodeConfig = getNodeConfig(nodeType);
  if (!nodeConfig) {
    return { isValid: false, errors: ['Invalid node type'] };
  }

  const errors = [];
  const schema = nodeConfig.configSchema;

  Object.entries(schema).forEach(([field, fieldConfig]) => {
    const value = config[field];

    // Check if field is required
    if (fieldConfig.required && (!value || value === '')) {
      errors.push(`${fieldConfig.label} is required`);
      return;
    }

    // Check dependencies
    if (fieldConfig.dependsOn) {
      const dependencyMet = Object.entries(fieldConfig.dependsOn).every(
        ([depField, depValue]) => config[depField] === depValue
      );
      if (!dependencyMet) {
        return; // Skip validation if dependency not met
      }
    }

    // Type-specific validation
    if (value && value !== '') {
      switch (fieldConfig.type) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(`${fieldConfig.label} must be a valid email address`);
          }
          break;

        case 'url':
          try {
            new URL(value);
          } catch {
            errors.push(`${fieldConfig.label} must be a valid URL`);
          }
          break;

        case 'number':
          const numValue = Number(value);
          if (isNaN(numValue)) {
            errors.push(`${fieldConfig.label} must be a number`);
          } else {
            if (fieldConfig.min !== undefined && numValue < fieldConfig.min) {
              errors.push(`${fieldConfig.label} must be at least ${fieldConfig.min}`);
            }
            if (fieldConfig.max !== undefined && numValue > fieldConfig.max) {
              errors.push(`${fieldConfig.label} must be at most ${fieldConfig.max}`);
            }
          }
          break;
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getDefaultNodeConfig = (nodeType) => {
  const nodeConfig = getNodeConfig(nodeType);
  if (!nodeConfig) return {};

  const defaultConfig = {};
  Object.entries(nodeConfig.configSchema).forEach(([field, fieldConfig]) => {
    if (fieldConfig.defaultValue !== undefined) {
      defaultConfig[field] = fieldConfig.defaultValue;
    }
  });

  return defaultConfig;
};

export const createNodeData = (nodeType, position = { x: 0, y: 0 }, customConfig = {}) => {
  const nodeConfig = getNodeConfig(nodeType);
  if (!nodeConfig) return null;

  const defaultConfig = getDefaultNodeConfig(nodeType);
  const config = { ...defaultConfig, ...customConfig };

  return {
    id: `${nodeType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: nodeType,
    position,
    data: {
      label: nodeConfig.label,
      config
    }
  };
};

export default {
  nodeTypeConfig,
  getNodeConfig,
  getNodeCategories,
  validateNodeConfig,
  getDefaultNodeConfig,
  createNodeData
};
