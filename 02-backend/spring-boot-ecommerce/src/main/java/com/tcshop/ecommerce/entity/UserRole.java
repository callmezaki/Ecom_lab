package com.tcshop.ecommerce.entity;

public enum UserRole {
    Admin("Admin"),User("User");
    private String roles;

    private UserRole(String roles){
        this.roles = roles;
    }
    public String getRole(){
        return  this.roles;
    }
}
