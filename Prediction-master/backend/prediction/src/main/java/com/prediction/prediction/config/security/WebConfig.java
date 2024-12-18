package com.prediction.prediction.config.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.prediction.prediction.annotation.CustomAnnotationInterceptor;
import com.prediction.prediction.config.auth.CookieService;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final CookieService cookieService;
    public WebConfig(CookieService cookieService){
        this.cookieService = cookieService;

    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS requests from localhost:5173 (your frontend) and allow credentials
        registry.addMapping("/**")  // Apply to all endpoints
                .allowedOrigins("*") // Your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowCredentials(false)  // Allow credentials (cookies, authorization headers, etc.)
                .allowedHeaders("*");  // Allow all headers (you can specify if needed)
    }
     @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CustomAnnotationInterceptor(cookieService))
                .addPathPatterns("/**");  // Apply it to all paths, or specific ones
    }
}