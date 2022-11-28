package com.example.back.Repositories;

import com.example.back.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    @Transactional
    @Query(value = "SELECT * " +
            "FROM USER_GROUP c " +
            "WHERE c.user_id = ?1 " +
            "AND c.group_id=?2",nativeQuery = true)
    Optional<UserGroup> findByUserAndGroup(Long userId, Long groupId);
}
