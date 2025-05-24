package com.workflow.engine;

import com.workflow.model.Workflow;
import com.workflow.model.WorkflowNode;
import com.workflow.model.Task;
import com.workflow.model.ExecutionLog;
import com.workflow.repository.TaskRepository;
import com.workflow.repository.ExecutionLogRepository;
import com.workflow.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Component
public class WorkflowEngine {

    @Autowired
    private NodeExecutor nodeExecutor;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ExecutionLogRepository executionLogRepository;

    @Autowired
    private NotificationService notificationService;

    public void executeWorkflow(Workflow workflow, Map<String, Object> payload) {
        // Log workflow execution start
        ExecutionLog startLog = new ExecutionLog();
        startLog.setWorkflowId(workflow.getId());
        startLog.setStatus("STARTED");
        startLog.setMessage("Workflow execution started");
        startLog.setCreatedAt(LocalDateTime.now());
        if (payload != null) {
            startLog.setData(payload.toString());
        }
        executionLogRepository.save(startLog);

        // Send notification
        notificationService.sendWorkflowNotification("WORKFLOW_STARTED", Map.of(
            "workflowId", workflow.getId(),
            "workflowName", workflow.getName()
        ));

        try {
            // Find start node (trigger node)
            WorkflowNode startNode = workflow.getNodes().stream()
                    .filter(node -> "trigger".equals(node.getType()))
                    .findFirst()
                    .orElse(null);

            if (startNode == null) {
                throw new RuntimeException("No trigger node found in workflow");
            }

            // Execute workflow starting from trigger node
            executeFromNode(workflow, startNode, payload);

            // Log workflow execution completion
            ExecutionLog endLog = new ExecutionLog();
            endLog.setWorkflowId(workflow.getId());
            endLog.setStatus("COMPLETED");
            endLog.setMessage("Workflow execution completed successfully");
            endLog.setCreatedAt(LocalDateTime.now());
            executionLogRepository.save(endLog);

            // Send completion notification
            notificationService.sendWorkflowNotification("WORKFLOW_COMPLETED", Map.of(
                "workflowId", workflow.getId(),
                "workflowName", workflow.getName()
            ));

        } catch (Exception e) {
            // Log workflow execution error
            ExecutionLog errorLog = new ExecutionLog();
            errorLog.setWorkflowId(workflow.getId());
            errorLog.setStatus("FAILED");
            errorLog.setMessage("Workflow execution failed: " + e.getMessage());
            errorLog.setCreatedAt(LocalDateTime.now());
            executionLogRepository.save(errorLog);

            // Send error notification
            notificationService.sendWorkflowNotification("WORKFLOW_FAILED", Map.of(
                "workflowId", workflow.getId(),
                "workflowName", workflow.getName(),
                "error", e.getMessage()
            ));

            throw e;
        }
    }

    private void executeFromNode(Workflow workflow, WorkflowNode node, Map<String, Object> payload) {
        // Create and save task for this node
        Task task = new Task();
        task.setName(node.getLabel());
        task.setType(node.getType());
        task.setWorkflowId(workflow.getId());
        task.setNodeId(node.getNodeId());
        task.setConfiguration(node.getConfiguration());
        task.setStatus("RUNNING");
        task.setCreatedAt(LocalDateTime.now());
        task.setStartedAt(LocalDateTime.now());
        task = taskRepository.save(task);

        try {
            // Execute node
            Map<String, Object> result = nodeExecutor.executeNode(node, payload);
            
            // Update task with result
            task.setStatus("COMPLETED");
            task.setResult(result.toString());
            task.setCompletedAt(LocalDateTime.now());
            taskRepository.save(task);

            // Log node execution
            ExecutionLog log = new ExecutionLog();
            log.setWorkflowId(workflow.getId());
            log.setTaskId(task.getId());
            log.setNodeId(node.getNodeId());
            log.setStatus("COMPLETED");
            log.setMessage("Node executed successfully");
            log.setData(result.toString());
            log.setCreatedAt(LocalDateTime.now());
            executionLogRepository.save(log);

            // Find next nodes based on edges
            workflow.getEdges().stream()
                    .filter(edge -> edge.getSourceNodeId().equals(node.getNodeId()))
                    .forEach(edge -> {
                        WorkflowNode nextNode = workflow.getNodes().stream()
                                .filter(n -> n.getNodeId().equals(edge.getTargetNodeId()))
                                .findFirst()
                                .orElse(null);
                        
                        if (nextNode != null && shouldExecuteEdge(edge.getCondition(), result)) {
                            executeFromNode(workflow, nextNode, result);
                        }
                    });

        } catch (Exception e) {
            // Update task with error
            task.setStatus("FAILED");
            task.setResult("Node execution failed: " + e.getMessage());
            task.setCompletedAt(LocalDateTime.now());
            taskRepository.save(task);

            // Log error
            ExecutionLog errorLog = new ExecutionLog();
            errorLog.setWorkflowId(workflow.getId());
            errorLog.setTaskId(task.getId());
            errorLog.setNodeId(node.getNodeId());
            errorLog.setStatus("FAILED");
            errorLog.setMessage("Node execution failed: " + e.getMessage());
            errorLog.setCreatedAt(LocalDateTime.now());
            executionLogRepository.save(errorLog);

            throw e;
        }
    }

    private boolean shouldExecuteEdge(String condition, Map<String, Object> result) {
        if (condition == null || condition.isEmpty()) {
            return true; // No condition means always execute
        }
        
        // Simple condition evaluation (in real implementation, use a proper expression evaluator)
        if ("true".equals(condition)) {
            return true;
        } else if ("false".equals(condition)) {
            return false;
        }
        
        // Default to true for unknown conditions
        return true;
    }
}
