package com.tcshop.ecommerce.controller;

import com.tcshop.ecommerce.dto.Purchase;
import com.tcshop.ecommerce.dto.PurchaseResponse;
import com.tcshop.ecommerce.entity.Order;
import com.tcshop.ecommerce.entity.User;
import com.tcshop.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController extends AppBaseController {
    //Implementation: CheckoutController -> CheckoutService -> springDataJpaRepo -> DB
    @Autowired
    private CheckoutService checkoutService;
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return  purchaseResponse;
    }
    @GetMapping("/orders")
    public Iterable<Order> getAllOrders(){
    	User user = getAuthenticatedUser();
        return checkoutService.findOrders();
    }
}
