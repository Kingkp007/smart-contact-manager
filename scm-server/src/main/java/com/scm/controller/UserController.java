package com.scm.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scm.constants.AccountsConstant;
import com.scm.dto.ResponseDto;
import com.scm.entities.User;
import com.scm.helper.Helper;
import com.scm.service.IUserInfoService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private IUserInfoService userService;
	
	@GetMapping("/dashboard")
	ResponseEntity<ResponseDto> userDashboard(){
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseDto(AccountsConstant.STATUS_200, AccountsConstant.MESSAGE_200));
	}
	
	
	@GetMapping("/profile")
	public ResponseEntity<User> userProfile(Authentication authentication) {
		String username = Helper.getEmailOfLoggedInUser(authentication);
		logger.info("User logged in : {}",username);
		
		User user =  userService.getUserByEmail(username);
		
		logger.info("User name is : "+ user.getName() + ". User Email is : "+user.getEmail());
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(user);
	}
	
	@GetMapping("/private-endpoint")
	public Map<String, Object> testPrivateEndPoint(@AuthenticationPrincipal OAuth2User principal) {
		logger.info("Inside testPrivateEndPoint : "+principal);
		return principal.getAttributes();
	}
	
}
