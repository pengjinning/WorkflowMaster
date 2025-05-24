package com.workflow.engine;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class ConditionEvaluator {

    public boolean evaluateCondition(String condition, Map<String, Object> context) {
        if (condition == null || condition.trim().isEmpty()) {
            return true;
        }

        // Simple condition evaluation
        // In a real implementation, you would use a proper expression language
        switch (condition.toLowerCase()) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                return evaluateComplexCondition(condition, context);
        }
    }

    private boolean evaluateComplexCondition(String condition, Map<String, Object> context) {
        // Parse and evaluate complex conditions
        // For demo purposes, implement basic operators
        
        if (condition.contains("==")) {
            String[] parts = condition.split("==");
            if (parts.length == 2) {
                String left = parts[0].trim();
                String right = parts[1].trim().replace("\"", "");
                
                Object leftValue = getValueFromContext(left, context);
                return leftValue != null && leftValue.toString().equals(right);
            }
        }
        
        if (condition.contains("!=")) {
            String[] parts = condition.split("!=");
            if (parts.length == 2) {
                String left = parts[0].trim();
                String right = parts[1].trim().replace("\"", "");
                
                Object leftValue = getValueFromContext(left, context);
                return leftValue == null || !leftValue.toString().equals(right);
            }
        }
        
        // Default to true for unknown conditions
        return true;
    }

    private Object getValueFromContext(String key, Map<String, Object> context) {
        if (context == null) {
            return null;
        }
        
        // Support nested keys like "user.role"
        String[] keys = key.split("\\.");
        Object current = context;
        
        for (String k : keys) {
            if (current instanceof Map) {
                current = ((Map<?, ?>) current).get(k);
            } else {
                return null;
            }
        }
        
        return current;
    }
}
