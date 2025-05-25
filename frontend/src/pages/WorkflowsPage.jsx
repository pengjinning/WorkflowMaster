import React, { useState, useEffect } from 'react';
import { workflowService } from '../services/workflowService';
import WorkflowCanvas from '../components/WorkflowBuilder/WorkflowCanvas';
import WorkflowCard from '../components/WorkflowCard';

function WorkflowsPage() {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'builder'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      setLoading(true);
      const response = await workflowService.getWorkflows();
      setWorkflows(response);
      setError(null);
    } catch (err) {
      setError('Failed to load workflows');
      console.error('Error loading workflows:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = () => {
    setSelectedWorkflow(null);
    setView('builder');
  };

  const handleEditWorkflow = (workflow) => {
    setSelectedWorkflow(workflow);
    setView('builder');
  };

  const handleExecuteWorkflow = async (workflowId) => {
    try {
      await workflowService.executeWorkflow(workflowId);
      alert('Workflow execution started!');
    } catch (err) {
      alert('Failed to execute workflow');
      console.error('Error executing workflow:', err);
    }
  };

  const handleToggleWorkflow = async (workflowId, active) => {
    try {
      if (active) {
        await workflowService.activateWorkflow(workflowId);
      } else {
        await workflowService.deactivateWorkflow(workflowId);
      }
      await loadWorkflows();
    } catch (err) {
      alert('Failed to toggle workflow status');
      console.error('Error toggling workflow:', err);
    }
  };

  const handleDeleteWorkflow = async (workflowId) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      try {
        await workflowService.deleteWorkflow(workflowId);
        await loadWorkflows();
      } catch (err) {
        alert('Failed to delete workflow');
        console.error('Error deleting workflow:', err);
      }
    }
  };

  if (view === 'builder') {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>
            {selectedWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
          </h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setView('list')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to List
          </button>
        </div>
        <WorkflowCanvas workflow={selectedWorkflow} />
      </div>
    );
  }

  return (
    <div className="workflows-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-project-diagram me-2"></i>
          Workflows
        </h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={loadWorkflows}
            disabled={loading}
          >
            <i className="fas fa-sync-alt me-2"></i>
            Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCreateWorkflow}
          >
            <i className="fas fa-plus me-2"></i>
            Create Workflow
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : workflows.length === 0 ? (
        <div className="text-center p-5">
          <i className="fas fa-project-diagram fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">No workflows found</h5>
          <p className="text-muted">
            Create your first workflow to get started with automation.
          </p>
          <button
            className="btn btn-primary"
            onClick={handleCreateWorkflow}
          >
            <i className="fas fa-plus me-2"></i>
            Create Your First Workflow
          </button>
        </div>
      ) : (
        <div className="row">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="col-md-6 col-lg-4 mb-4">
              <WorkflowCard
                workflow={workflow}
                onEdit={handleEditWorkflow}
                onExecute={handleExecuteWorkflow}
                onToggle={handleToggleWorkflow}
                onDelete={handleDeleteWorkflow}
              />
            </div>
          ))}
        </div>
      )}

      {/* Webhook Information */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">
                <i className="fas fa-globe me-2"></i>
                Webhook Integration
              </h6>
            </div>
            <div className="card-body">
              <p className="mb-2">
                <strong>n8n Integration:</strong>
              </p>
              <p className="text-muted">
                Use the following webhook URL pattern to trigger workflows from n8n:
              </p>
              <code>
                {window.location.origin}/api/webhooks/n8n/trigger/[WORKFLOW_ID]
              </code>
              <p className="mt-2 text-muted">
                <small>
                  <i className="fas fa-info-circle me-1"></i>
                  Replace [WORKFLOW_ID] with the actual workflow ID. You can copy the webhook URL for each workflow using the dropdown menu.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkflowsPage;
