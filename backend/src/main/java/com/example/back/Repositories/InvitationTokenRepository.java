package com.example.back.Repositories;

import com.example.back.Entities.InvitationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface InvitationTokenRepository extends JpaRepository<InvitationToken,Long> {
    Optional<InvitationToken> findByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE InvitationToken v " +
            "SET v.isUsed = ?2 " +
            "WHERE v.token = ?1")
    int updateIsUsed(String token,
                          boolean isUsed);
}
