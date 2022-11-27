package com.example.back.Services;

import com.example.back.Entities.*;
import com.example.back.Repositories.GroupRepository;
import com.example.back.Repositories.RoleRepository;
import com.example.back.Repositories.UserGroupRepository;
import com.example.back.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private RoleRepository roleRepository;


    public Page<Group> getGroup(Pageable pageable){
        return groupRepository.findAll(pageable);
    }
    public boolean existById(Long id){
            return groupRepository.existsById(id);
    }
    public void deleteById(Long id){
        groupRepository.deleteById(id);
    }
    public Optional<Group> getGroupById(Long id){
        return groupRepository.findById(id);
    }
    public Optional<Group> getGroupByName(String name){
        return groupRepository.findGroupByName(name);
    }

    public User getUserById(Long id){
        return userRepository.findById(id).get();
    }
    public Optional<UserGroup> getUserGroupById(UserGroupKey id){
        return userGroupRepository.findById(id);
    }
    public Role getRoleById(Long id){
        return roleRepository.findById(id).get();
    }
    public Group addGroup(Group newGroup){
        return groupRepository.save(newGroup);
    }

    public UserGroup addGroupMember(UserGroup data){
        return userGroupRepository.save(data);
    }
}
