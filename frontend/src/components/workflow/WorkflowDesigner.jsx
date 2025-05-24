      {/* Node properties panel */}
      {selectedNode && (
        <div className="position-fixed top-50 end-0 translate-middle-y p-3" 
             style={{ 
               zIndex: 1050, 
               width: '380px', 
               maxWidth: '90vw',
               filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
             }}>
          <NodePropertiesPanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onSave={handleNodeUpdate}
          />
        </div>
      )}
