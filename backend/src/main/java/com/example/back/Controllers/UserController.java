package com.example.back.Controllers;


import com.example.back.Entities.Group;
import com.example.back.Entities.User;
import com.example.back.Entities.UserGroup;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.JoinedGroupResponse;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder encoder;
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
                        new ResponeObject("ok","Query user succesfully",user)
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("failed","Cannot find user with id="+id,"")
                );
    }

    @GetMapping("/{id}/ownGroups")
    ResponseEntity<ResponeObject> getUserOwnedGroupById(@PathVariable Long id){
        Optional<User> user= userService.getUserById(id);
        return user.isPresent()?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Query succesfully",user.get().getOwnGroup())
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("failed","Cannot find user with id="+id,"")
                );
    }
    @GetMapping("/{id}/groups")
    ResponseEntity<ResponeObject> getUserGroupById(@PathVariable Long id){
        Optional<User> user= userService.getUserById(id);
        if(!user.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find user with id="+id,"")
            );
        }
        Set<JoinedGroupResponse> returnGroups=new HashSet<>();
        user.get().getRoles().forEach(userGroup -> {
            if(userGroup.getRole().getId()!=4){
                JoinedGroupResponse temp=new JoinedGroupResponse(userGroup.getGroup().getId(), userGroup.getGroup().getName(),userGroup.getGroup().isLock(),userGroup.getGroup().getCreateAt(),userGroup.getGroup().getAdmin(),userGroup.getRole());
                returnGroups.add(temp);
            }
        });

        return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Query succesfully",returnGroups)
                );

    }
    @PutMapping("/changepassword/{id}")
    ResponseEntity<ResponeObject> changePassword(@RequestBody User newUser, @PathVariable Long id){
        Optional<User> user= userService.getUserById(id);
        if(!user.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","User not exists!","")
            );
        }


        if(user.get().isLock()){
            return ResponseEntity.status(HttpStatus.LOCKED).body(
                    new ResponeObject("failed","User is locked!",user.get())
            );
        }
        user.get().setPassword(encoder.encode(newUser.getPassword()));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update password successfully",userService.addUser(user.get()))
        );
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> updateUser(@RequestBody User newUser, @PathVariable Long id){
        Optional<User> user= userService.getUserById(id);
        if(!user.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","User not exists!","")
            );
        }


        if(user.get().isLock()){
            return ResponseEntity.status(HttpStatus.LOCKED).body(
                    new ResponeObject("failed","User is locked!",user.get())
            );
        }
        user.get().setFullname(newUser.getFullname());
        user.get().setBirthday(newUser.getBirthday());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update user successfully",userService.addUser(user.get()))
        );
    }
    @DeleteMapping("/{id}")
    ResponseEntity<ResponeObject> deleteUser(@PathVariable Long id){
        Optional<User> user= userService.getUserById(id);
        if(!user.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find user to delete","")
            );
        }
        if(user.get().isLock()){
            return ResponseEntity.status(HttpStatus.LOCKED).body(
                    new ResponeObject("failed","User is locked!",user.get())
            );
        }
        userService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Deleted user succesfully","")
        );
    }



}
