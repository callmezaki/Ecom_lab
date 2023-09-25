package com.tcshop.ecommerce.service;

import com.tcshop.ecommerce.dto.Purchase;
import com.tcshop.ecommerce.dto.PurchaseResponse;
import com.tcshop.ecommerce.entity.Order;

public interface CheckoutService {

    //Send back PurchaseResponse
    PurchaseResponse placeOrder(Purchase purchase);

    Iterable<Order> findOrders();
}
