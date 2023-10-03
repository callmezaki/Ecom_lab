package com.tcshop.ecommerce.controller;

import com.tcshop.ecommerce.dao.ProductCategoryRepository;
import com.tcshop.ecommerce.dao.ProductRepository;
import com.tcshop.ecommerce.entity.Product;
import com.tcshop.ecommerce.util.UnsafeXMLParser;
import com.tcshop.ecommerce.entity.ProductCategory;
import com.tcshop.ecommerce.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Document;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.xml.sax.InputSource;
import java.io.StringReader;
import java.math.BigDecimal;
import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductCategoryRepository productCategoryRepository;
    @Transactional
    @DeleteMapping("/products/delete/{sku}")
    public void deleteProduct(@PathVariable String sku){
        productService.deleteProduct(sku);
    }

    @PostMapping("/products/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return new ResponseEntity<Product>(productService.addProduct(product), HttpStatus.CREATED);
    }
    @PostMapping("/category/add")
    public ResponseEntity<ProductCategory> addCategory(@RequestBody ProductCategory productCategory) {
        return new ResponseEntity<ProductCategory>(productService.addCategory(productCategory), HttpStatus.CREATED);
    }

    @GetMapping("/category/all")
    public Iterable<ProductCategory> getAllCategories(){
        return productService.findAll();
    }
    
    @GetMapping("/products/all")
    public Iterable<Product> getAllProducts(){
        return productService.findProducts();
    }

    @GetMapping("/products/all/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return (productService.findProductById(id));
    }

    @PostMapping(value = "/createXml", consumes = "application/xml")
    public ResponseEntity<?> createProductFromXml(@RequestBody String xmlData) {
        try {
            // Use the UnsafeXMLParser to parse the XML data
            Document doc = new UnsafeXMLParser().parseXML(xmlData);
    
            // Extract data from the parsed XML
            String name = doc.getElementsByTagName("name").item(0).getTextContent();
            String sku = doc.getElementsByTagName("sku").item(0).getTextContent();
            String description = doc.getElementsByTagName("description").item(0).getTextContent();
            String price = doc.getElementsByTagName("price").item(0).getTextContent();
    
            BigDecimal priceValue = new BigDecimal(price);

            // Use the extracted data to create a product
            Product product = new Product();
            product.setName(name);
            product.setSku(sku);
            product.setDescription(description);
            product.setUnitPrice(priceValue);
    
            // Save the product using your service/repository (based on your existing code)
            productService.addProduct(product);
    
            return ResponseEntity.ok("Product created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating product from XML: " + e.getMessage());
        }
    }
    
}