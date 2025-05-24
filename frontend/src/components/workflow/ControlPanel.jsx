const ControlPanel = ({ onClear, onSave, onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div className="control-panel mb-3">
      <div className="palette-header">Workflow Controls</div>
      <div className="btn-group p-2">
        <button className="btn btn-sm btn-outline-secondary" onClick={onUndo} disabled={!canUndo}>
          <i className="fas fa-undo me-1 workflow-icon"></i> <span className="workflow-label">Undo</span>
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={onRedo} disabled={!canRedo}>
          <i className="fas fa-redo me-1 workflow-icon"></i> <span className="workflow-label">Redo</span>
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={onClear}>
          <i className="fas fa-trash-alt me-1 workflow-icon"></i> <span className="workflow-label">Clear</span>
        </button>
        <button className="btn btn-sm btn-primary" onClick={onSave}>
          <i className="fas fa-save me-1 workflow-icon"></i> <span className="workflow-label">Save</span>
        </button>
      </div>
    </div>
  );
};
