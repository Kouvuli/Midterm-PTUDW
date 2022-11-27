package com.example.back.Controllers;

import com.example.back.Entities.ConfirmationToken;
import com.example.back.Entities.User;
import com.example.back.Payloads.request.LoginRequest;
import com.example.back.Payloads.request.SignupRequest;
import com.example.back.Payloads.response.JwtResponse;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Security.jwt.JwtUtils;
import com.example.back.Security.services.UserDetailsImpl;
import com.example.back.Services.AuthService;
import com.example.back.Services.ConfirmationTokenService;
import com.example.back.Services.EmailService;
import com.example.back.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;
    @Autowired
    ConfirmationTokenService confirmationTokenService;

    @Autowired
    EmailService emailService;

    @Autowired
    AuthService authService;
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        User user=userService.getUserByUsername(loginRequest.getUsername()).get();

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//        List<String> roles = userDetails.getAuthorities().stream()
//                .map(item -> item.getAuthority())
//                .collect(Collectors.toList());
        if(user.isEnable()&&!user.isLock()){
            return ResponseEntity.ok(new ResponeObject("ok","successfully get user",new JwtResponse(jwtUtils.getExpirationDateFromJwtToken(jwt),jwt,
                    userDetails.getId(),
                    userDetails.getUsername())));
        }
        return ResponseEntity.status(HttpStatus.LOCKED).body(new ResponeObject("failed","user not enable or locked",""));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userService.existByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ResponeObject("failed","Error: Username is already taken!",""));
        }


        // Create new user's account
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()),signUpRequest.getFullname(),signUpRequest.getBirthday(),new Timestamp(System.currentTimeMillis()));

//        Set<String> strRoles = signUpRequest.getRole();
//        Set<Role> roles = new HashSet<>();
//
//        if (strRoles == null) {
//            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//            roles.add(userRole);
//        } else {
//            strRoles.forEach(role -> {
//                switch (role) {
//                    case "admin":
//                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
//                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                        roles.add(adminRole);
//
//                        break;
//                    case "mod":
//                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
//                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                        roles.add(modRole);
//
//                        break;
//                    default:
//                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                        roles.add(userRole);
//                }
//            });
//        }
//
//        user.setRoles(roles);
        userService.addUser(user);
        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        String link = "http://localhost:9090/api/v1/registration/confirm?token=" + token;
        emailService.send(
                signUpRequest.getEmail(),
                emailService.buildEmail(signUpRequest.getFullname(), link));
        return ResponseEntity.ok(new ResponeObject("ok","User registered successfully!",""));
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return authService.confirmToken(token);
    }
}
