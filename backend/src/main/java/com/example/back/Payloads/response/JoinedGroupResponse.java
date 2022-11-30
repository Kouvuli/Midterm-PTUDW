package com.example.back.Payloads.response;

import com.example.back.Entities.Role;
import com.example.back.Entities.User;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

public class JoinedGroupResponse {
    private Long id;

    private String name;

    private boolean lock;

    private Timestamp createAt;

    private User admin;

    private Role role;

    public JoinedGroupResponse(Long id, String name, boolean lock, Timestamp createAt, User admin, Role role) {
        this.id = id;
        this.name = name;
        this.lock = lock;
        this.createAt = createAt;
        this.admin = admin;
        this.role = role;
    }
}
