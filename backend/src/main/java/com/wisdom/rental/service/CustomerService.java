package com.wisdom.rental.service;

import com.wisdom.rental.dto.CustomerRequest;
import com.wisdom.rental.entity.*;
import com.wisdom.rental.exception.ApiException;
import com.wisdom.rental.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerService {
    private final CustomerRepository repo;

    public CustomerService(CustomerRepository r) {
        repo = r;
    }

    public List<Customer> list(String q) {
        return q == null || q.isBlank() ? repo.findAll() : repo.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(q, q, q);
    }

    public Customer create(CustomerRequest r) {
        if (repo.existsByEmailIgnoreCase(r.email())) throw new ApiException("Email already registered");
        if (repo.existsByPhone(r.phone())) throw new ApiException("Phone already registered");
        if (r.customerType() == CustomerType.COMPANY && (r.companyName() == null || r.companyName().isBlank()))
            throw new ApiException("Company name is required");
        Customer c = new Customer();
        c.setCustomerType(r.customerType());
        c.setFullName(r.fullName());
        c.setCompanyName(r.companyName());
        c.setEmail(r.email());
        c.setPhone(r.phone());
        return repo.save(c);
    }

    public void deactivate(Long id) {
        Customer c = repo.findById(id).orElseThrow(() -> new ApiException("Customer not found"));
        c.setActive(false);
        repo.save(c);
    }
}
