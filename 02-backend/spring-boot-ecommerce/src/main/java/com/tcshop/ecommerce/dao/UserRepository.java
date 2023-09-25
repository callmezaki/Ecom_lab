package com.tcshop.ecommerce.dao;

import com.tcshop.ecommerce.entity.User;
import com.tcshop.ecommerce.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
    User findByRole(UserRole role);
    Boolean existsByEmail(String email);
}
