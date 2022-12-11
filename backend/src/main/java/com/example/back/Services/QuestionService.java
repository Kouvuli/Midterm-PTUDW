package com.example.back.Services;


import com.example.back.Entities.Group;
import com.example.back.Entities.Presentation;
import com.example.back.Entities.Question;
import com.example.back.Repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public Page<Question> getQuestion(Pageable pageable){
        return questionRepository.findAll(pageable);
    }

    public Optional<Question> getQuestionById(Long id){
        return questionRepository.findById(id);
    }
    public Question addQuestion(Question newQuestion){
        return questionRepository.save(newQuestion);
    }

    public void deleteById(Long id){
        questionRepository.deleteById(id);
    }
}
