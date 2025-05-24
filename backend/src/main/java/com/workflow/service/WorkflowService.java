package com.workflow.service;

import com.workflow.dto.WorkflowDTO;
import com.workflow.engine.WorkflowEngine;
import com.workflow.model.Workflow;
import com.workflow.model.WorkflowNode;
import com.workflow.model.WorkflowEdge;
import com.workflow.repository.WorkflowRepository;
import com.workflow.exception.WorkflowException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Arrays;

@Service
@Transactional
public class WorkflowService {

    @Autowired
    private WorkflowRepository workflowRepository;

    @Autowired
    private WorkflowEngine workflowEngine;

    @Autowired
    private NotificationService notificationService;

    @PostConstruct
    public void initializeDummyWorkflow() {
        // Create a sample workflow when the application starts
        if (workflowRepository.count() == 0) {
            createSampleWorkflow();
        }
    }

    private void createSampleWorkflow() {
        Workflow workflow = new Workflow();
        workflow.setName("New Hire Approval Process");
        workflow.setDescription("Sample workflow for new employee approval process");
        workflow.setActive(true);
        workflow.setCreatedAt(LocalDateTime.now());
        workflow.setUpdatedAt(LocalDateTime.now());

        // Create nodes
        WorkflowNode startNode = new WorkflowNode();
        startNode.setNodeId("start-1");
        startNode.setType("trigger");
        startNode.setLabel("Application Received");
        startNode.setPositionX(100);
        startNode.setPositionY(100);
        startNode.setConfiguration("{\"triggerType\":\"form\",\"formName\":\"Job Application\"}");
        startNode.setWorkflow(workflow);

        WorkflowNode approvalNode = new WorkflowNode();
        approvalNode.setNodeId("approval-1");
        approvalNode.setType("approval");
        approvalNode.setLabel("Manager Approval");
        approvalNode.setPositionX(300);
        approvalNode.setPositionY(100);
        approvalNode.setConfiguration("{\"approver\":\"manager@example.com\",\"timeout\":\"24h\"}");
        approvalNode.setWorkflow(workflow);

        WorkflowNode conditionNode = new WorkflowNode();
        conditionNode.setNodeId("condition-1");
        conditionNode.setType("condition");
        conditionNode.setLabel("Position Applied");
        conditionNode.setPositionX(500);
        conditionNode.setPositionY(100);
        conditionNode.setConfiguration("{\"field\":\"position\",\"operator\":\"equals\",\"value\":\"Senior\"}");
        conditionNode.setWorkflow(workflow);

        WorkflowNode hrApprovalNode = new WorkflowNode();
        hrApprovalNode.setNodeId("hr-approval-1");
        hrApprovalNode.setType("approval");
        hrApprovalNode.setLabel("HR Final Approval");
        hrApprovalNode.setPositionX(700);
        hrApprovalNode.setPositionY(50);
        hrApprovalNode.setConfiguration("{\"approver\":\"hr@example.com\",\"timeout\":\"48h\"}");
        hrApprovalNode.setWorkflow(workflow);

        WorkflowNode endNode = new WorkflowNode();
        endNode.setNodeId("end-1");
        endNode.setType("end");
        endNode.setLabel("Process Complete");
        endNode.setPositionX(900);
        endNode.setPositionY(100);
        endNode.setConfiguration("{}");
        endNode.setWorkflow(workflow);

        workflow.setNodes(Arrays.asList(startNode, approvalNode, conditionNode, hrApprovalNode, endNode));

        // Create edges
        WorkflowEdge edge1 = new WorkflowEdge();
        edge1.setSourceNodeId("start-1");
        edge1.setTargetNodeId("approval-1");
        edge1.setWorkflow(workflow);

        WorkflowEdge edge2 = new WorkflowEdge();
        edge2.setSourceNodeId("approval-1");
        edge2.setTargetNodeId("condition-1");
        edge2.setWorkflow(workflow);

        WorkflowEdge edge3 = new WorkflowEdge();
        edge3.setSourceNodeId("condition-1");
        edge3.setTargetNodeId("hr-approval-1");
        edge3.setCondition("true");
        edge3.setWorkflow(workflow);

        WorkflowEdge edge4 = new WorkflowEdge();
        edge4.setSourceNodeId("condition-1");
        edge4.setTargetNodeId("end-1");
        edge4.setCondition("false");
        edge4.setWorkflow(workflow);

        WorkflowEdge edge5 = new WorkflowEdge();
        edge5.setSourceNodeId("hr-approval-1");
        edge5.setTargetNodeId("end-1");
        edge5.setWorkflow(workflow);

        workflow.setEdges(Arrays.asList(edge1, edge2, edge3, edge4, edge5));

        workflowRepository.save(workflow);
    }

    public List<WorkflowDTO> getAllWorkflows() {
        return workflowRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public WorkflowDTO getWorkflowById(Long id) {
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new WorkflowException("Workflow not found with id: " + id));
        return convertToDTO(workflow);
    }

    public WorkflowDTO createWorkflow(WorkflowDTO workflowDTO) {
        Workflow workflow = convertToEntity(workflowDTO);
        workflow.setCreatedAt(LocalDateTime.now());
        workflow.setUpdatedAt(LocalDateTime.now());
        Workflow savedWorkflow = workflowRepository.save(workflow);
        return convertToDTO(savedWorkflow);
    }

    public WorkflowDTO updateWorkflow(Long id, WorkflowDTO workflowDTO) {
        Workflow existingWorkflow = workflowRepository.findById(id)
                .orElseThrow(() -> new WorkflowException("Workflow not found with id: " + id));
        
        existingWorkflow.setName(workflowDTO.getName());
        existingWorkflow.setDescription(workflowDTO.getDescription());
        existingWorkflow.setUpdatedAt(LocalDateTime.now());
        
        Workflow savedWorkflow = workflowRepository.save(existingWorkflow);
        return convertToDTO(savedWorkflow);
    }

    public void deleteWorkflow(Long id) {
        if (!workflowRepository.existsById(id)) {
            throw new WorkflowException("Workflow not found with id: " + id);
        }
        workflowRepository.deleteById(id);
    }

    public void executeWorkflow(Long workflowId) {
        Workflow workflow = workflowRepository.findById(workflowId)
                .orElseThrow(() -> new WorkflowException("Workflow not found with id: " + workflowId));
        
        workflowEngine.executeWorkflow(workflow, null);
    }

    public void executeWorkflowWithPayload(Long workflowId, Map<String, Object> payload) {
        Workflow workflow = workflowRepository.findById(workflowId)
                .orElseThrow(() -> new WorkflowException("Workflow not found with id: " + workflowId));
        
        workflowEngine.executeWorkflow(workflow, payload);
    }

    public WorkflowDTO activateWorkflow(Long id) {
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new WorkflowException("Workflow not found with id: " + id));
        
        workflow.setActive(true);
        workflow.setUpdatedAt(LocalDateTime.now());
        
        Workflow savedWorkflow = workflowRepository.save(workflow);
        return convertToDTO(savedWorkflow);
    }

    public WorkflowDTO deactivateWorkflow(Long id) {
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new WorkflowException("Workflow not found with id: " + id));
        
        workflow.setActive(false);
        workflow.setUpdatedAt(LocalDateTime.now());
        
        Workflow savedWorkflow = workflowRepository.save(workflow);
        return convertToDTO(savedWorkflow);
    }

    private WorkflowDTO convertToDTO(Workflow workflow) {
        WorkflowDTO dto = new WorkflowDTO();
        dto.setId(workflow.getId());
        dto.setName(workflow.getName());
        dto.setDescription(workflow.getDescription());
        dto.setActive(workflow.isActive());
        dto.setCreatedAt(workflow.getCreatedAt());
        dto.setUpdatedAt(workflow.getUpdatedAt());
        return dto;
    }

    private Workflow convertToEntity(WorkflowDTO dto) {
        Workflow workflow = new Workflow();
        workflow.setId(dto.getId());
        workflow.setName(dto.getName());
        workflow.setDescription(dto.getDescription());
        workflow.setActive(dto.isActive());
        return workflow;
    }
}
