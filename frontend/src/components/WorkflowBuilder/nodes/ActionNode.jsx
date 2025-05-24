import React from 'react';
import { Handle, Position } from 'reactflow';

function ActionNode({ data }) {
  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'email':
        return 'fas fa-envelope';
      case 'approval':
        return 'fas fa-check';
      case 'webhook':
        return 'fas fa-globe';
      case 'delay':
        return 'fas fa-clock';
      default:
        return 'fas fa-cog';
    }
  };

  const getActionLabel = (actionType) => {
    switch (actionType) {
      case 'email':
        return 'Send Email';
      case 'approval':
        return 'Request Approval';
      case 'webhook':
        return 'Call Webhook';
      case 'delay':
        return 'Add Delay';
      default:
        return 'Action';
    }
  };

  return (
    <div className="workflow-node action-node">
      <Handle
        type="target"
        position={Position.Left}
        className="node-handle node-handle-target"
      />
      <div className="node-header">
        <i className={getActionIcon(data.config?.actionType)}></i>
        <span className="node-type">
          {data.config?.actionType === 'approval' ? 'Approval' : 'Action'}
        </span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label}</div>
        {data.config?.actionType && (
          <div className="node-details">
            <small className="text-muted">
              {getActionLabel(data.config.actionType)}
            </small>
          </div>
        )}
        {data.config?.toEmail && (
          <div className="node-details">
            <small className="text-muted">
              To: {data.config.toEmail}
            </small>
          </div>
        )}
        {data.config?.approver && (
          <div className="node-details">
            <small className="text-muted">
              Approver: {data.config.approver}
            </small>
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="node-handle node-handle-source"
      />
    </div>
  );
}

export default ActionNode;
