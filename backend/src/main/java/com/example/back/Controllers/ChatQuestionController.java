package com.example.back.Controllers;


import com.example.back.Entities.ChatQuestion;
import com.example.back.Entities.Presentation;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.ChatQuestionService;
import com.example.back.Services.PresentationService;
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
@RequestMapping("/api/v1/chatquestion")
public class ChatQuestionController {
    @Autowired
    private ChatQuestionService chatQuestionService;

    @Autowired
    private PresentationService presentationService;

    @GetMapping("/{id}")
    ResponseEntity<ResponseObjectPagination> getChatQuestionsByPresentationId(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10")int limit,
            @RequestParam(name = "order_by",defaultValue = "") String orderBy,
            @RequestParam(name="sort_by",defaultValue = "")String sortBy,
            @PathVariable Long id
    ){
        if(page<0 || limit <1){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObjectPagination(null,"failed","Cannot find chat questions","")
            );

        }
        Optional<Presentation>presentation=presentationService.getPresentationById(id);

        if(!presentation.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObjectPagination(null,"failed","Cannot find presentation","")
            );
        }
        Pageable pageable=null;
        if(orderBy.isEmpty()&&sortBy.isEmpty()){
            pageable=PageRequest.of(page-1,limit);
        }
        else if(orderBy.isEmpty()){
            pageable=PageRequest.of(page-1,limit, Sort.by(sortBy));
        }else{
            if(orderBy.equals("ascending")){
                pageable=PageRequest.of(page-1,limit, Sort.by(sortBy));
            }else{

                pageable= PageRequest.of(page-1,limit, Sort.by(sortBy).descending());
            }
        }


        Page<ChatQuestion> chatQuestions= chatQuestionService.getQuestionByPresentationId(pageable,id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObjectPagination(new Pagination(chatQuestions.getTotalPages()-1,chatQuestions.hasNext(),page,limit),"ok","",chatQuestions.getContent())
        );
    }

    @GetMapping("/answer/{id}")
    ResponseEntity<ResponeObject> getAnswersByQuestionId(@PathVariable Long id){
        Optional<ChatQuestion> chatQuestion=chatQuestionService.getQuestionById(id);
        if(!chatQuestion.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find chat question","")
            );
        }
        return ResponseEntity.ok().body(
                new ResponeObject("ok","Get answers successfully!",chatQuestion.get().getAnswers())
        );
    }
    @GetMapping("/{id}/upvote")
    ResponseEntity<ResponeObject> upvoteQuestion(@PathVariable Long id){
        Optional<ChatQuestion> chatQuestion=chatQuestionService.getQuestionById(id);
        if(!chatQuestion.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find chat question","")
            );
        }
        chatQuestion.get().setVote(chatQuestion.get().getVote()+1);

        return ResponseEntity.ok().body(
                new ResponeObject("ok","Upvote successfully!", chatQuestionService.addQuestion(chatQuestion.get()))
        );
    }

    @GetMapping("/{id}/downvote")
    ResponseEntity<ResponeObject> downvoteQuestion(@PathVariable Long id){
        Optional<ChatQuestion> chatQuestion=chatQuestionService.getQuestionById(id);
        if(!chatQuestion.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find chat question","")
            );
        }
        if(chatQuestion.get().getVote()>0){

            chatQuestion.get().setVote(chatQuestion.get().getVote()-1);
        }

        return ResponseEntity.ok().body(
                new ResponeObject("ok","Upvote successfully!", chatQuestionService.addQuestion(chatQuestion.get()))
        );
    }

    @GetMapping("/{id}/answered")
    ResponseEntity<ResponeObject> answeredQuestion(@PathVariable Long id){
        Optional<ChatQuestion> chatQuestion=chatQuestionService.getQuestionById(id);
        if(!chatQuestion.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find chat question","")
            );
        }
        chatQuestion.get().setAnswered(true);

        return ResponseEntity.ok().body(
                new ResponeObject("ok","Change question answered successfully!", chatQuestionService.addQuestion(chatQuestion.get()))
        );
    }


    @PostMapping("")
    ResponseEntity<ResponeObject> insertQuestion(@RequestBody ChatQuestion newQuestion){
        newQuestion.setVote(0l);
        newQuestion.setCreateAt(new Timestamp(System.currentTimeMillis()));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert question succesfully", chatQuestionService.addQuestion(newQuestion))
        );
    }


    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> updateQuestion(@RequestBody ChatQuestion newQuestion, @PathVariable Long id){
        ChatQuestion updatedQuestion= chatQuestionService.getQuestionById(id)
                .map(question->{
                    question.setQuestion(newQuestion.getQuestion());
                    return chatQuestionService.addQuestion(question);
                }).orElseGet(()->{
                    newQuestion.setId(id);
                    return chatQuestionService.addQuestion(newQuestion);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update question successfully",updatedQuestion)
        );
    }
}
