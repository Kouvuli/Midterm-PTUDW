package com.example.back.Controllers;

import com.example.back.Constants.Constants;
import com.example.back.Entities.*;
import com.example.back.Payloads.request.MemberRequest;
import com.example.back.Payloads.request.Pagination;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Payloads.response.ResponseObjectPagination;
import com.example.back.Services.GroupService;
import com.example.back.Services.InvitationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;


    @Autowired
    private InvitationTokenService invitationTokenService;

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
    ResponseEntity<ResponeObject> getGroupById(@PathVariable Long id){
        Optional<Group> group=groupService.getGroupById(id);
        return group.isPresent()?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get group succesfully",group.get())
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponeObject("failed","Cannot find group with id="+id,"")
                );
    }
    @GetMapping("/{id}/invitationLink")
    ResponseEntity<ResponeObject> getGroupInvitationLink(@PathVariable Long id){
        Optional<Group> group=groupService.getGroupById(id);

        if (!group.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find group with id="+id,"")
            );
        }
        String token=groupService.genRandomAlphaNumeric(12);
        InvitationToken invitationToken =new InvitationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(7),
                group.get()
        );
        invitationTokenService.saveVerficationToken(invitationToken);
        String link = Constants.BACK_BASE_URL+ "/invitations/group/" + token;
        return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get group invitation link succesfully",link)
                );

    }

    @GetMapping("/{id}/members")
    ResponseEntity<ResponeObject> getGroupMembers(@PathVariable Long id){
        Optional<Group> group=groupService.getGroupById(id);
        return group.isPresent()?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponeObject("ok","Get group members succesfully",group.get().getRoles())
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
                    new ResponeObject("failed","Group already exists!",group.get())
            );
        }

        newGroup.setAdmin(groupService.getUserById(newGroup.getAdmin().getId()).get());
        newGroup.setCreateAt(new Timestamp(System.currentTimeMillis()));

//        newGroup.getUsers().add(groupService.getUserById(newGroup.getAdmin().getId()));
//        newGroup.getRoles().add(new UserGroup(groupService.getUserById(newGroup.getAdmin().getId()), newGroup, groupService.getRoleById(4l)));
        Group addedGroup=groupService.addGroup(newGroup);
        groupService.addGroupMember(new UserGroup(groupService.getUserById(newGroup.getAdmin().getId()).get(), newGroup, groupService.getRoleById(4l)));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert group succesfully",addedGroup)
        );
    }
    @PostMapping("/{id}/members")
    ResponseEntity<ResponeObject> insertMemberToGroup(@PathVariable Long id,@Valid @RequestBody MemberRequest data){
        Optional<Group> group=groupService.getGroupById(id);
        Optional<User> user=groupService.getUserById(data.getUserId());
        if(!group.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Group not exists!","")
            );
        }
        if(!user.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","User not exists!","")
            );
        }
        if(group.get().isLock()){
            return ResponseEntity.status(HttpStatus.LOCKED).body(
                    new ResponeObject("failed","Group is locked!",group.get())
            );
        }
        Optional<UserGroup> userGroup=groupService.getUserGroupByUserIdAndGroupId(data.getUserId(),id);
        if(userGroup.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    new ResponeObject("failed","User already in group!","")
            );
        }
        UserGroup newUserGroup= new UserGroup();
        newUserGroup.setUser(groupService.getUserById(data.getUserId()).get());
        newUserGroup.setGroup(group.get());
        newUserGroup.setRole(groupService.getRoleById(data.getRoleId()));

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Insert member succesfully",groupService.addGroupMember(newUserGroup))
        );
    }

    @PutMapping("/{id}/members")
    ResponseEntity<ResponeObject> updateMemberRole(@PathVariable Long id,@Valid @RequestBody MemberRequest data){
        Optional<Group> group=groupService.getGroupById(id);
        Optional<User> user=groupService.getUserById(data.getUserId());
        if(!group.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Group not exists!","")
            );
        }
        if(!user.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","User not exists!","")
            );
        }
        if(group.get().isLock()){
            return ResponseEntity.status(HttpStatus.LOCKED).body(
                    new ResponeObject("failed","Group is locked!",group.get())
            );
        }
        Optional<UserGroup> userGroup=groupService.getUserGroupByUserIdAndGroupId(data.getUserId(),id);
        if(!userGroup.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","User's not a member!","")
            );
        }
        userGroup.get().setRole(groupService.getRoleById(data.getRoleId()));





        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update member succesfully",groupService.addGroupMember(userGroup.get()))
        );
    }
    @PutMapping("/{id}")
    ResponseEntity<ResponeObject> updateGroup(@RequestBody Group newGroup,@PathVariable Long id){
        Optional<Group> updatedGroup= groupService.getGroupById(id);
        if(!updatedGroup.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Group not exists!","")
            );
        }


        if(updatedGroup.get().isLock()){
            return ResponseEntity.status(HttpStatus.LOCKED).body(
                    new ResponeObject("failed","Group is locked!",updatedGroup.get())
            );
        }
        updatedGroup.get().setName(newGroup.getName());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Update group successfully",groupService.addGroup(updatedGroup.get()))
        );
    }
    @DeleteMapping("/{id}")
    ResponseEntity<ResponeObject> deleteGroup(@PathVariable Long id){
        Optional<Group> group=groupService.getGroupById(id);
        if(!group.isPresent()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponeObject("failed","Cannot find group to delete","")
            );
        }
        if(group.get().isLock()){
            return ResponseEntity.status(HttpStatus.LOCKED).body(
                    new ResponeObject("failed","Group is locked!",group.get())
            );
        }
        groupService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponeObject("ok","Deleted group succesfully","")
        );
    }
}
