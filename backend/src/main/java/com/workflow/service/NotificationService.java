package com.workflow.service;

import com.workflow.model.Task;
import com.workflow.websocket.WorkflowWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class NotificationService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Autowired
    private WorkflowWebSocketHandler webSocketHandler;

    public void sendTaskCompletionNotification(Task task) {
        // Send WebSocket notification
        Map<String, Object> notification = Map.of(
            "type", "TASK_COMPLETED",
            "taskId", task.getId(),
            "taskName", task.getName(),
            "status", task.getStatus(),
            "timestamp", System.currentTimeMillis()
        );
        
        webSocketHandler.broadcastMessage(notification);

        // Send email notification if mail sender is configured
        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo("admin@workflow.com");
                message.setSubject("Task Completed: " + task.getName());
                message.setText("Task " + task.getName() + " has been completed with status: " + task.getStatus());
                mailSender.send(message);
            } catch (Exception e) {
                // Log email sending failure but don't throw exception
                System.err.println("Failed to send email notification: " + e.getMessage());
            }
        }
    }

    public void sendWorkflowNotification(String type, Object data) {
        Map<String, Object> notification = Map.of(
            "type", type,
            "data", data,
            "timestamp", System.currentTimeMillis()
        );
        
        webSocketHandler.broadcastMessage(notification);
    }
}
