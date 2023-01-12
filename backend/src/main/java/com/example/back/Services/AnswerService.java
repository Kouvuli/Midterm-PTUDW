package com.example.back.Services;

import com.example.back.Entities.Answer;
import com.example.back.Entities.Presentation;
import com.example.back.Entities.Question;
import com.example.back.Repositories.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    @Autowired
    private AnswerRepository answerRepository;


    public List<Answer> getAnswersByQuestionId(Long id){
        return answerRepository.findAnswerByQuestionId(Sort.by("id"),id);
    }

    public Optional<Answer> getAnswerById(Long id){
    return answerRepository.findById(id);
}

    public Answer addAnswer(Answer answer){
        return answerRepository.save(answer);
    }

    public void deleteById(Long id){
        answerRepository.deleteById(id);
    }
}
