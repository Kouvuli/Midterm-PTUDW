package com.example.back.Services;

import com.example.back.Entities.Answer;
import com.example.back.Entities.ChatAnswer;
import com.example.back.Repositories.ChatAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatAnswerService {
    @Autowired
    private ChatAnswerRepository chatAnswerRepository;


    public Page<ChatAnswer> getAnswer(Pageable pageable){
        return chatAnswerRepository.findAll(pageable);
    }
    public Optional<ChatAnswer> getAnswerById(Long id){
        return chatAnswerRepository.findById(id);
    }

    public ChatAnswer addAnswer(ChatAnswer answer){
        return chatAnswerRepository.save(answer);
    }

    public void deleteById(Long id){
        chatAnswerRepository.deleteById(id);
    }
}
