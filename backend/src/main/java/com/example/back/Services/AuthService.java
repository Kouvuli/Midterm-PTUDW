package com.example.back.Services;

import com.example.back.Entities.ConfirmationToken;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  ConfirmationTokenService confirmationTokenService;

    public ResponseEntity<?> checkConfirmation(String token){
        Optional<ConfirmationToken> confirmationToken = confirmationTokenService.getToken(token);
        if (!confirmationToken.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Token not found","")
            );
        }


        if (confirmationToken.get().getConfirmedAt() != null) {
            return ResponseEntity.ok().body(
                    new ResponeObject("ok","Email already confirmed",confirmationToken.get().getUser())
            );

        }

        LocalDateTime expiredAt = confirmationToken.get().getExpiredAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(
                    new ResponeObject("failed","Token expired","")
            );
        }

        return ResponseEntity.badRequest().body(
                new ResponeObject("failed","Email haven't confirmed","")
        );

    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiredAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userRepository.findByUsername(
                confirmationToken.getUser().getUsername()).get().setEnable(true);
        return "confirmed";
    }


}