package com.scm.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scm.constants.AccountsConstant;
import com.scm.dto.LoginDto;
import com.scm.dto.ResponseDto;
import com.scm.dto.UserInfoDto;
import com.scm.service.IUserInfoService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;


@RestController
@RequestMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
public class PageController {
	
	private static final Logger logger = LoggerFactory.getLogger(PageController.class);
	
	@Autowired
    private final IUserInfoService iUserInfoService;
	
	@Autowired
	private final AuthenticationManager authenticationManager;
    
    public PageController(IUserInfoService iUserInfoService, AuthenticationManager authenticationManager) {
    	this.iUserInfoService = iUserInfoService;
    	this.authenticationManager = authenticationManager;
    }
     
	
	@PostMapping("/register")
	public ResponseEntity<ResponseDto> registerUser(@Valid @RequestBody UserInfoDto userinfoDto){
		iUserInfoService.createAccount(userinfoDto);
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(new ResponseDto(AccountsConstant.STATUS_201,AccountsConstant.MESSAGE_201));
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<ResponseDto> loginUser(@Valid @RequestBody LoginDto loginDto){
		logger.info("Inside loginUser in PageController. Credentials are : " + loginDto.getEmail() + " and " +loginDto.getPassword());
		 Authentication authentication = authenticationManager.authenticate(
			        new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
			    );
		 
//		  Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//		    List<String> roles = authorities.stream()
//		                                    .map(GrantedAuthority::getAuthority)
//		                                    .collect(Collectors.toList());
//			logger.info("roles are : "+roles);    
		 logger.info("Exiting loginUser in PageController. Credentials are : " + loginDto.getEmail() + " and " +loginDto.getPassword());
			
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(new ResponseDto(AccountsConstant.STATUS_200,AccountsConstant.MESSAGE_200));
	}

	@GetMapping("/check-api")
	public ResponseEntity<ResponseDto> getInfo(){
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(new ResponseDto(AccountsConstant.STATUS_200,AccountsConstant.MESSAGE_200));
	}
	
	
    @GetMapping("/check")
    public ResponseEntity<ResponseDto> checkAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && 
            !(authentication instanceof AnonymousAuthenticationToken)) {
            Map<String, Object> userDetails = new HashMap<>();
            userDetails.put("username", authentication.getName());
            // Add more details if needed, e.g., roles
            logger.info("Inside checkAuthentication and authentication successful");
            return ResponseEntity
    				.status(HttpStatus.OK)
    				.body(new ResponseDto(AccountsConstant.STATUS_200,AccountsConstant.MESSAGE_200));
        }
        logger.info("Inside checkAuthentication and authentication failed");
        return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(new ResponseDto(AccountsConstant.MESSAGE_404,AccountsConstant.MESSAGE_404));
    }
	
	
	
}
