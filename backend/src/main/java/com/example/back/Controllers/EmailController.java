package com.example.back.Controllers;

import com.example.back.Entities.Group;
import com.example.back.Payloads.request.SendEmailRequest;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("")
    ResponseEntity<ResponeObject> sendEmail(
            @RequestBody SendEmailRequest data){
        emailService.send(data.getEmail(),data.getBody(),data.getSubject());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Send email successfully!","")
        );
    }
}
