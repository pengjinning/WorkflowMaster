import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TriggerNode from './nodes/TriggerNode';
import ConditionNode from './nodes/ConditionNode';
import ActionNode from './nodes/ActionNode';
import EndNode from './nodes/EndNode';
import NodePalette from './NodePalette';
import NodeProperties from './NodeProperties';
import WorkflowToolbar from './WorkflowToolbar';
import '../../styles/workflow-builder.css';

const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
  approval: ActionNode, // Use ActionNode for approval
  end: EndNode,
};

const initialNodes = [
  {
    id: 'start-1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { label: 'Application Received', config: { triggerType: 'form' } },
  },
  {
    id: 'approval-1',
    type: 'action',
    position: { x: 300, y: 100 },
    data: { label: 'Manager Approval', config: { actionType: 'approval' } },
  },
  {
    id: 'condition-1',
    type: 'condition',
    position: { x: 500, y: 100 },
    data: { label: 'Position Applied', config: { condition: 'position == "Senior"' } },
  },
  {
    id: 'hr-approval-1',
    type: 'action',
    position: { x: 700, y: 50 },
    data: { label: 'HR Final Approval', config: { actionType: 'approval' } },
  },
  {
    id: 'end-1',
    type: 'end',
    position: { x: 900, y: 100 },
    data: { label: 'Process Complete' },
  },
];

const initialEdges = [
  { id: 'e1', source: 'start-1', target: 'approval-1' },
  { id: 'e2', source: 'approval-1', target: 'condition-1' },
  { id: 'e3', source: 'condition-1', target: 'hr-approval-1', label: 'Yes' },
  { id: 'e4', source: 'condition-1', target: 'end-1', label: 'No' },
  { id: 'e5', source: 'hr-approval-1', target: 'end-1' },
];

function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setIsPropertiesOpen(true);
  }, []);

  const onNodeDragStop = useCallback((event, node) => {
    console.log('Node dragged:', node);
  }, []);

  const addNode = useCallback((type) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      data: { 
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        config: {}
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const updateNode = useCallback((nodeId, updates) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    );
  }, [setNodes]);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
    setIsPropertiesOpen(false);
  }, [setNodes, setEdges]);

  const saveWorkflow = useCallback(() => {
    const workflowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label
      }))
    };
    
    console.log('Saving workflow:', workflowData);
    // Here you would typically send this to your backend
    alert('Workflow saved successfully!');
  }, [nodes, edges]);

  const executeWorkflow = useCallback(() => {
    console.log('Executing workflow...');
    // Here you would trigger workflow execution
    alert('Workflow execution started!');
  }, []);

  return (
    <div className="workflow-builder">
      <WorkflowToolbar 
        onSave={saveWorkflow}
        onExecute={executeWorkflow}
        onAddNode={addNode}
      />
      
      <div className="workflow-content">
        <NodePalette onAddNode={addNode} />
        
        <div className="workflow-canvas-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            fitView
            className="workflow-canvas"
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
            <Panel position="top-center">
              <div className="workflow-title">
                <h5 className="mb-0">New Hire Approval Process</h5>
              </div>
            </Panel>
          </ReactFlow>
        </div>
        
        {isPropertiesOpen && selectedNode && (
          <NodeProperties
            node={selectedNode}
            onUpdate={updateNode}
            onDelete={deleteNode}
            onClose={() => setIsPropertiesOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default WorkflowCanvas;
