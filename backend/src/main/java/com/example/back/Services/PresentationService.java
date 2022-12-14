package com.example.back.Services;

import com.example.back.Entities.Group;
import com.example.back.Entities.Presentation;
import com.example.back.Entities.Question;
import com.example.back.Repositories.PresentationRepository;
import com.example.back.Repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PresentationService {

    @Autowired
    private PresentationRepository presentationRepository;

    @Autowired
    private QuestionService questionService;
    public Page<Presentation> getPresentation(Pageable pageable){
        return presentationRepository.findAll(pageable);
    }

    public Optional<Presentation> getPresentationById(Long id){
        return presentationRepository.findById(id);
    }
    public Optional<Presentation> getPresentationByAccessCode(String accessCode){
            return presentationRepository.findPresentationByAccessCode(accessCode);
    }
    public Optional<Presentation> getPresentationByTitle(String title){
        return presentationRepository.findByTitle(title);
    }

    public Presentation addPresentation(Presentation newPresentation){
        return presentationRepository.save(newPresentation);
    }

    public void deleteById(Long id){
        presentationRepository.findById(id).get().getQuestions().forEach(
                question -> {
                    questionService.deleteById(question.getId());
                }
        );
        presentationRepository.deleteById(id);
    }
}
