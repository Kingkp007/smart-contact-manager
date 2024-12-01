package com.scm.service;

import java.util.List;
import java.util.Optional;

import com.scm.dto.UserInfoDto;
import com.scm.entities.User;

public interface IUserInfoService {

	public User createAccount(UserInfoDto userInfoDto);
	
	
	Optional<User> getUserById(String id);

    Optional<User> updateUser(User user);

    void deleteUser(String id);

    boolean isUserExist(String userId);

    boolean isUserExistByEmail(String email);

    List<User> getAllUsers();

    User getUserByEmail(String email);
}
