package com.example.back.Payloads.request;

import javax.validation.constraints.NotBlank;

public class SendEmailRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String subject;

    @NotBlank
    private String body;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
