package com.tcshop.ecommerce.dao;

import com.tcshop.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Order, Long> {
}
