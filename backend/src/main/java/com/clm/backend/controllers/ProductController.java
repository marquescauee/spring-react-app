package com.clm.backend.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clm.backend.models.Product;
import com.clm.backend.services.ProductService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {
    
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<Object> saveProduct(@RequestBody Product product) {

        if(product.getBrand().isBlank() || product.getName().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Informações inseridas incorretamente");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(productService.saveProduct(product));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable UUID id, @RequestBody Product product) {
        Optional<Product> productDB = productService.getProduct(id);

        if(!productDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
        }

        if(product.getBrand().isBlank() || product.getName().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Informações inseridas incorretamente");
        }

        Product updateProduct = productDB.get();
        updateProduct.setBrand(product.getBrand());
        updateProduct.setName(product.getName());

        return ResponseEntity.status(HttpStatus.OK).body(productService.saveProduct(updateProduct));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable UUID id) {
        Optional<Product> productDB = productService.getProduct(id);

        if(!productDB.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado");
        }

        productService.deleteProduct(id);

        return ResponseEntity.status(HttpStatus.OK).body("Produto de ID " + id + "  removido com sucesso!");
    }
}
