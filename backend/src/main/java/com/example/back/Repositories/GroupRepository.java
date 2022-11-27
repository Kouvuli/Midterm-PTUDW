package com.example.back.Repositories;

import com.example.back.Entities.Group;
import com.example.back.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface GroupRepository extends JpaRepository<Group,Long>{
        Optional<Group> findGroupByName(String username);

}
