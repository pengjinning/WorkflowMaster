package com.workflow.repository;

import com.workflow.model.ExecutionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExecutionLogRepository extends JpaRepository<ExecutionLog, Long> {
    
    List<ExecutionLog> findByWorkflowId(Long workflowId);
    
    List<ExecutionLog> findByTaskId(Long taskId);
    
    List<ExecutionLog> findByWorkflowIdOrderByCreatedAtDesc(Long workflowId);
}
