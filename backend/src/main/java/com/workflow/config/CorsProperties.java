package com.workflow.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@ConfigurationProperties(prefix = "spring.mvc.cors")
public class CorsProperties {
    
    private String mapping;
    private String allowedOrigins;
    private String allowedOriginPatterns;
    private String allowedMethods;
    private String allowedHeaders;
    private String exposedHeaders;
    private boolean allowCredentials;
    private long maxAge;
    
    // Getters and setters
    public String getMapping() {
        return mapping;
    }
    
    public void setMapping(String mapping) {
        this.mapping = mapping;
    }
    
    public String getAllowedOrigins() {
        return allowedOrigins;
    }
    
    public void setAllowedOrigins(String allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }
    
    public String getAllowedOriginPatterns() {
        return allowedOriginPatterns;
    }
    
    public void setAllowedOriginPatterns(String allowedOriginPatterns) {
        this.allowedOriginPatterns = allowedOriginPatterns;
    }
    
    public String getAllowedMethods() {
        return allowedMethods;
    }
    
    public void setAllowedMethods(String allowedMethods) {
        this.allowedMethods = allowedMethods;
    }
    
    public String getAllowedHeaders() {
        return allowedHeaders;
    }
    
    public void setAllowedHeaders(String allowedHeaders) {
        this.allowedHeaders = allowedHeaders;
    }
    
    public String getExposedHeaders() {
        return exposedHeaders;
    }
    
    public void setExposedHeaders(String exposedHeaders) {
        this.exposedHeaders = exposedHeaders;
    }
    
    public boolean isAllowCredentials() {
        return allowCredentials;
    }
    
    public void setAllowCredentials(boolean allowCredentials) {
        this.allowCredentials = allowCredentials;
    }
    
    public long getMaxAge() {
        return maxAge;
    }
    
    public void setMaxAge(long maxAge) {
        this.maxAge = maxAge;
    }
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Convert string values to lists as needed
        if ("*".equals(allowedOrigins)) {
            config.setAllowedOrigins(Collections.singletonList("*"));
        } else {
            config.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
        }
        
        if ("*".equals(allowedOriginPatterns)) {
            config.setAllowedOriginPatterns(Collections.singletonList("*"));
        } else {
            config.setAllowedOriginPatterns(Arrays.asList(allowedOriginPatterns.split(",")));
        }
        
        if ("*".equals(allowedMethods)) {
            config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
        } else {
            config.setAllowedMethods(Arrays.asList(allowedMethods.split(",")));
        }
        
        if ("*".equals(allowedHeaders)) {
            config.setAllowedHeaders(Collections.singletonList("*"));
        } else {
            config.setAllowedHeaders(Arrays.asList(allowedHeaders.split(",")));
        }
        
        if (exposedHeaders != null && !exposedHeaders.isEmpty()) {
            config.setExposedHeaders(Arrays.asList(exposedHeaders.split(",")));
        }
        
        config.setAllowCredentials(allowCredentials);
        config.setMaxAge(maxAge);
        
        source.registerCorsConfiguration(mapping, config);
        return new CorsFilter(source);
    }
}