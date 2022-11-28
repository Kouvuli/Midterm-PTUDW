package com.example.back.Controllers;

import com.example.back.Entities.ConfirmationToken;
import com.example.back.Entities.InvitationToken;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Services.EmailService;
import com.example.back.Services.InvitationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/invitations")
public class InvitationController {

    @Autowired
    private InvitationTokenService invitationTokenService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/group/{token}")
    ResponseEntity<ResponeObject> getGroupByInvitation(@PathVariable String token){
//        Optional<InvitationToken> verificationToken= invitationTokenService.getToken(token);
//        if(!verificationToken.isPresent()){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                    new ResponeObject("failed","Cannot find group with token="+token,"")
//            );
//        }
//        in
        InvitationToken invitationToken = invitationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (invitationToken.isUsed()) {
            throw new IllegalStateException("link already used");
        }

        LocalDateTime expiredAt = invitationToken.getExpiredAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }
        return  ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get invitation succesfully",invitationToken.getGroup())
                );

    }
}
