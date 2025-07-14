	package com.example.repository;

	import com.example.model.Subscription;
	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.stereotype.Repository;
	import java.util.List;

	@Repository
	public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
		List<Subscription> findByLogin(String login);
	}