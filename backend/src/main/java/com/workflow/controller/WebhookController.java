package com.workflow.controller;

import com.workflow.service.WorkflowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
@Tag(name = "Webhook", description = "Webhook endpoints for external integrations")
@CrossOrigin(origins = "*")
public class WebhookController {

    @Autowired
    private WorkflowService workflowService;

    @PostMapping("/n8n/trigger/{workflowId}")
    @Operation(summary = "Webhook endpoint for n8n to trigger workflows")
    public ResponseEntity<Map<String, Object>> n8nTrigger(
            @PathVariable Long workflowId,
            @RequestBody(required = false) Map<String, Object> payload) {
        
        try {
            workflowService.executeWorkflowWithPayload(workflowId, payload);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Workflow triggered successfully",
                "workflowId", workflowId
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to trigger workflow: " + e.getMessage(),
                "workflowId", workflowId
            ));
        }
    }

    @PostMapping("/generic/trigger/{workflowId}")
    @Operation(summary = "Generic webhook endpoint for any external service")
    public ResponseEntity<Map<String, Object>> genericTrigger(
            @PathVariable Long workflowId,
            @RequestBody(required = false) Map<String, Object> payload,
            @RequestParam(required = false) String source) {
        
        try {
            workflowService.executeWorkflowWithPayload(workflowId, payload);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Workflow triggered successfully from " + (source != null ? source : "unknown source"),
                "workflowId", workflowId,
                "timestamp", System.currentTimeMillis()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to trigger workflow: " + e.getMessage(),
                "workflowId", workflowId,
                "timestamp", System.currentTimeMillis()
            ));
        }
    }

    @GetMapping("/status")
    @Operation(summary = "Check webhook service status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        return ResponseEntity.ok(Map.of(
            "status", "active",
            "message", "Webhook service is running",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
