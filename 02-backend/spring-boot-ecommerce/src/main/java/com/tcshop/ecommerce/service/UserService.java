package com.tcshop.ecommerce.service;

import com.tcshop.ecommerce.dao.CustomerRepository;
import com.tcshop.ecommerce.dao.UserRepository;
import com.tcshop.ecommerce.entity.Customer;
import com.tcshop.ecommerce.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public User registerNewUser(User user) {
        return  userRepository.save(user);
    }

    public List<User> getAllUsers(){
        List<User> users = new ArrayList<User>();
        userRepository.findAll().forEach(user -> users.add(user));
        return  users;
    }
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public Iterable<Customer> findCustomers() {
        return customerRepository.findAll();
    }
}
