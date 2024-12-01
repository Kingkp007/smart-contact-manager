package com.scm.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;

import com.scm.controller.PageController;
import com.scm.service.impl.SecurityCustomUserDetailService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.Session;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
	

    @Autowired
    private SecurityCustomUserDetailService userDetailService;

    @Autowired
    private OAuthAuthenicationSuccessHandler handler;
//
//    @Autowired
//    private AuthFailtureHandler authFailtureHandler;

    
    // configuraiton of authentication providerfor spring security 
//    TAKE USER FROM DATABASE
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
    	logger.info("Inside DaoAuthenticationProvider");
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        // user detail service ka object:
        daoAuthenticationProvider.setUserDetailsService(userDetailService);
        // password encoder ka object
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        logger.info("Exiting DaoAuthenticationProvider");
        return daoAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        // configuration
    	logger.info("Inside securityFilterChain of SecurityConfig object");

    	httpSecurity.csrf(AbstractHttpConfigurer::disable);
    	httpSecurity.cors(Customizer.withDefaults());
//    	httpSecurity.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.authorizeHttpRequests(authorize -> {
        	
        	authorize.requestMatchers("/login","/user/auth/logout").permitAll(); // Allow public access to login
        	
           	authorize.anyRequest().authenticated();
        });
//        httpSecurity.anyMatchers("/user/profile").authenticated();
    
        httpSecurity.oauth2Login(oauth2 -> 
//        	oauth2.defaultSuccessUrl("http://localhost:5173/",true));
        	oauth2.successHandler(handler));
        
        // Logout configuration
        httpSecurity.logout(logout -> 
            logout
                .logoutUrl("/user/auth/logout") // Endpoint for logout
                .logoutSuccessUrl("/login") // Redirect after successful logout
                .invalidateHttpSession(true) // Invalidate session
                .deleteCookies("JSESSIONID") // Clear cookies
                .deleteCookies("CURRENT_LOGGEDIN_USER")
                .addLogoutHandler((request, response, authentication) -> {
                    logger.info("Custom Logout Handler: User has been logged out");
                    // Add any additional custom logout handling here, if needed
                })
                .logoutSuccessHandler((request, response, authentication) -> {
                    logger.info("Logout Successful");
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.getWriter().write("Logout Successful");
//                    response.sendRedirect("http://localhost:5173/login");
                })
        );
        
        logger.info("Eiting securityFilterChain of SecurityConfig object");
        return httpSecurity.build();

    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
