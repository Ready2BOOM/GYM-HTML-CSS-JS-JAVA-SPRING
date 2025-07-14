package com.example.repository;

import com.example.model.GroupClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface GroupClassRepository extends JpaRepository<GroupClass, Long> {
	List<GroupClass> findByClassDateAfterOrderByClassDate(LocalDate date);
}