package com.example.back.Controllers;

import com.example.back.Entities.ChatAnswer;
import com.example.back.Entities.ChatQuestion;
import com.example.back.Entities.Question;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.ChatAnswerService;
import com.example.back.Services.ChatQuestionService;
import com.example.back.Services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/chatanswer")
public class ChatAnswerController {
    @Autowired
    private ChatAnswerService chatAnswerService;


    @Autowired
    private ChatQuestionService chatQuestionService;

    @GetMapping("")
    ResponseEntity<ResponseObjectPagination> getChatAnswers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10")int limit,
            @RequestParam(name = "order_by") String orderBy,
            @RequestParam(name="sort_by")String sortBy
    ){
        if(page<0 || limit <1){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObjectPagination(null,"failed","Cannot find chat answers","")
            );

        }
        Pageable pageable=null;
        if(orderBy.isEmpty()&&sortBy.isEmpty()){
            pageable= PageRequest.of(page-1,limit);
        }
        else if(orderBy.isEmpty()){
            pageable=PageRequest.of(page-1,limit, Sort.by(sortBy));
        }else{
            pageable= PageRequest.of(page-1,limit, Sort.by(sortBy).descending());
        }


        Page<ChatAnswer> chatAnswerPage= chatAnswerService.getAnswer(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObjectPagination(new Pagination(chatAnswerPage.getTotalPages()-1,chatAnswerPage.hasNext(),page,limit),"ok","",chatAnswerPage.getContent())
        );
    }


    @PostMapping("")
    ResponseEntity<ResponeObject> insertAnswer(@RequestBody ChatAnswer newChatAnswer){
        Optional<ChatQuestion>chatQuestion=chatQuestionService.getQuestionById(newChatAnswer.getQuestion().getId());
        if(!chatQuestion.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find chat question","")
            );
        }
        newChatAnswer.setCreateAt(new Timestamp(System.currentTimeMillis()));
        ChatAnswer chatAnswer=chatAnswerService.addAnswer(newChatAnswer);
        if(chatQuestion.get().getAnswers().size()>0){
            chatQuestion.get().setAnswered(true);
            chatQuestionService.addQuestion(chatQuestion.get());
        }


        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert answer succesfully", chatAnswer)
        );
    }


    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> updateAnswer(@RequestBody ChatAnswer chatAnswer, @PathVariable Long id){
        ChatAnswer updatedAnswer= chatAnswerService.getAnswerById(id)
                .map(answer->{
                    answer.setQuestion(chatAnswer.getQuestion());
                    return chatAnswerService.addAnswer(answer);
                }).orElseGet(()->{
                    chatAnswer.setId(id);
                    return chatAnswerService.addAnswer(chatAnswer);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update answer successfully",updatedAnswer)
        );
    }
}
