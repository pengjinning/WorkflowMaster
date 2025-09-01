/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-09-01 16:44:01
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-01 17:05:46
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 * 
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
package com.workflow.controller;

import com.workflow.dto.WorkflowDTO;
import com.workflow.service.WorkflowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflows")
@Tag(name = "Workflow", description = "Workflow management endpoints")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class WorkflowController {

    @Autowired
    private WorkflowService workflowService;

    @GetMapping
    @Operation(summary = "Get all workflows")
    public ResponseEntity<List<WorkflowDTO>> getAllWorkflows() {
        return ResponseEntity.ok(workflowService.getAllWorkflows());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get workflow by ID")
    public ResponseEntity<WorkflowDTO> getWorkflowById(@PathVariable Long id) {
        return ResponseEntity.ok(workflowService.getWorkflowById(id));
    }

    @PostMapping
    @Operation(summary = "Create new workflow")
    public ResponseEntity<WorkflowDTO> createWorkflow(@RequestBody WorkflowDTO workflowDTO) {
        return ResponseEntity.ok(workflowService.createWorkflow(workflowDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update workflow")
    public ResponseEntity<WorkflowDTO> updateWorkflow(@PathVariable Long id, @RequestBody WorkflowDTO workflowDTO) {
        return ResponseEntity.ok(workflowService.updateWorkflow(id, workflowDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete workflow")
    public ResponseEntity<Void> deleteWorkflow(@PathVariable Long id) {
        workflowService.deleteWorkflow(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/execute")
    @Operation(summary = "Execute workflow")
    public ResponseEntity<String> executeWorkflow(@PathVariable Long id) {
        workflowService.executeWorkflow(id);
        return ResponseEntity.ok("Workflow execution started");
    }

    @PostMapping("/{id}/activate")
    @Operation(summary = "Activate workflow")
    public ResponseEntity<WorkflowDTO> activateWorkflow(@PathVariable Long id) {
        return ResponseEntity.ok(workflowService.activateWorkflow(id));
    }

    @PostMapping("/{id}/deactivate")
    @Operation(summary = "Deactivate workflow")
    public ResponseEntity<WorkflowDTO> deactivateWorkflow(@PathVariable Long id) {
        return ResponseEntity.ok(workflowService.deactivateWorkflow(id));
    }
}
