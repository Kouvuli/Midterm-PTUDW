package com.example.back.Services;

import com.example.back.Constants.Constants;
import com.example.back.Interfaces.EmailSender;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender {


    private final JavaMailSender mailSender;

//    public EmailService() {
//        mailSender=new JavaMailSenderImpl();
//
//    }

    @Override
    @Async("backgroundProcessThreadPool")
    public void send(String to, String body,String subject) {

        SimpleMailMessage mess=new SimpleMailMessage();
        mess.setFrom(Constants.SENDER);
        mess.setTo(to);
        mess.setText(body);
        mess.setSubject(subject);

        mailSender.send(mess);

    }

    public String buildVerificationBody(String name, String link) {
        return "Hello "+name+", please click this link: "+link+" to verify your email and activate your account";
    }
}
