package com.example.back.Security.oauth;

import com.example.back.Entities.User;
import com.example.back.Payloads.response.JwtResponse;
import com.example.back.Payloads.response.ResponeObject;
import com.example.back.Security.jwt.JwtUtils;
import com.example.back.Services.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuthLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
        String oauth2ClientName = oauthUser.getOauth2ClientName();

        userService.processOAuthPostLogin(oauthUser.getId(),oauthUser.getEmail(),oauthUser.getName(),oauth2ClientName);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateOAuthJwtToken(authentication);
        User user=userService.getUserByUsername(oauthUser.getEmail()).get();
        Gson gson = new Gson();
        String employeeJsonString = gson.toJson(new ResponeObject("ok","successfully get user",new JwtResponse(jwtUtils.getExpirationDateFromJwtToken(jwt),jwt,
                Long.valueOf(oauthUser.getId()),
                oauthUser.getEmail())));
        if(user.isEnable()&&!user.isLock()){
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(employeeJsonString);
            response.getWriter().flush();
        }
//        response.sendRedirect("localhost");
//        super.onAuthenticationSuccess(request, response, authentication);
    }

}