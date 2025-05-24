import React, { useState, useEffect } from 'react';
import { workflowService } from '../../services/workflowService';

function DashboardHome() {
  const [stats, setStats] = useState({
    totalWorkflows: 0,
    activeWorkflows: 0,
    totalTasks: 0,
    runningTasks: 0,
    completedTasks: 0,
    failedTasks: 0
  });
  const [recentWorkflows, setRecentWorkflows] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load workflows and tasks
      const [workflows, tasks] = await Promise.all([
        workflowService.getWorkflows(),
        workflowService.getTasks()
      ]);

      // Calculate stats
      const activeWorkflows = workflows.filter(w => w.active).length;
      const runningTasks = tasks.filter(t => t.status === 'RUNNING').length;
      const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
      const failedTasks = tasks.filter(t => t.status === 'FAILED').length;

      setStats({
        totalWorkflows: workflows.length,
        activeWorkflows,
        totalTasks: tasks.length,
        runningTasks,
        completedTasks,
        failedTasks
      });

      // Set recent items (last 5)
      setRecentWorkflows(workflows.slice(-5).reverse());
      setRecentTasks(tasks.slice(-5).reverse());

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeWorkflow = async (workflowId) => {
    try {
      await workflowService.executeWorkflow(workflowId);
      await loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error executing workflow:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </h2>
        <button
          className="btn btn-outline-primary"
          onClick={loadDashboardData}
        >
          <i className="fas fa-sync-alt me-2"></i>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.totalWorkflows}</h3>
                  <p className="card-text">Total Workflows</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-project-diagram fa-2x"></i>
                </div>
              </div>
              <div className="mt-2">
                <small>{stats.activeWorkflows} active</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.totalTasks}</h3>
                  <p className="card-text">Total Tasks</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-tasks fa-2x"></i>
                </div>
              </div>
              <div className="mt-2">
                <small>{stats.runningTasks} running</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.completedTasks}</h3>
                  <p className="card-text">Completed Tasks</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-check-circle fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title">{stats.failedTasks}</h3>
                  <p className="card-text">Failed Tasks</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-exclamation-circle fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Workflows */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-project-diagram me-2"></i>
                Recent Workflows
              </h5>
            </div>
            <div className="card-body">
              {recentWorkflows.length === 0 ? (
                <p className="text-muted text-center">No workflows found</p>
              ) : (
                <div className="list-group list-group-flush">
                  {recentWorkflows.map((workflow) => (
                    <div key={workflow.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{workflow.name}</h6>
                        <small className="text-muted">{workflow.description}</small>
                        <div className="mt-1">
                          <span className={`badge ${workflow.active ? 'bg-success' : 'bg-secondary'}`}>
                            {workflow.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => executeWorkflow(workflow.id)}
                        disabled={!workflow.active}
                      >
                        <i className="fas fa-play me-1"></i>
                        Execute
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-tasks me-2"></i>
                Recent Tasks
              </h5>
            </div>
            <div className="card-body">
              {recentTasks.length === 0 ? (
                <p className="text-muted text-center">No tasks found</p>
              ) : (
                <div className="list-group list-group-flush">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{task.name}</h6>
                          <small className="text-muted">Type: {task.type}</small>
                        </div>
                        <span className={`badge ${
                          task.status === 'COMPLETED' ? 'bg-success' :
                          task.status === 'RUNNING' ? 'bg-primary' :
                          task.status === 'FAILED' ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="mt-2">
                        <small className="text-muted">
                          Created: {new Date(task.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-bolt me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <button className="btn btn-outline-primary w-100">
                    <i className="fas fa-plus me-2"></i>
                    Create Workflow
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button className="btn btn-outline-info w-100">
                    <i className="fas fa-eye me-2"></i>
                    View All Tasks
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button className="btn btn-outline-success w-100">
                    <i className="fas fa-chart-bar me-2"></i>
                    View Analytics
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button className="btn btn-outline-secondary w-100">
                    <i className="fas fa-cog me-2"></i>
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
