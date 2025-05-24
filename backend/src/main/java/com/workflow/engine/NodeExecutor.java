package com.workflow.engine;

import com.workflow.model.WorkflowNode;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class NodeExecutor {

    public Map<String, Object> executeNode(WorkflowNode node, Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();
        
        switch (node.getType()) {
            case "trigger":
                result = executeTriggerNode(node, input);
                break;
            case "condition":
                result = executeConditionNode(node, input);
                break;
            case "action":
                result = executeActionNode(node, input);
                break;
            case "approval":
                result = executeApprovalNode(node, input);
                break;
            case "end":
                result = executeEndNode(node, input);
                break;
            default:
                result.put("status", "completed");
                result.put("message", "Unknown node type: " + node.getType());
        }
        
        result.put("nodeId", node.getNodeId());
        result.put("nodeType", node.getType());
        result.put("timestamp", System.currentTimeMillis());
        
        return result;
    }

    private Map<String, Object> executeTriggerNode(WorkflowNode node, Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "completed");
        result.put("message", "Trigger node executed");
        result.put("triggerData", input != null ? input : new HashMap<>());
        
        // Simulate trigger processing
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        return result;
    }

    private Map<String, Object> executeConditionNode(WorkflowNode node, Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "completed");
        result.put("message", "Condition node executed");
        
        // Simple condition evaluation (in real implementation, parse the configuration)
        // For demo purposes, randomly return true/false
        boolean conditionResult = System.currentTimeMillis() % 2 == 0;
        result.put("conditionResult", conditionResult);
        result.put("condition", conditionResult ? "true" : "false");
        
        return result;
    }

    private Map<String, Object> executeActionNode(WorkflowNode node, Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "completed");
        result.put("message", "Action node executed");
        
        // Simulate action processing
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        result.put("actionResult", "Action completed successfully");
        return result;
    }

    private Map<String, Object> executeApprovalNode(WorkflowNode node, Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "completed");
        result.put("message", "Approval node executed");
        
        // Simulate approval (in real implementation, this would wait for human approval)
        // For demo purposes, auto-approve
        result.put("approved", true);
        result.put("approver", "system");
        result.put("approvalTime", System.currentTimeMillis());
        
        return result;
    }

    private Map<String, Object> executeEndNode(WorkflowNode node, Map<String, Object> input) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "completed");
        result.put("message", "End node reached - workflow complete");
        result.put("finalData", input);
        return result;
    }
}
