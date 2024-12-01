package com.scm.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST) 
public class UserAlreadyExistsException extends RuntimeException{

	public UserAlreadyExistsException(String message) {
//		passing message to RuntimeException
		super(message);
		// TODO Auto-generated constructor stub
	}
}
