import React from 'react';
import { Handle, Position } from 'reactflow';

function EndNode({ data }) {
  return (
    <div className="workflow-node end-node">
      <Handle
        type="target"
        position={Position.Left}
        className="node-handle node-handle-target"
      />
      <div className="node-header">
        <i className="fas fa-stop"></i>
        <span className="node-type">End</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label}</div>
        <div className="node-details">
          <small className="text-muted">Workflow Complete</small>
        </div>
      </div>
    </div>
  );
}

export default EndNode;
