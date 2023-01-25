package com.clm.backend.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clm.backend.models.Product;

public interface ProductRepository extends JpaRepository<Product, UUID>{
}
