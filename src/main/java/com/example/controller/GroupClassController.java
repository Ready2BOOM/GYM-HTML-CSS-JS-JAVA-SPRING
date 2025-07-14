package com.example.controller;

import com.example.model.GroupClass;
import com.example.repository.GroupClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class GroupClassController {
	@Autowired
	private GroupClassRepository groupClassRepository;

	@PostMapping
	public GroupClass createClass(@RequestBody GroupClass groupClass) {
		return groupClassRepository.save(groupClass);
	}

	@GetMapping
	public List<GroupClass> getUpcomingClasses() {
		return groupClassRepository.findByClassDateAfterOrderByClassDate(LocalDate.now());
	}
}