package com.tcshop.ecommerce.service;

import com.tcshop.ecommerce.dao.ProductCategoryRepository;
import com.tcshop.ecommerce.dao.ProductRepository;
import com.tcshop.ecommerce.entity.Product;
import com.tcshop.ecommerce.entity.ProductCategory;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    public ProductCategory addCategory(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }
    public ProductCategory addCategory(String categoryName) {
        ProductCategory category = new ProductCategory();
        category.setCategoryName(categoryName);
        return productCategoryRepository.save(category); 
    }
    
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Iterable<ProductCategory> findAll() {
        return productCategoryRepository.findAll();
    }

    public Iterable<Product> findProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> findProductById(Long id) {
        return productRepository.findById(id);
    }

    @Transactional
    public void deleteProduct(String sku){
        productRepository.removeBySku(sku);
    }


}
