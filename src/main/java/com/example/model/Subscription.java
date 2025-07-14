package com.example.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "subscriptions")
public class Subscription {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String firstName;
	private String lastName;
	private String login;
	private String phone;
	private Integer months;
	private Integer trainerSessions;
	private Boolean unlimited;
	private Boolean fullDay;
	private Boolean freezeAvailable;
	private Boolean poolAccess;
	private LocalDate startDate;
	private String status;
	private LocalDate endDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getMonths() {
		return months;
	}

	public void setMonths(Integer months) {
		this.months = months;
	}

	public Integer getTrainerSessions() {
		return trainerSessions;
	}

	public void setTrainerSessions(Integer trainerSessions) {
		this.trainerSessions = trainerSessions;
	}

	public Boolean getUnlimited() {
		return unlimited;
	}

	public void setUnlimited(Boolean unlimited) {
		this.unlimited = unlimited;
	}

	public Boolean getFullDay() {
		return fullDay;
	}

	public void setFullDay(Boolean fullDay) {
		this.fullDay = fullDay;
	}

	public Boolean getFreezeAvailable() {
		return freezeAvailable;
	}

	public void setFreezeAvailable(Boolean freezeAvailable) {
		this.freezeAvailable = freezeAvailable;
	}

	public Boolean getPoolAccess() {
		return poolAccess;
	}

	public void setPoolAccess(Boolean poolAccess) {
		this.poolAccess = poolAccess;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
}