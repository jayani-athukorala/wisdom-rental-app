package com.wisdom.rental.controller;

import com.wisdom.rental.dto.CustomerRequest;
import com.wisdom.rental.entity.Customer;
import com.wisdom.rental.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService s;

    public CustomerController(CustomerService s) {
        this.s = s;
    }

    @GetMapping
    public List<Customer> list(@RequestParam(required = false) String q) {
        return s.list(q);
    }

    @PostMapping
    public Customer create(@Valid @RequestBody CustomerRequest r) {
        return s.create(r);
    }

    @PatchMapping("/{id}/deactivate")
    public void deactivate(@PathVariable Long id) {
        s.deactivate(id);
    }
}
