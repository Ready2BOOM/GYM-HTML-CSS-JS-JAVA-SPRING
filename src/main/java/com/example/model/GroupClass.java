package com.example.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "group_classes")
public class GroupClass {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private LocalDate classDate;
	private String classType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getClassDate() {
		return classDate;
	}

	public void setClassDate(LocalDate classDate) {
		this.classDate = classDate;
	}

	public String getClassType() {
		return classType;
	}

	public void setClassType(String classType) {
		this.classType = classType;
	}
}