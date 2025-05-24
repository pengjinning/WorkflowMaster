import React, { useState, useEffect } from 'react';
import { workflowService } from '../../services/workflowService';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await workflowService.getTasks();
      setTasks(response);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteTask = async (taskId) => {
    try {
      await workflowService.executeTask(taskId);
      await loadTasks(); // Refresh the list
    } catch (err) {
      setError('Failed to execute task');
      console.error('Error executing task:', err);
    }
  };

  const handleCancelTask = async (taskId) => {
    try {
      await workflowService.cancelTask(taskId);
      await loadTasks(); // Refresh the list
    } catch (err) {
      setError('Failed to cancel task');
      console.error('Error canceling task:', err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-success';
      case 'running':
        return 'bg-primary';
      case 'failed':
        return 'bg-danger';
      case 'cancelled':
        return 'bg-secondary';
      case 'pending':
      default:
        return 'bg-warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'fas fa-check';
      case 'running':
        return 'fas fa-spinner fa-spin';
      case 'failed':
        return 'fas fa-times';
      case 'cancelled':
        return 'fas fa-ban';
      case 'pending':
      default:
        return 'fas fa-clock';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status?.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>
          <i className="fas fa-tasks me-2"></i>
          Tasks
        </h4>
        <button
          className="btn btn-outline-primary"
          onClick={loadTasks}
          disabled={loading}
        >
          <i className="fas fa-sync-alt me-2"></i>
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="mb-3">
        <div className="btn-group" role="group">
          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="filter-all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          <label className="btn btn-outline-secondary" htmlFor="filter-all">
            All
          </label>

          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="filter-pending"
            checked={filter === 'pending'}
            onChange={() => setFilter('pending')}
          />
          <label className="btn btn-outline-warning" htmlFor="filter-pending">
            Pending
          </label>

          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="filter-running"
            checked={filter === 'running'}
            onChange={() => setFilter('running')}
          />
          <label className="btn btn-outline-primary" htmlFor="filter-running">
            Running
          </label>

          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="filter-completed"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />
          <label className="btn btn-outline-success" htmlFor="filter-completed">
            Completed
          </label>

          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="filter-failed"
            checked={filter === 'failed'}
            onChange={() => setFilter('failed')}
          />
          <label className="btn btn-outline-danger" htmlFor="filter-failed">
            Failed
          </label>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center p-5">
          <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">No tasks found</h5>
          <p className="text-muted">
            {filter === 'all' 
              ? 'No tasks have been created yet.'
              : `No ${filter} tasks found.`
            }
          </p>
        </div>
      ) : (
        <div className="row">
          {filteredTasks.map((task) => (
            <div key={task.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0">{task.name}</h6>
                    <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                      <i className={`${getStatusIcon(task.status)} me-1`}></i>
                      {task.status}
                    </span>
                  </div>
                  
                  <p className="card-text">
                    <small className="text-muted">
                      Type: <span className="badge bg-light text-dark">{task.type}</span>
                    </small>
                  </p>

                  {task.result && (
                    <p className="card-text">
                      <small>{task.result}</small>
                    </p>
                  )}

                  <div className="card-text">
                    <small className="text-muted">
                      Created: {new Date(task.createdAt).toLocaleString()}
                    </small>
                  </div>

                  {task.startedAt && (
                    <div className="card-text">
                      <small className="text-muted">
                        Started: {new Date(task.startedAt).toLocaleString()}
                      </small>
                    </div>
                  )}

                  {task.completedAt && (
                    <div className="card-text">
                      <small className="text-muted">
                        Completed: {new Date(task.completedAt).toLocaleString()}
                      </small>
                    </div>
                  )}
                </div>

                <div className="card-footer bg-transparent">
                  <div className="btn-group w-100">
                    {task.status === 'PENDING' && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleExecuteTask(task.id)}
                      >
                        <i className="fas fa-play me-1"></i>
                        Execute
                      </button>
                    )}
                    
                    {task.status === 'RUNNING' && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleCancelTask(task.id)}
                      >
                        <i className="fas fa-stop me-1"></i>
                        Cancel
                      </button>
                    )}

                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fas fa-eye me-1"></i>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
