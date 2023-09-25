package com.tcshop.ecommerce.dao;

import com.tcshop.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


//Accepts call from localhost 4200.
@CrossOrigin("http://localhost:4200")                                //Name of Json entry, Path reference: product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
