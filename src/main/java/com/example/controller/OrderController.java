package com.example.controller;

import com.example.model.Order;
import com.example.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired
	private OrderRepository orderRepository;

	@PostMapping
	public Order createOrder(@RequestBody Order order) {
		order.setOrderDate(LocalDate.now());
		return orderRepository.save(order);
	}
}