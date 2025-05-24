import React, { useState, useEffect } from 'react';

function NodeProperties({ node, onUpdate, onDelete, onClose }) {
  const [properties, setProperties] = useState({
    label: node.data.label || '',
    config: node.data.config || {}
  });

  useEffect(() => {
    setProperties({
      label: node.data.label || '',
      config: node.data.config || {}
    });
  }, [node]);

  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setProperties(prev => ({ ...prev, label: newLabel }));
    onUpdate(node.id, { label: newLabel });
  };

  const handleConfigChange = (key, value) => {
    const newConfig = { ...properties.config, [key]: value };
    setProperties(prev => ({ ...prev, config: newConfig }));
    onUpdate(node.id, { config: newConfig });
  };

  const renderConfigFields = () => {
    switch (node.type) {
      case 'trigger':
        return (
          <div>
            <div className="mb-3">
              <label className="form-label">Trigger Type</label>
              <select
                className="form-select"
                value={properties.config.triggerType || 'manual'}
                onChange={(e) => handleConfigChange('triggerType', e.target.value)}
              >
                <option value="manual">Manual</option>
                <option value="webhook">Webhook</option>
                <option value="schedule">Schedule</option>
                <option value="form">Form Submission</option>
              </select>
            </div>
            {properties.config.triggerType === 'webhook' && (
              <div className="mb-3">
                <label className="form-label">Webhook URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={properties.config.webhookUrl || ''}
                  onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
                  placeholder="https://example.com/webhook"
                />
              </div>
            )}
            {properties.config.triggerType === 'schedule' && (
              <div className="mb-3">
                <label className="form-label">Cron Expression</label>
                <input
                  type="text"
                  className="form-control"
                  value={properties.config.cronExpression || ''}
                  onChange={(e) => handleConfigChange('cronExpression', e.target.value)}
                  placeholder="0 0 12 * * ?"
                />
              </div>
            )}
          </div>
        );

      case 'condition':
        return (
          <div>
            <div className="mb-3">
              <label className="form-label">Condition Field</label>
              <input
                type="text"
                className="form-control"
                value={properties.config.field || ''}
                onChange={(e) => handleConfigChange('field', e.target.value)}
                placeholder="e.g., user.role"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Operator</label>
              <select
                className="form-select"
                value={properties.config.operator || 'equals'}
                onChange={(e) => handleConfigChange('operator', e.target.value)}
              >
                <option value="equals">Equals</option>
                <option value="not_equals">Not Equals</option>
                <option value="contains">Contains</option>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Value</label>
              <input
                type="text"
                className="form-control"
                value={properties.config.value || ''}
                onChange={(e) => handleConfigChange('value', e.target.value)}
                placeholder="Expected value"
              />
            </div>
          </div>
        );

      case 'action':
      case 'approval':
        return (
          <div>
            <div className="mb-3">
              <label className="form-label">Action Type</label>
              <select
                className="form-select"
                value={properties.config.actionType || 'email'}
                onChange={(e) => handleConfigChange('actionType', e.target.value)}
              >
                <option value="email">Send Email</option>
                <option value="approval">Request Approval</option>
                <option value="webhook">Call Webhook</option>
                <option value="delay">Add Delay</option>
              </select>
            </div>
            {properties.config.actionType === 'email' && (
              <>
                <div className="mb-3">
                  <label className="form-label">To Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={properties.config.toEmail || ''}
                    onChange={(e) => handleConfigChange('toEmail', e.target.value)}
                    placeholder="recipient@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    value={properties.config.subject || ''}
                    onChange={(e) => handleConfigChange('subject', e.target.value)}
                    placeholder="Email subject"
                  />
                </div>
              </>
            )}
            {properties.config.actionType === 'approval' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Approver Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={properties.config.approver || ''}
                    onChange={(e) => handleConfigChange('approver', e.target.value)}
                    placeholder="approver@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Timeout (hours)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={properties.config.timeout || '24'}
                    onChange={(e) => handleConfigChange('timeout', e.target.value)}
                    min="1"
                  />
                </div>
              </>
            )}
            {properties.config.actionType === 'webhook' && (
              <div className="mb-3">
                <label className="form-label">Webhook URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={properties.config.webhookUrl || ''}
                  onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
                  placeholder="https://api.example.com/webhook"
                />
              </div>
            )}
            {properties.config.actionType === 'delay' && (
              <div className="mb-3">
                <label className="form-label">Delay (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  value={properties.config.delayMinutes || '5'}
                  onChange={(e) => handleConfigChange('delayMinutes', e.target.value)}
                  min="1"
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-muted">
            <i className="fas fa-info-circle me-2"></i>
            No configuration options for this node type.
          </div>
        );
    }
  };

  return (
    <div className="node-properties">
      <div className="properties-header">
        <h6 className="mb-0">
          <i className="fas fa-cog me-2"></i>
          Node Properties
        </h6>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>

      <div className="properties-body">
        <div className="mb-3">
          <label className="form-label">Node Type</label>
          <div className="form-control-plaintext">
            <span className="badge bg-secondary">
              {node.type}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Label</label>
          <input
            type="text"
            className="form-control"
            value={properties.label}
            onChange={handleLabelChange}
            placeholder="Node label"
          />
        </div>

        <hr />

        <div className="config-section">
          <h6 className="mb-3">Configuration</h6>
          {renderConfigFields()}
        </div>
      </div>

      <div className="properties-footer">
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(node.id)}
        >
          <i className="fas fa-trash me-2"></i>
          Delete Node
        </button>
      </div>
    </div>
  );
}

export default NodeProperties;
