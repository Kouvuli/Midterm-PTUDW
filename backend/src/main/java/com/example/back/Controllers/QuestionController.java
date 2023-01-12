package com.example.back.Controllers;

import com.example.back.Entities.Answer;
import com.example.back.Entities.Presentation;
import com.example.back.Entities.Question;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.AnswerService;
import com.example.back.Services.GroupService;
import com.example.back.Services.PresentationService;
import com.example.back.Services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;


    @Autowired
    private PresentationService presentationService;

    @Autowired
    private AnswerService answerService;



    @GetMapping("/{id}")
    ResponseEntity<ResponeObject> getQuestionsByPresentationId(@PathVariable Long id){
        Optional<Presentation> presentation= presentationService.getPresentationById(id);
        if(!presentation.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find presentation for this question","")
            );
        }
        List<Question> list=questionService.getQuestionPresentationId(id);

        return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get questions succesfully",list)
                );

    }

    @PostMapping("")
    ResponseEntity<ResponeObject> insertQuestion(@RequestBody Question newQuestion){
        Optional<Presentation> presentation= presentationService.getPresentationById(newQuestion.getPresentation().getId());
        if(!presentation.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find presentation for this question","")
            );
        }
        newQuestion.setPresentation(presentation.get());
        newQuestion.setCreateAt(new Timestamp(System.currentTimeMillis()));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert question succesfully",questionService.addQuestion(newQuestion))
        );
    }


    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> updateQuestion(@RequestBody Question newQuestion, @PathVariable Long id){
        Question updatedQuestion= questionService.getQuestionById(id)
                .map(question->{
                    question.setQuestion(newQuestion.getQuestion());
                    question.setType(newQuestion.getType());
                    question.setAnswer(newQuestion.getAnswer());
                    return questionService.addQuestion(question);
                }).orElseGet(()->{
                    newQuestion.setId(id);
                    return questionService.addQuestion(newQuestion);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update question successfully",updatedQuestion)
        );
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponeObject> deleteQuestion(@PathVariable Long id){
        Optional<Question> question=questionService.getQuestionById(id);
        if(question.isPresent()){
            questionService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponeObject("ok","Deleted question succesfully","")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponeObject("failed","Cannot find question to delete","")
        );
    }
}
