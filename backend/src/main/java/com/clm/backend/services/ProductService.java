package com.clm.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.clm.backend.models.Product;
import com.clm.backend.repositories.ProductRepository;

@Service
public class ProductService {
    
    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProduct(UUID id) {
        return productRepository.findById(id);
    }

    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }
}
