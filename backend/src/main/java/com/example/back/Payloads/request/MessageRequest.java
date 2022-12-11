package com.example.back.Payloads.request;

public class MessageRequest {
    private String username;

    private Object data;

    public MessageRequest() {

    }

    public MessageRequest(String username, Object data) {
        super();
        this.username = username;
        this.data = data;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
