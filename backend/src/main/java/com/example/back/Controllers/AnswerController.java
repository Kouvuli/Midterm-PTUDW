package com.example.back.Controllers;

import com.example.back.Entities.Answer;
import com.example.back.Entities.Presentation;
import com.example.back.Entities.Question;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Services.AnswerService;
import com.example.back.Services.PresentationService;
import com.example.back.Services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/answers")
public class AnswerController {
    @Autowired
    private AnswerService answerService;


    @Autowired
    private QuestionService questionService;



    @GetMapping("/{id}")
    ResponseEntity<ResponeObject> getOptionsByQuestionId(@PathVariable Long id){
        Optional<Question> question= questionService.getQuestionById(id);
        return question.isPresent()?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get questions succesfully",question.get().getOptions())
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("failed","Cannot find question for this answer","")
                );
    }

    @PostMapping("")
    ResponseEntity<ResponeObject> insertAnswer(@RequestBody Answer newAnswer){
        Optional<Question> question= questionService.getQuestionById(newAnswer.getQuestion().getId());
        if(!question.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find question for this answer","")
            );
        }
        newAnswer.setQuestion(question.get());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert answer succesfully",answerService.addAnswer(newAnswer))
        );
    }


    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> updateAnswer(@RequestBody Answer newAnswer, @PathVariable Long id){
        Answer updatedAnswer= answerService.getAnswerById(id)
                .map(answer->{
                    answer.setAnswer(newAnswer.getAnswer());
                    return answerService.addAnswer(answer);
                }).orElseGet(()->{
                    newAnswer.setId(id);
                    return answerService.addAnswer(newAnswer);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update answer successfully",updatedAnswer)
        );
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponeObject> deleteAnswer(@PathVariable Long id){
        Optional<Answer> answer=answerService.getAnswerById(id);
        if(answer.isPresent()){
            answerService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponeObject("ok","Deleted answer succesfully","")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponeObject("failed","Cannot find answer to delete","")
        );
    }
}
