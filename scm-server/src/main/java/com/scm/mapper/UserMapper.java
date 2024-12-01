package com.scm.mapper;

import java.util.UUID;

import com.scm.dto.UserInfoDto;
import com.scm.entities.User;

public class UserMapper {

	public static User mapToUser(UserInfoDto userDto, User user) {
		user.setUserId(UUID.randomUUID().toString());
		user.setName(userDto.getUsername());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setPhoneNumber(userDto.getContact());
		user.setAbout(userDto.getAbout());
	
		
		return user;
	}
}
