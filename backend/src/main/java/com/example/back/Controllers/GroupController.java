package com.example.back.Controllers;

import com.example.back.Entities.Group;
import com.example.back.Entities.Role;
import com.example.back.Entities.UserGroup;
import com.example.back.Entities.UserGroupKey;
import com.example.back.Payloads.request.MemberRequest;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @GetMapping("")
    ResponseEntity<ResponseObjectPagination> getAllGroups(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10")int limit
    ){
        if(page<0 || limit <1){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObjectPagination(null,"failed","Cannot find group","")
            );
        }
        Page<Group> groupPage= groupService.getGroup(PageRequest.of(page-1,limit));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObjectPagination(new Pagination(groupPage.getTotalPages()-1,groupPage.hasNext(),page,limit),"ok","",groupPage.getContent())
        );
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponeObject> getReactionById(@PathVariable Long id){
        Optional<Group> group=groupService.getGroupById(id);
        return group.isPresent()?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get group succesfully",group)
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("failed","Cannot find group with id="+id,"")
                );
    }


    @PostMapping("")
    ResponseEntity<ResponeObject> insertGroup(@RequestBody Group newGroup){
        Optional<Group> group=groupService.getGroupByName(newGroup.getName());
        if(group.isPresent()){

            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    new ResponeObject("failed","Group already exists!",group)
            );
        }

        newGroup.setAdmin(groupService.getUserById(newGroup.getAdmin().getId()));
        newGroup.setCreateAt(new Timestamp(System.currentTimeMillis()));
        newGroup.getUsers().add(groupService.getUserById(newGroup.getAdmin().getId()));
//        newGroup.getRoles().add(new UserGroup(groupService.getUserById(newGroup.getAdmin().getId()), newGroup, groupService.getRoleById(4l)));
//        groupService.addGroup(newGroup);
//        groupService.addGroupMember(new UserGroup(groupService.getUserById(newGroup.getAdmin().getId()), newGroup, groupService.getRoleById(4l)));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert group succesfully",groupService.addGroup(newGroup))
        );
    }
    @PostMapping("/{id}")
    ResponseEntity<ResponeObject> insertMemberToGroup(@PathVariable Long id,@Valid @RequestBody MemberRequest data){
        Optional<Group> group=groupService.getGroupById(id);
        if(!group.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Group not exists!",group)
            );
        }


        UserGroup userGroup= new UserGroup(new UserGroupKey(data.getUserId(),data.getRoleId()),groupService.getUserById(data.getUserId()), group.get(), groupService.getRoleById(data.getRoleId()));


        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert group succesfully",groupService.addGroupMember(userGroup))
        );
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> changeMemberRole(@PathVariable Long id,@Valid @RequestBody MemberRequest data){
        Optional<Group> group=groupService.getGroupById(id);
        if(!group.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Group not exists!",group)
            );
        }
        Optional<UserGroup> userGroup=groupService.getUserGroupById(new UserGroupKey(data.getUserId(),data.getRoleId()));

        userGroup.get().setRole(groupService.getRoleById(data.getRoleId()));





        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert group succesfully",groupService.addGroupMember(userGroup.get()))
        );
    }
    @DeleteMapping("/{id}")
    ResponseEntity<ResponeObject> deleteReaction(@PathVariable Long id){
        boolean exists=groupService.existById(id);
        if(exists){
            groupService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponeObject("ok","Deleted reaction succesfully","")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponeObject("failed","Cannot find group to delete","")
        );
    }
}
