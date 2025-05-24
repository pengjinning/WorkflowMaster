// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws';

// Application Constants
export const APP_NAME = 'Workflow Automation Platform';
export const APP_VERSION = '1.0.0';

// Workflow Node Types
export const NODE_TYPES = {
  TRIGGER: 'trigger',
  CONDITION: 'condition',
  ACTION: 'action',
  APPROVAL: 'approval',
  END: 'end'
};

// Task Status
export const TASK_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

// Workflow Status
export const WORKFLOW_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft'
};

// Trigger Types
export const TRIGGER_TYPES = {
  MANUAL: 'manual',
  WEBHOOK: 'webhook',
  SCHEDULE: 'schedule',
  FORM: 'form',
  EMAIL: 'email'
};

// Action Types
export const ACTION_TYPES = {
  EMAIL: 'email',
  WEBHOOK: 'webhook',
  APPROVAL: 'approval',
  DELAY: 'delay',
  SCRIPT: 'script',
  DATABASE: 'database'
};

// Condition Operators
export const CONDITION_OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not_equals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not_contains',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
  GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL: 'less_than_or_equal',
  IS_EMPTY: 'is_empty',
  IS_NOT_EMPTY: 'is_not_empty'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// WebSocket Event Types
export const WS_EVENT_TYPES = {
  WORKFLOW_STARTED: 'WORKFLOW_STARTED',
  WORKFLOW_COMPLETED: 'WORKFLOW_COMPLETED',
  WORKFLOW_FAILED: 'WORKFLOW_FAILED',
  TASK_STARTED: 'TASK_STARTED',
  TASK_COMPLETED: 'TASK_COMPLETED',
  TASK_FAILED: 'TASK_FAILED',
  NODE_EXECUTED: 'NODE_EXECUTED'
};

// UI Constants
export const SIDEBAR_WIDTH = 250;
export const HEADER_HEIGHT = 60;
export const NODE_PALETTE_WIDTH = 200;
export const NODE_PROPERTIES_WIDTH = 300;

// Colors
export const COLORS = {
  PRIMARY: '#007bff',
  SECONDARY: '#6c757d',
  SUCCESS: '#28a745',
  DANGER: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40'
};

// Node Colors
export const NODE_COLORS = {
  [NODE_TYPES.TRIGGER]: '#28a745',
  [NODE_TYPES.CONDITION]: '#ffc107',
  [NODE_TYPES.ACTION]: '#007bff',
  [NODE_TYPES.APPROVAL]: '#17a2b8',
  [NODE_TYPES.END]: '#dc3545'
};

// Default Configuration
export const DEFAULT_CONFIG = {
  WORKFLOW: {
    name: 'New Workflow',
    description: 'Workflow description',
    active: false
  },
  NODE: {
    width: 150,
    height: 80,
    borderRadius: 8
  },
  CANVAS: {
    defaultZoom: 1,
    minZoom: 0.1,
    maxZoom: 2
  }
};

// Validation Rules
export const VALIDATION_RULES = {
  WORKFLOW_NAME: {
    minLength: 1,
    maxLength: 100,
    required: true
  },
  WORKFLOW_DESCRIPTION: {
    maxLength: 500
  },
  NODE_LABEL: {
    minLength: 1,
    maxLength: 50,
    required: true
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  URL: {
    pattern: /^https?:\/\/.+/
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'workflow_token',
  USER_DATA: 'workflow_user',
  PREFERENCES: 'workflow_preferences',
  CANVAS_STATE: 'workflow_canvas_state'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  WORKFLOW_CREATED: 'Workflow created successfully',
  WORKFLOW_UPDATED: 'Workflow updated successfully',
  WORKFLOW_DELETED: 'Workflow deleted successfully',
  WORKFLOW_EXECUTED: 'Workflow execution started',
  TASK_EXECUTED: 'Task executed successfully',
  TASK_CANCELLED: 'Task cancelled successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful'
};

export default {
  API_BASE_URL,
  WS_BASE_URL,
  APP_NAME,
  APP_VERSION,
  NODE_TYPES,
  TASK_STATUS,
  WORKFLOW_STATUS,
  TRIGGER_TYPES,
  ACTION_TYPES,
  CONDITION_OPERATORS,
  NOTIFICATION_TYPES,
  WS_EVENT_TYPES,
  COLORS,
  NODE_COLORS,
  DEFAULT_CONFIG,
  VALIDATION_RULES,
  STORAGE_KEYS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};
