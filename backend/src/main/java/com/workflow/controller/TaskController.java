package com.workflow.controller;

import com.workflow.dto.TaskDTO;
import com.workflow.service.TaskExecutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task", description = "Task management endpoints")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskExecutionService taskExecutionService;

    @GetMapping
    @Operation(summary = "Get all tasks")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(taskExecutionService.getAllTasks());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskExecutionService.getTaskById(id));
    }

    @GetMapping("/workflow/{workflowId}")
    @Operation(summary = "Get tasks by workflow ID")
    public ResponseEntity<List<TaskDTO>> getTasksByWorkflowId(@PathVariable Long workflowId) {
        return ResponseEntity.ok(taskExecutionService.getTasksByWorkflowId(workflowId));
    }

    @PostMapping("/{id}/execute")
    @Operation(summary = "Execute task")
    public ResponseEntity<String> executeTask(@PathVariable Long id) {
        taskExecutionService.executeTask(id);
        return ResponseEntity.ok("Task execution started");
    }

    @PostMapping("/{id}/cancel")
    @Operation(summary = "Cancel task")
    public ResponseEntity<String> cancelTask(@PathVariable Long id) {
        taskExecutionService.cancelTask(id);
        return ResponseEntity.ok("Task cancelled");
    }
}
