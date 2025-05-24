package com.workflow.service;

import com.workflow.dto.TaskDTO;
import com.workflow.model.Task;
import com.workflow.repository.TaskRepository;
import com.workflow.exception.WorkflowException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskExecutionService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private NotificationService notificationService;

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new WorkflowException("Task not found with id: " + id));
        return convertToDTO(task);
    }

    public List<TaskDTO> getTasksByWorkflowId(Long workflowId) {
        return taskRepository.findByWorkflowId(workflowId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void executeTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new WorkflowException("Task not found with id: " + taskId));
        
        task.setStatus("RUNNING");
        task.setStartedAt(LocalDateTime.now());
        taskRepository.save(task);

        // Simulate task execution
        try {
            Thread.sleep(2000); // Simulate work
            task.setStatus("COMPLETED");
            task.setCompletedAt(LocalDateTime.now());
            task.setResult("Task completed successfully");
        } catch (InterruptedException e) {
            task.setStatus("FAILED");
            task.setResult("Task execution interrupted");
        } finally {
            taskRepository.save(task);
        }

        // Send notification
        notificationService.sendTaskCompletionNotification(task);
    }

    public void cancelTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new WorkflowException("Task not found with id: " + taskId));
        
        task.setStatus("CANCELLED");
        task.setCompletedAt(LocalDateTime.now());
        task.setResult("Task cancelled by user");
        taskRepository.save(task);
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setType(task.getType());
        dto.setStatus(task.getStatus());
        dto.setWorkflowId(task.getWorkflowId());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setStartedAt(task.getStartedAt());
        dto.setCompletedAt(task.getCompletedAt());
        dto.setResult(task.getResult());
        return dto;
    }
}
