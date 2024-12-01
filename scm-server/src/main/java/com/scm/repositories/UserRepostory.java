package com.scm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scm.entities.User;
import java.util.List;
import java.util.Optional;


public interface UserRepostory extends JpaRepository<User, String> {

	public Optional<User> findByEmail(String email);
	
	Optional<User> findByEmailAndPassword(String email, String password);
}
