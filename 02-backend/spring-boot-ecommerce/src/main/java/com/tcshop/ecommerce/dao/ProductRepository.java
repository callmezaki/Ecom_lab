package com.tcshop.ecommerce.dao;

import com.tcshop.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;


//Accepts call from localhost 4200.
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    //Query method for category id through param
    //Behind the scenes spring executes query:
    //Select * From product where category_id=?
    Page<Product> findByCategoryId(@RequestParam("id")Long id, Pageable pageable);

    //Behind the scenes spring executes query:
    //Select * From product p WHERE p.name LIKE CONCAT('%', :name, '%)
    Page<Product> findByNameContaining(@RequestParam("name")String name, Pageable pageable);
    Long removeBySku(String sku);
//    Product findById(Long id);
}
