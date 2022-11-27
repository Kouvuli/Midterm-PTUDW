package com.example.back.Repositories;

import com.example.back.Entities.Role;
import com.example.back.Entities.UserGroup;
import com.example.back.Entities.UserGroupKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserGroupRepository extends JpaRepository<UserGroup, UserGroupKey> {

}
