package com.workflow.engine;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TriggerHandler {

    public boolean canTrigger(String triggerType, Map<String, Object> data) {
        switch (triggerType) {
            case "webhook":
                return handleWebhookTrigger(data);
            case "schedule":
                return handleScheduleTrigger(data);
            case "manual":
                return handleManualTrigger(data);
            case "form":
                return handleFormTrigger(data);
            default:
                return false;
        }
    }

    private boolean handleWebhookTrigger(Map<String, Object> data) {
        // Validate webhook data
        return data != null && !data.isEmpty();
    }

    private boolean handleScheduleTrigger(Map<String, Object> data) {
        // Check if it's time to trigger based on schedule
        // For demo purposes, always return true
        return true;
    }

    private boolean handleManualTrigger(Map<String, Object> data) {
        // Manual triggers are always valid
        return true;
    }

    private boolean handleFormTrigger(Map<String, Object> data) {
        // Validate form submission data
        return data != null && data.containsKey("formData");
    }
}
