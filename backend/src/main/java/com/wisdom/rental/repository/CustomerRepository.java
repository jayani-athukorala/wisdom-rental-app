package com.wisdom.rental.repository;

import com.wisdom.rental.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhone(String phone);

    List<Customer> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(String a, String b, String c);
}
