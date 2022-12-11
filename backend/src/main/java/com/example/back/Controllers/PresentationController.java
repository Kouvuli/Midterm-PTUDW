package com.example.back.Controllers;


import com.example.back.Entities.Presentation;
import com.example.back.Entities.User;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.GroupService;
import com.example.back.Services.PresentationService;
import com.example.back.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.sql.Timestamp;
import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/presentations")
public class PresentationController {

    @Autowired
    private PresentationService presentationService;


    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;


    @GetMapping("")
    ResponseEntity<ResponseObjectPagination> getPresentations(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10")int limit
    ){
        if(page<0 || limit <1){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObjectPagination(null,"failed","Cannot find any presentation","")
            );
        }
        Page<Presentation> presentationPage= presentationService.getPresentation(PageRequest.of(page-1,limit));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObjectPagination(new Pagination(presentationPage.getTotalPages()-1,presentationPage.hasNext(),page,limit),"ok","",presentationPage.getContent())
        );
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponeObject> getPresentationById(@PathVariable Long id){
        Optional<Presentation> presentation= presentationService.getPresentationById(id);
        return presentation.isPresent()?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get presentation succesfully",presentation.get())
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("failed","Cannot find presentation with id="+id,"")
                );
    }

    @PostMapping("")
    ResponseEntity<ResponeObject> insertPresentation(@RequestBody Presentation newPresentation){
        Optional<Presentation> presentation=presentationService.getPresentationByTitle(newPresentation.getTitle());
        Optional<User> author=userService.getUserById(newPresentation.getAuthor().getId());
        if(!author.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    new ResponeObject("failed","Cannot find author!","")
            );
        }
        if(presentation.isPresent()){

            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    new ResponeObject("failed","Presentation already exists!","")
            );
        }
        String accessCode =groupService.genRandomAlphaNumeric(15);
        newPresentation.setAccessCode(accessCode);
        newPresentation.setAuthor(groupService.getUserById(newPresentation.getAuthor().getId()).get());
        newPresentation.setCreateAt(new Timestamp(System.currentTimeMillis()));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert presentation succesfully",presentationService.addPresentation(newPresentation))
        );
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> updatePresentation(@RequestBody Presentation newPresentation, @PathVariable Long id){
        Presentation updatedPresentation= presentationService.getPresentationById(id)
                .map(presentation->{
                    if(!newPresentation.getAccessCode().isEmpty()){
                        presentation.setAccessCode(newPresentation.getAccessCode());
                    }
                    presentation.setTitle(newPresentation.getTitle());

                    return presentationService.addPresentation(presentation);
                }).orElseGet(()->{
                    newPresentation.setId(id);
                    return presentationService.addPresentation(newPresentation);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update User successfully",updatedPresentation)
        );
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponeObject> deletePresentation(@PathVariable Long id){
        Optional<Presentation> presentation=presentationService.getPresentationById(id);
        if(presentation.isPresent()){
            presentationService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponeObject("ok","Deleted presentation succesfully","")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponeObject("failed","Cannot find presentation to delete","")
        );
    }
}
