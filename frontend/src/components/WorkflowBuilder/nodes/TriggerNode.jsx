import React from 'react';
import { Handle, Position } from 'reactflow';

function TriggerNode({ data }) {
  const getTriggerIcon = (triggerType) => {
    switch (triggerType) {
      case 'webhook':
        return 'fas fa-globe';
      case 'schedule':
        return 'fas fa-clock';
      case 'form':
        return 'fas fa-wpforms';
      default:
        return 'fas fa-play';
    }
  };

  return (
    <div className="workflow-node trigger-node">
      <div className="node-header">
        <i className={getTriggerIcon(data.config?.triggerType)}></i>
        <span className="node-type">Trigger</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label}</div>
        {data.config?.triggerType && (
          <div className="node-details">
            <small className="text-muted">
              {data.config.triggerType === 'webhook' && 'Webhook Trigger'}
              {data.config.triggerType === 'schedule' && 'Scheduled Trigger'}
              {data.config.triggerType === 'form' && 'Form Submission'}
              {data.config.triggerType === 'manual' && 'Manual Trigger'}
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

export default TriggerNode;
