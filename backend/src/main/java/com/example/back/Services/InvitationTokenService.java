package com.example.back.Services;

import com.example.back.Entities.InvitationToken;
import com.example.back.Repositories.InvitationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InvitationTokenService {
    @Autowired
    private InvitationTokenRepository invitationTokenRepository;

    public void saveVerficationToken(InvitationToken token){
        invitationTokenRepository.save(token);
    }
    public Optional<InvitationToken> getToken(String token){
        return invitationTokenRepository.findByToken(token);
    }

    public int setIsUsed(String token) {
        return invitationTokenRepository.updateIsUsed(
                token, true);
    }
}
