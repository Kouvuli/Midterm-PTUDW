package com.example.back.Services;

import com.example.back.Entities.ChatQuestion;
import com.example.back.Entities.Question;
import com.example.back.Repositories.ChatQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatQuestionService {
    @Autowired
    private ChatQuestionRepository chatQuestionRepository;


    public Page<ChatQuestion> getQuestion(Pageable pageable){

        return chatQuestionRepository.findAll(pageable);
    }

    public Optional<ChatQuestion> getQuestionById(Long id){
        return chatQuestionRepository.findById(id);
    }
    public ChatQuestion addQuestion(ChatQuestion newQuestion){
        return chatQuestionRepository.save(newQuestion);
    }


}
