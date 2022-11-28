package com.example.back.Interfaces;

public interface EmailSender {
    void send(String to, String body,String subject);
}