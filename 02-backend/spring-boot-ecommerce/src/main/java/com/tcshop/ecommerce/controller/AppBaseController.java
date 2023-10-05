package com.tcshop.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.tcshop.ecommerce.dao.UserRepository;
import com.tcshop.ecommerce.entity.User;

@RestController
@CrossOrigin(origins = "*")
public class AppBaseController {


    @Autowired
    UserRepository userRepository;


    public User getAuthenticatedUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        if(username != null){
            User user = this.userRepository.findByEmail(username);
            if(user != null){
                return user;
            }
            return null;
        }
        return null;
    }

}
