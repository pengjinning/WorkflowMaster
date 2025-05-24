const NodePalette = ({ onDragStart }) => {
  return (
    <div className="node-palette">
      <div className="palette-header">Node Types</div>
      <div className="node-list">
        <div 
          className="node-item" 
          draggable 
          onDragStart={(e) => onDragStart(e, 'task')}
        >
          <i className="fas fa-tasks me-2 workflow-icon"></i>
          <span className="workflow-label">Task</span>
        </div>
        <div 
          className="node-item" 
          draggable 
          onDragStart={(e) => onDragStart(e, 'decision')}
        >
          <i className="fas fa-code-branch me-2 workflow-icon"></i>
          <span className="workflow-label">Decision</span>
        </div>
        <div 
          className="node-item" 
          draggable 
          onDragStart={(e) => onDragStart(e, 'start')}
        >
          <i className="fas fa-play-circle me-2 workflow-icon"></i>
          <span className="workflow-label">Start</span>
        </div>
        <div 
          className="node-item" 
          draggable 
          onDragStart={(e) => onDragStart(e, 'end')}
        >
          <i className="fas fa-stop-circle me-2 workflow-icon"></i>
          <span className="workflow-label">End</span>
        </div>
        <div 
          className="node-item" 
          draggable 
          onDragStart={(e) => onDragStart(e, 'api')}
        >
          <i className="fas fa-cloud me-2 workflow-icon"></i>
          <span className="workflow-label">API Call</span>
        </div>
        <div 
          className="node-item" 
          draggable 
          onDragStart={(e) => onDragStart(e, 'email')}
        >
          <i className="fas fa-envelope me-2 workflow-icon"></i>
          <span className="workflow-label">Email</span>
        </div>
      </div>
    </div>
  );
};
