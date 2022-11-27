package com.example.back.Payloads.request;

import javax.validation.constraints.NotBlank;

public class MemberRequest {
    @NotBlank
    private Long userId;

    @NotBlank
    private Long roleId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
