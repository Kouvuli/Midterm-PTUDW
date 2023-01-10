package com.example.back.Services;

import com.example.back.Entities.ConfirmationToken;
import com.example.back.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public String checkConfirmation(String token){
        Optional<ConfirmationToken> confirmationToken = confirmationTokenService.getToken(token);
        if (!confirmationToken.isPresent()){
            return "token not found";
        }


        if (confirmationToken.get().getConfirmedAt() != null) {
            return "email already confirmed";
        }

        LocalDateTime expiredAt = confirmationToken.get().getExpiredAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            return "token expired";
        }

        return "token haven't confirmed";

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