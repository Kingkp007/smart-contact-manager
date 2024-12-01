package com.scm.exception;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.scm.dto.ErrorResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> validationErrors = new HashMap<>();
        List<ObjectError> validationErrorList = ex.getBindingResult().getAllErrors();

        validationErrorList.forEach((error) -> {
            String fieldName =  ((FieldError) error).getField();
            String validationMsg = error.getDefaultMessage();
            validationErrors.put(fieldName, validationMsg);
        });
        return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDto> handleUserAlreadyExistsException(UserAlreadyExistsException exception,
            WebRequest webRequest){
    	ErrorResponseDto errorResponseDTO = new ErrorResponseDto(
    			webRequest.getDescription(false),
    			HttpStatus.BAD_REQUEST,
    			exception.getMessage(),
    			LocalDateTime.now()
);
return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
}
    
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDto> handleBadCredentials(BadCredentialsException ex,WebRequest webRequest) {
    	ErrorResponseDto failureResponse = new ErrorResponseDto(
    			webRequest.getDescription(false),
    			HttpStatus.UNAUTHORIZED,
    			"Invalid Credentials",
    			LocalDateTime.now()
    			);
        return new ResponseEntity<>(failureResponse, HttpStatus.UNAUTHORIZED);
    }
    
    @ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponseDto> handleIOException(IOException ex,WebRequest webRequest) {
        // Log the exception (optional)
//        ex.printStackTrace(); // Or use a logger to log the error

    	ErrorResponseDto failureResponse = new ErrorResponseDto(
    			webRequest.getDescription(false),
    			HttpStatus.INTERNAL_SERVER_ERROR,
    			"An error occurred during redirection. Please try again later.",
    			LocalDateTime.now()
    			);
    	
        // Respond with a custom message or status
    	return new ResponseEntity<>(failureResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleUserAlreadyExistsException(ResourceNotFoundException exception,
            WebRequest webRequest){
    	ErrorResponseDto errorResponseDTO = new ErrorResponseDto(
    			webRequest.getDescription(false),
    			HttpStatus.NOT_FOUND,
    			exception.getMessage(),
    			LocalDateTime.now()
    			);
    	return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

	
}
