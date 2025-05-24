import React from 'react';

function NodePalette({ onAddNode }) {
  const nodeTypes = [
    {
      type: 'trigger',
      icon: 'fas fa-play',
      label: 'Trigger',
      description: 'Start workflow execution',
      color: '#28a745'
    },
    {
      type: 'condition',
      icon: 'fas fa-question',
      label: 'Condition',
      description: 'Branch based on conditions',
      color: '#ffc107'
    },
    {
      type: 'action',
      icon: 'fas fa-cog',
      label: 'Action',
      description: 'Perform an action',
      color: '#007bff'
    },
    {
      type: 'approval',
      icon: 'fas fa-check',
      label: 'Approval',
      description: 'Wait for approval',
      color: '#17a2b8'
    },
    {
      type: 'end',
      icon: 'fas fa-stop',
      label: 'End',
      description: 'End workflow',
      color: '#dc3545'
    }
  ];

  return (
    <div className="node-palette">
      <div className="palette-header">
        <h6 className="mb-3">
          <i className="fas fa-palette me-2"></i>
          Node Palette
        </h6>
      </div>
      
      <div className="palette-nodes">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="palette-node"
            onClick={() => onAddNode(nodeType.type)}
            title={nodeType.description}
          >
            <div 
              className="palette-node-icon"
              style={{ backgroundColor: nodeType.color }}
            >
              <i className={nodeType.icon}></i>
            </div>
            <div className="palette-node-label">
              <small>{nodeType.label}</small>
            </div>
          </div>
        ))}
      </div>
      
      <div className="palette-footer mt-4">
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          Drag nodes to the canvas
        </small>
      </div>
    </div>
  );
}

export default NodePalette;
