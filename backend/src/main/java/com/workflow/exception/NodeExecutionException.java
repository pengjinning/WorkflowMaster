package com.workflow.exception;

public class NodeExecutionException extends RuntimeException {
    
    private String nodeId;
    
    public NodeExecutionException(String nodeId, String message) {
        super(message);
        this.nodeId = nodeId;
    }
    
    public NodeExecutionException(String nodeId, String message, Throwable cause) {
        super(message, cause);
        this.nodeId = nodeId;
    }
    
    public String getNodeId() {
        return nodeId;
    }
}
