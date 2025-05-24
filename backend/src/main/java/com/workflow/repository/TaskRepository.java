package com.workflow.repository;

import com.workflow.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    List<Task> findByWorkflowId(Long workflowId);
    
    List<Task> findByStatus(String status);
    
    List<Task> findByWorkflowIdAndStatus(Long workflowId, String status);
}
