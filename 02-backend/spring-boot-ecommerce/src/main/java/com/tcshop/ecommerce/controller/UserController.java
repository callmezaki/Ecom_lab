package com.tcshop.ecommerce.controller;

import com.tcshop.ecommerce.config.EmailBody;
import com.tcshop.ecommerce.config.OtpCode;
import com.tcshop.ecommerce.dao.UserRepository;
import com.tcshop.ecommerce.entity.Customer;
import com.tcshop.ecommerce.entity.User;
import com.tcshop.ecommerce.entity.UserRole;
import com.tcshop.ecommerce.security.jwt.JwtTokenUtil;
import com.tcshop.ecommerce.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api")
public class UserController {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;


    @Autowired
    JwtTokenUtil jwtTokenUtil;
    
   
    @PutMapping("/verify")
    public User verifyAccount(@RequestBody  User userBody){
        User user = userRepository.findByEmail(userBody.getEmail());
        if(user.getOtp().equals(userBody.getOtp())){
            user.setVerified(true);
            userRepository.save(user);
            return  user;
        }
        else{
            throw new IllegalStateException("Wrong code, try again!");
        }
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }

    @GetMapping("/customers")
    public Iterable<Customer> getAllCustomers(){
        return userService.findCustomers();
    }

}
