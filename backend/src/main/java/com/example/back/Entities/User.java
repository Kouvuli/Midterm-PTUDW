package com.example.back.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;

    @JsonIgnore
    private String password;

    private String fullname;

    private String birthday;

    private boolean enable=false;

    private boolean lock=false;
    @Column(name = "create_at")
    private Timestamp createAt;

//    @ManyToMany
//    @JoinTable(name = "user_group", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "group_id"))
//    private Set<Group> userGroup = new HashSet<>();

    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    private Set<Group> ownGroup =new HashSet<>();

    @OneToMany(mappedBy = "author")
    @JsonIgnore
    private Set<Presentation> presentations =new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    Set<UserGroup> roles=new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    Set<ConfirmationToken> tokens=new HashSet<>();
    public User() {
    }

    public User(String username, String email, String password, String fullname, String birthday, Timestamp createAt) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.birthday = birthday;
        this.createAt = createAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public boolean isLock() {
        return lock;
    }

    public void setLock(boolean lock) {
        this.lock = lock;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

//    public Set<Group> getUserGroup() {
//        return userGroup;
//    }
//
//    public void setUserGroup(Set<Group> userGroup) {
//        this.userGroup = userGroup;
//    }

    public Set<Group> getOwnGroup() {
        return ownGroup;
    }

    public void setOwnGroup(Set<Group> ownGroup) {
        this.ownGroup = ownGroup;
    }

    public Set<UserGroup> getRoles() {
        return roles;
    }

    public void setRoles(Set<UserGroup> roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
}

