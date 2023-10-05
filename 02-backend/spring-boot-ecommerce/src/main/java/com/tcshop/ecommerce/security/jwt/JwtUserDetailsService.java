package com.tcshop.ecommerce.security.jwt;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tcshop.ecommerce.dao.UserRepository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws
            UsernameNotFoundException {

    	com.tcshop.ecommerce.entity.User user = this.userRepository.findByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found with Email: " + username);
        }
            return new User(user.getEmail(),
                    user.getPassword(),
                    new ArrayList<>());
    }

}