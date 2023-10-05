package com.tcshop.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.tcshop.ecommerce.service.ProductService;
import com.tcshop.ecommerce.entity.User;
import com.tcshop.ecommerce.entity.UserRole;
import com.tcshop.ecommerce.service.UserService;
import com.tcshop.ecommerce.dao.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class SpringBootEcommerceApplication implements CommandLineRunner {

    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder encoder;

    public static void main(String[] args) {
        SpringApplication.run(SpringBootEcommerceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        if(userRepository.existsByEmail("admin@shop.com")){
            return;
        }

        productService.addCategory("all");
        User newUser = new User();
        newUser.setName("admin");
        newUser.setSurname("admin");
        newUser.setEmail("admin@shop.com");
        newUser.setRole(UserRole.Admin);
        newUser.setPassword(encoder.encode("sus9823$dishdos329842$$%"));
        newUser.setVerified(true);
        userRepository.save(newUser);
        userService.registerNewUser(newUser);
    }
}
