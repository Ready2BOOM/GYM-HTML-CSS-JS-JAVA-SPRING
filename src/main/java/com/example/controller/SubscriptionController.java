package com.example.controller;

import com.example.model.Subscription;
import com.example.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
	@Autowired
	private SubscriptionRepository subscriptionRepository;

	@PostMapping
	public Subscription createSubscription(@RequestBody Subscription subscription) {
		subscription.setStartDate(LocalDate.now());
		subscription.setEndDate(subscription.getStartDate().plusMonths(subscription.getMonths()));
		subscription.setStatus("active");
		return subscriptionRepository.save(subscription);
	}

	@GetMapping("/user/{login}")
	public List<Subscription> getUserSubscriptions(@PathVariable String login) {
		return subscriptionRepository.findByLogin(login);
	}

	@PostMapping("/{id}/freeze")
	public Subscription freezeSubscription(@PathVariable Long id) {
		Subscription subscription = subscriptionRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Subscription not found"));

		if ("active".equals(subscription.getStatus())) {
			subscription.setStatus("frozen");
			subscription.setEndDate(subscription.getEndDate().plusDays(30));
		} else if ("frozen".equals(subscription.getStatus())) {
			subscription.setStatus("active");
		}

		return subscriptionRepository.save(subscription);
	}
}