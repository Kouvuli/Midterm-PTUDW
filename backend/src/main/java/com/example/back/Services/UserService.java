package com.example.back.Services;


import com.example.back.Entities.Group;
import com.example.back.Entities.User;
import com.example.back.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Page<User> getUser(Pageable pageable){
        return userRepository.findAll(pageable);
    }
    public boolean existByUsername(String username){
        return userRepository.existsByUsername(username);
    }
    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }
    public Optional<User> getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
    public User addUser(User newUser){
        return userRepository.save(newUser);
    }

    public void enableUser(String email){

    }

    public void deleteById(Long id) {
        User user=userRepository.findById(id).get();
        user.setLock(true);
        addUser(user);
    }
}
