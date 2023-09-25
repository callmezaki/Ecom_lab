package com.tcshop.ecommerce.service;

import com.tcshop.ecommerce.dao.CustomerRepository;
import com.tcshop.ecommerce.dao.OrdersRepository;
import com.tcshop.ecommerce.dto.Purchase;
import com.tcshop.ecommerce.dto.PurchaseResponse;
import com.tcshop.ecommerce.entity.Customer;
import com.tcshop.ecommerce.entity.Order;
import com.tcshop.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements  CheckoutService{

    //Implementation: CheckoutController -> CheckoutService -> springDataJpaRepo -> DB
    private CustomerRepository customerRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    //Optional - autowired since only one constructor
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve the order info dto
        Order order = purchase.getOrder();
        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        //populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        //save to the db
        customerRepository.save(customer);

        //return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID number(uuid.v4)
        //UUID - Universally Unique Identifier
        return UUID.randomUUID().toString();
    }
    public Iterable<Order> findOrders() {
        return ordersRepository.findAll();
    }
}
