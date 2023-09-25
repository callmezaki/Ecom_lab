package com.tcshop.ecommerce.controller;

import com.tcshop.ecommerce.config.EmailBody;
import com.tcshop.ecommerce.config.OtpCode;
import com.tcshop.ecommerce.dao.UserRepository;
import com.tcshop.ecommerce.entity.Customer;
import com.tcshop.ecommerce.entity.User;
import com.tcshop.ecommerce.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private OtpCode otpCode;

    @Autowired
    private EmailBody emailBody;
    @PostMapping("/register")
    public User registerNewUser(@RequestBody  User user){

        if(userRepository.existsByEmail(user.getEmail())){
            throw new IllegalStateException("Email taken");
        }
        else{
            String otp = otpCode.generateOtp();
            try {
                emailBody.sendOtp(user.getEmail(),otp);
            } catch (MessagingException e) {
                throw new RuntimeException("Unable to send otp please try again!");
            }

            User newUser = new User();
            newUser.setName(user.getName());
            newUser.setSurname(user.getSurname());
            newUser.setEmail(user.getEmail());
            newUser.setRole(user.getRole());
            newUser.setPassword(user.getPassword());
            newUser.setOtp(otp);
            newUser.setVerified(Boolean.FALSE);
            userRepository.save(newUser);

            return userService.registerNewUser(newUser);
        }
    }
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

    @PostMapping("/login")
    public User loginUser(@RequestBody User userData){
        User user = userRepository.findByEmail(userData.getEmail());
        if(user.getPassword().equals(userData.getPassword()) && user.getVerified()){
            return user;
        }
        else{
            throw new IllegalStateException("User doesn't exist or his account is not Verified!");
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
