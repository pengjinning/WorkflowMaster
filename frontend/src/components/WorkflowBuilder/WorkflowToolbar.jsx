import React, { useState } from 'react';

function WorkflowToolbar({ onSave, onExecute, onAddNode }) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await onExecute();
    } finally {
      setIsExecuting(false);
    }
  };

  const quickActions = [
    {
      type: 'trigger',
      icon: 'fas fa-play',
      label: 'Add Trigger',
      color: 'success'
    },
    {
      type: 'condition',
      icon: 'fas fa-question',
      label: 'Add Condition',
      color: 'warning'
    },
    {
      type: 'action',
      icon: 'fas fa-cog',
      label: 'Add Action',
      color: 'primary'
    }
  ];

  return (
    <div className="workflow-toolbar">
      <div className="toolbar-section">
        <div className="toolbar-group">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                Save Workflow
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleExecute}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Executing...
              </>
            ) : (
              <>
                <i className="fas fa-play me-2"></i>
                Execute Workflow
              </>
            )}
          </button>
        </div>

        <div className="toolbar-group">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-plus me-2"></i>
              Add Node
            </button>
            <ul className="dropdown-menu">
              {quickActions.map((action) => (
                <li key={action.type}>
                  <button
                    className="dropdown-item"
                    onClick={() => onAddNode(action.type)}
                  >
                    <i className={`${action.icon} me-2`}></i>
                    {action.label}
                  </button>
                </li>
              ))}
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onAddNode('approval')}
                >
                  <i className="fas fa-check me-2"></i>
                  Add Approval
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onAddNode('end')}
                >
                  <i className="fas fa-stop me-2"></i>
                  Add End
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="toolbar-section">
        <div className="toolbar-group">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              title="Zoom In"
            >
              <i className="fas fa-search-plus"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              title="Zoom Out"
            >
              <i className="fas fa-search-minus"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              title="Fit View"
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </button>
          </div>

          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              title="Undo"
            >
              <i className="fas fa-undo"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              title="Redo"
            >
              <i className="fas fa-redo"></i>
            </button>
          </div>
        </div>

        <div className="toolbar-info">
          <span className="badge bg-light text-dark">
            <i className="fas fa-info-circle me-1"></i>
            Click nodes to configure
          </span>
        </div>
      </div>
    </div>
  );
}

export default WorkflowToolbar;
