package com.prediction.prediction.annotation;
import java.lang.reflect.Method;

import org.springframework.web.servlet.HandlerInterceptor;

import com.prediction.prediction.config.auth.CookieService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class CustomAnnotationInterceptor implements HandlerInterceptor {
    private final CookieService cookieService;
    public CustomAnnotationInterceptor(CookieService cookieService) {
        this.cookieService = cookieService;
    }
    // This method will be called before the controller method is invoked
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Check if the handler is a method
        if (handler instanceof org.springframework.web.method.HandlerMethod) {
            org.springframework.web.method.HandlerMethod handlerMethod = (org.springframework.web.method.HandlerMethod) handler;
            Method method = handlerMethod.getMethod();

            // Check if the method is annotated with @CustomAnnotation
            if (method.isAnnotationPresent(AuthForUser.class)) {
                AuthForUser annotation = method.getAnnotation(AuthForUser.class);
                cookieService.checkUserAuthentication(request, response , annotation.value());
                // You can add custom logic here
            }
        }
        // Proceed with the request
        return true;
    }

    // Optionally, you can implement postHandle and afterCompletion
}
