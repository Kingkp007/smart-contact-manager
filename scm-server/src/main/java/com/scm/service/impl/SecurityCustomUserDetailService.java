package com.scm.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.scm.controller.PageController;
import com.scm.repositories.UserRepostory;


@Service
public class SecurityCustomUserDetailService implements UserDetailsService {
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityCustomUserDetailService.class);
	
    @Autowired
    private UserRepostory userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	logger.info("Inside loadUserByUsername of SecurityCustomUserDetailService class");
        // apne user ko load karana hai
        return userRepo.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + username));

    }

}
