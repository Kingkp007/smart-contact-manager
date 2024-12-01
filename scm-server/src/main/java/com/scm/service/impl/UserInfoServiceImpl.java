package com.scm.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.scm.dto.UserInfoDto;
import com.scm.entities.User;
import com.scm.exception.ResourceNotFoundException;
import com.scm.exception.UserAlreadyExistsException;
import com.scm.helper.AppConstants;
import com.scm.mapper.UserMapper;
import com.scm.repositories.UserRepostory;
import com.scm.service.IUserInfoService;

import ch.qos.logback.classic.Logger;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserInfoServiceImpl implements IUserInfoService {
	
	
	@Autowired
	UserRepostory userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public User createAccount(UserInfoDto userInfoDto) {
		User user = UserMapper.mapToUser(userInfoDto, new User());
		
		Optional<User> alreadySavedUser = userRepository.findByEmail(userInfoDto.getEmail());
		
		if(alreadySavedUser.isPresent()) {
			throw new UserAlreadyExistsException("User already present with given Email Id");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
//		user.setRoleList(List.of(AppConstants.ROLE_USER));
		User saveUser = userRepository.save(user);
		return saveUser;
		
	}

	@Override
	public Optional<User> getUserById(String id) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public Optional<User> updateUser(User user) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public void deleteUser(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isUserExist(String userId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isUserExistByEmail(String email) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		
		return userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not founnd"));
	}
}
