// package com.prediction.prediction.config.auth;

// import jakarta.servlet.Filter;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.ServletRequest;
// import jakarta.servlet.ServletResponse;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import lombok.AllArgsConstructor;
// import lombok.RequiredArgsConstructor;

// import java.io.IOException;

// import org.springframework.context.annotation.Configuration;

// import com.prediction.prediction.exception.MainException;

// @Configuration
// @RequiredArgsConstructor
// public class JwtFilter implements Filter {

//   private final CookieService cookieService;

//   @Override
//   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//       throws IOException, ServletException {
//   // Cast ServletRequest to HttpServletRequest
//   HttpServletRequest httpServletRequest = (HttpServletRequest) request;
  
//   // Cast ServletResponse to HttpServletResponse (not request)
//   HttpServletResponse httpServletResponse = (HttpServletResponse) response;

//     try {
//      cookieService.checkUserAuthentication(httpServletRequest, httpServletResponse);
//       chain.doFilter(request, response);
//     } catch (MainException e) {
//       request.setAttribute("error",e.getStatusCode() + "," + e.getMessage() );
//       chain.doFilter(request, response);
//     }
//   }

// }
