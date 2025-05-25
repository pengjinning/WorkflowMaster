import React from 'react';
import useOverflowDetection from '../hooks/useOverflowDetection';

const WorkflowCard = ({ workflow, onEdit, onExecute, onToggle, onDelete }) => {
  const { ref, height } = useOverflowDetection(131);
  const { ref: btnGroupRef, height: btnGroupHeight } = useOverflowDetection(131);

  return (
    <div className="card" ref={ref} style={{ height: `${height}px`, overflow: 'hidden' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">{workflow.name}</h5>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={workflow.active}
              onChange={(e) => onToggle(workflow.id, e.target.checked)}
              title={workflow.active ? 'Deactivate workflow' : 'Activate workflow'}
            />
          </div>
        </div>
        
        <p className="card-text">{workflow.description}</p>
        
        <div className="mb-2">
          <span className={`badge ${workflow.active ? 'bg-success' : 'bg-secondary'}`}>
            {workflow.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="card-text">
          <small className="text-muted">
            Created: {new Date(workflow.createdAt).toLocaleDateString()}
          </small>
        </div>

        {workflow.updatedAt && (
          <div className="card-text">
            <small className="text-muted">
              Updated: {new Date(workflow.updatedAt).toLocaleDateString()}
            </small>
          </div>
        )}
      </div>

      <div className="card-footer bg-transparent">
        <div className="btn-group w-100" ref={btnGroupRef} style={{ height: `${btnGroupHeight}px`, overflow: 'hidden' }} role="group">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(workflow)}
          >
            <i className="fas fa-edit me-1"></i>
            Edit
          </button>
          
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => onExecute(workflow.id)}
            disabled={!workflow.active}
          >
            <i className="fas fa-play me-1"></i>
            Execute
          </button>
          
          <div className="btn-group" role="group">
            <button
              className="btn btn-outline-secondary btn-sm dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onEdit(workflow)}
                >
                  <i className="fas fa-edit me-2"></i>
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigator.clipboard.writeText(`${window.location.origin}/api/webhooks/n8n/trigger/${workflow.id}`)}
                >
                  <i className="fas fa-link me-2"></i>
                  Copy Webhook URL
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(workflow.id)}
                >
                  <i className="fas fa-trash me-2"></i>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;