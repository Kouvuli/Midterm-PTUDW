package com.example.back.Controllers;

import com.example.back.Entities.User;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("")
    ResponseEntity<ResponseObjectPagination> getAllUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10")int limit
    ){
        if(page<0 || limit <1){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObjectPagination(null,"failed","Cannot find user","")
            );
        }
        Page<User> userPage= userService.getUser(PageRequest.of(page-1,limit));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObjectPagination(new Pagination(userPage.getTotalPages()-1,userPage.hasNext(),page,limit),"ok","",userPage.getContent())
        );
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponeObject> getUserById(@PathVariable Long id){
        Optional<User> user= userService.getUserById(id);
        return user.isPresent()?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Query account succesfully",user)
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("failed","Cannot find account with id="+id,"")
                );
    }




}
