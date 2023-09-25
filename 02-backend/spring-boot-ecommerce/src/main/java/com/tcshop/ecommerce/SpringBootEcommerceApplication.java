package com.tcshop.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.tcshop.ecommerce.service.ProductService;

@SpringBootApplication
public class SpringBootEcommerceApplication implements CommandLineRunner {

    @Autowired
    private ProductService productService;

    public static void main(String[] args) {
        SpringApplication.run(SpringBootEcommerceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        productService.addCategory("all");
    }
}
