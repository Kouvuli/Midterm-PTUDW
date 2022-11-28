package com.example.back.Entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "invitation_token")
public class InvitationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "expired_at",nullable = false)
    private LocalDateTime expiredAt;

    @Column(name = "is_used")
    private boolean isUsed=false;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "group_id"
    )
    private Group group;

    public InvitationToken(String token, LocalDateTime createdAt, LocalDateTime expiredAt, Group group) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.group = group;
    }

    public InvitationToken() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean used) {
        isUsed = used;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
