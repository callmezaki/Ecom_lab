package com.tcshop.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcshop.ecommerce.dao.UserRepository;
import com.tcshop.ecommerce.entity.User;
import com.tcshop.ecommerce.entity.UserRole;
import com.tcshop.ecommerce.security.jwt.JwtTokenUtil;
import com.tcshop.ecommerce.service.UserService;

@RestController
@RequestMapping(path = "/auth")
public class AuthController extends AppBaseController {
    @Autowired
    private PasswordEncoder encoder;
	
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    
    
    @PostMapping("register")
    public User registerNewUser(@RequestBody  User user){

        if(userRepository.existsByEmail(user.getEmail())){
            throw new IllegalStateException("Email taken");
        }
        else{
            User newUser = new User();
            newUser.setName(user.getName());
            newUser.setSurname(user.getSurname());
            newUser.setEmail(user.getEmail());
            newUser.setRole(UserRole.User);
            newUser.setPassword(encoder.encode(user.getPassword()));
            newUser.setVerified(true);
            userRepository.save(newUser);
            
            return userService.registerNewUser(newUser);
        }
    }
    
    @PostMapping("login")
    public User loginUser(@RequestBody User userData){
        User user = userRepository.findByEmail(userData.getEmail());
        	
        if(encoder.matches(userData.getPassword(), user.getPassword()) && user.getVerified()) {
        	user.setJwt(jwtTokenUtil.createJWT(user));
        	return user;
        }
        
        else{
            throw new IllegalStateException("Wrong credentials");
       }
    }
    
    
}
