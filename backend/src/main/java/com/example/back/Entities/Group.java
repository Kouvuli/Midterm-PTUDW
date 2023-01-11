package com.example.back.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private boolean lock=false;
    @Column(name = "create_at")
    private Timestamp createAt;
    @ManyToOne
    @JoinColumn(name = "admin_id",referencedColumnName = "id")
    private User admin;


    @OneToMany(mappedBy = "group")
    @JsonIgnore
    private Set<Presentation> presentations =new HashSet<>();

    @OneToMany(mappedBy = "group")
    @JsonIgnore
    Set<UserGroup> roles=new HashSet<>();

    @OneToMany(mappedBy = "group")
    @JsonIgnore
    Set<InvitationToken> tokens=new HashSet<>();
    public Group() {
    }

    public Set<Presentation> getPresentations() {
        return presentations;
    }

    public void setPresentations(Set<Presentation> presentations) {
        this.presentations = presentations;
    }

    public boolean isLock() {
        return lock;
    }

    public void setLock(boolean lock) {
        this.lock = lock;
    }

//    public Set<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(Set<User> users) {
//        this.users = users;
//    }

    public Set<UserGroup> getRoles() {
        return roles;
    }

    public void setRoles(Set<UserGroup> roles) {
        this.roles = roles;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }
}
