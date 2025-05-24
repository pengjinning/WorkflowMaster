import React from 'react';
import { Handle, Position } from 'reactflow';

function ConditionNode({ data }) {
  return (
    <div className="workflow-node condition-node">
      <Handle
        type="target"
        position={Position.Left}
        className="node-handle node-handle-target"
      />
      <div className="node-header">
        <i className="fas fa-question"></i>
        <span className="node-type">Condition</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label}</div>
        {data.config?.field && (
          <div className="node-details">
            <small className="text-muted">
              {data.config.field} {data.config.operator} {data.config.value}
            </small>
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="node-handle node-handle-source"
        style={{ top: '30%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="node-handle node-handle-source"
        style={{ top: '70%' }}
      />
      <div className="condition-labels">
        <span className="condition-label condition-true">Yes</span>
        <span className="condition-label condition-false">No</span>
      </div>
    </div>
  );
}

export default ConditionNode;
