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
import java.util.Random;


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
        Group group=groupRepository.findById(id).get();
        group.setLock(true);
        addGroup(group);
    }
    public Optional<Group> getGroupById(Long id){
        return groupRepository.findById(id);
    }
    public Optional<Group> getGroupByName(String name){
        return groupRepository.findGroupByName(name);
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }
    public Optional<UserGroup> getUserGroupById(Long id){
        return userGroupRepository.findById(id);
    }
    public Optional<UserGroup> getUserGroupByUserIdAndGroupId(Long userId,Long groupId){
        return userGroupRepository.findByUserAndGroup(userId,groupId);
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

    public String genRandomAlphaNumeric(int length){
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'

        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }
}
